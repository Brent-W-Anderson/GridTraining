$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectDir = Split-Path -Parent $scriptDir
$indexPath = Join-Path $projectDir "src\index.html"
$imageSetupPath = Join-Path $scriptDir "download-images.ps1"

if (-not (Test-Path $indexPath)) {
    Write-Error "Could not find index.html at: $indexPath"
    exit 1
}

if (-not (Test-Path $imageSetupPath)) {
    Write-Error "Could not find image setup script at: $imageSetupPath"
    exit 1
}

Write-Host "Checking training images..." -ForegroundColor Cyan
& powershell.exe -NoProfile -ExecutionPolicy Bypass -File $imageSetupPath

if ($LASTEXITCODE -ne 0) {
    Write-Error "Training images are incomplete. Fix the image errors above before launching."
    exit $LASTEXITCODE
}

Write-Host "Opening GridSource training app..." -ForegroundColor Cyan
Start-Process "explorer.exe" -ArgumentList "`"$indexPath`""