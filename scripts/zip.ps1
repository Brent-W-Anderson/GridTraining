$ErrorActionPreference = 'Stop'

$ProjectRoot = (
	Resolve-Path (
		Join-Path $PSScriptRoot '..'
	)
).Path.TrimEnd('\')

$ProjectName = Split-Path `
	$ProjectRoot `
	-Leaf

$Timestamp = Get-Date `
	-Format 'yyyyMMdd-HHmmss'

$ZipName =
	"$ProjectName($Timestamp).zip"

$ZipPath = Join-Path `
	$ProjectRoot `
	$ZipName

$GitIgnorePath = Join-Path `
	$ProjectRoot `
	'.gitignore'

$TempRoot = Join-Path `
	$env:TEMP `
	("$ProjectName-zip-" + [guid]::NewGuid())

$TempProject = Join-Path `
	$TempRoot `
	$ProjectName

function Get-IgnoreRules {
	if (
		-not (
			Test-Path `
				-LiteralPath $GitIgnorePath
		)
	) {
		throw '.gitignore was not found.'
	}

	return @(
		Get-Content `
			-LiteralPath $GitIgnorePath |
		ForEach-Object {
			$Rule = $_.Trim()

			if (
				$Rule -and
				-not $Rule.StartsWith('#')
			) {
				$Rule
			}
		}
	)
}

$IgnoreRules = Get-IgnoreRules

function Test-Ignored {
	param(
		[string]$RelativePath,
		[bool]$IsDirectory
	)

	$Path =
		$RelativePath.Replace(
			'\',
			'/'
		)

	$Ignored = $false

	foreach ($RawRule in $IgnoreRules) {
		$Rule = $RawRule

		$Negated =
			$Rule.StartsWith('!')

		if ($Negated) {
			$Rule =
				$Rule.Substring(1)
		}

		if (-not $Rule) {
			continue
		}

		$DirectoryOnly =
			$Rule.EndsWith('/')

		$Rule =
			$Rule.TrimStart('/').
				TrimEnd('/')

		if (-not $Rule) {
			continue
		}

		$EscapedRule =
			[regex]::Escape($Rule)

		$Pattern =
			$EscapedRule.
				Replace(
					'\*\*',
					'.*'
				).
				Replace(
					'\*',
					'[^/]*'
				).
				Replace(
					'\?',
					'[^/]'
				)

		if ($Rule.Contains('/')) {
			$Pattern =
				'^' +
				$Pattern +
				'($|/)'
		}
		else {
			$Pattern =
				'(^|/)' +
				$Pattern +
				'($|/)'
		}

		if ($Path -match $Pattern) {
			if (
				$DirectoryOnly -and
				-not $IsDirectory -and
				$Path -notmatch $Pattern
			) {
				continue
			}

			$Ignored =
				-not $Negated
		}
	}

	return $Ignored
}

function Get-RelativePath {
	param(
		[string]$FullPath
	)

	$Prefix =
		$ProjectRoot + '\'

	return $FullPath.Substring(
		$Prefix.Length
	)
}

function Copy-ProjectDirectory {
	param(
		[string]$SourceDirectory
	)

	$Items = Get-ChildItem `
		-LiteralPath $SourceDirectory `
		-Force

	foreach ($Item in $Items) {
		$RelativePath =
			Get-RelativePath `
				$Item.FullName

		$NormalizedPath =
			$RelativePath.Replace(
				'\',
				'/'
			)

		if (
			$NormalizedPath -eq '.git' -or
			$NormalizedPath.StartsWith(
				'.git/'
			)
		) {
			continue
		}

		if (
			-not $Item.PSIsContainer -and
			$Item.Extension -ieq '.zip'
		) {
			continue
		}

		if (
			Test-Ignored `
				$RelativePath `
				$Item.PSIsContainer
		) {
			Write-Host `
				"Skipping: $NormalizedPath"

			continue
		}

		$Destination = Join-Path `
			$TempProject `
			$RelativePath

		if ($Item.PSIsContainer) {
			New-Item `
				-ItemType Directory `
				-Path $Destination `
				-Force `
				| Out-Null

			Copy-ProjectDirectory `
				$Item.FullName

			continue
		}

		$DestinationDirectory =
			Split-Path `
				$Destination `
				-Parent

		if (
			-not (
				Test-Path `
					-LiteralPath $DestinationDirectory
			)
		) {
			New-Item `
				-ItemType Directory `
				-Path $DestinationDirectory `
				-Force `
				| Out-Null
		}

		Copy-Item `
			-LiteralPath $Item.FullName `
			-Destination $Destination `
			-Force
	}
}

try {
	Write-Host ''
	Write-Host 'Creating project ZIP...'
	Write-Host ''

	New-Item `
		-ItemType Directory `
		-Path $TempProject `
		-Force `
		| Out-Null

	Copy-ProjectDirectory `
		$ProjectRoot

	Write-Host ''
	Write-Host 'Removing old project ZIPs...'
	Write-Host ''

	Get-ChildItem `
		-LiteralPath $ProjectRoot `
		-File `
		-Filter '*.zip' |
		Remove-Item `
			-Force

	Write-Host 'Compressing...'
	Write-Host ''

	Add-Type `
		-AssemblyName System.IO.Compression.FileSystem

	[System.IO.Compression.ZipFile]::CreateFromDirectory(
		$TempProject,
		$ZipPath,
		[System.IO.Compression.CompressionLevel]::Optimal,
		$false
	)

	Write-Host 'ZIP complete.'
	Write-Host ''
	Write-Host $ZipPath
	Write-Host ''
}
finally {
	if (
		Test-Path `
			-LiteralPath $TempRoot
	) {
		Remove-Item `
			-LiteralPath $TempRoot `
			-Recurse `
			-Force
	}
}