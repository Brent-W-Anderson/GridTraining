param(
    [switch]$Refresh
)

$ErrorActionPreference = "Continue"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectDir = Split-Path -Parent $scriptDir
$imgDir = Join-Path $projectDir "src\images"

New-Item -ItemType Directory -Force -Path $imgDir | Out-Null

$headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/156 Safari/537.36"
}

function Get-ImageExtension([string]$path) {
    if (-not (Test-Path $path)) {
        return $null
    }

    if ((Get-Item $path).Length -lt 1000) {
        return $null
    }

    $bytes = [System.IO.File]::ReadAllBytes($path)

    if (
        $bytes.Length -ge 8 -and
        $bytes[0] -eq 0x89 -and
        $bytes[1] -eq 0x50 -and
        $bytes[2] -eq 0x4E -and
        $bytes[3] -eq 0x47
    ) {
        return ".png"
    }

    if (
        $bytes.Length -ge 3 -and
        $bytes[0] -eq 0xFF -and
        $bytes[1] -eq 0xD8 -and
        $bytes[2] -eq 0xFF
    ) {
        return ".jpg"
    }

    if (
        $bytes.Length -ge 6 -and
        $bytes[0] -eq 0x47 -and
        $bytes[1] -eq 0x49 -and
        $bytes[2] -eq 0x46
    ) {
        return ".gif"
    }

    if (
        $bytes.Length -ge 12 -and
        $bytes[0] -eq 0x52 -and
        $bytes[1] -eq 0x49 -and
        $bytes[2] -eq 0x46 -and
        $bytes[3] -eq 0x46 -and
        $bytes[8] -eq 0x57 -and
        $bytes[9] -eq 0x45 -and
        $bytes[10] -eq 0x42 -and
        $bytes[11] -eq 0x50
    ) {
        return ".webp"
    }

    return $null
}

function Test-ImageFile([string]$path) {
    return $null -ne (Get-ImageExtension $path)
}

function Get-ExistingImage([string]$name) {
    foreach ($extension in @(".jpg", ".png", ".webp", ".gif")) {
        $path = Join-Path $imgDir "$name$extension"

        if (Test-ImageFile $path) {
            return $path
        }
    }

    return $null
}

function Remove-ImageVariants([string]$name) {
    foreach ($extension in @(".jpg", ".png", ".webp", ".gif")) {
        $path = Join-Path $imgDir "$name$extension"

        if (Test-Path $path) {
            Remove-Item $path -Force
        }
    }
}

function Try-DownloadImage(
    [string]$url,
    [string]$name
) {
    $tempPath = Join-Path $imgDir "$name.download"

    try {
        Invoke-WebRequest `
            -UseBasicParsing `
            -Uri $url `
            -OutFile $tempPath `
            -Headers $headers `
            -MaximumRedirection 10

        $extension = Get-ImageExtension $tempPath

        if ($null -eq $extension) {
            throw "Downloaded file does not appear to be a valid image."
        }

        Remove-ImageVariants $name

        $dest = Join-Path $imgDir "$name$extension"
        Move-Item -Path $tempPath -Destination $dest -Force

        return $true
    }
    catch {
        if (Test-Path $tempPath) {
            Remove-Item $tempPath -Force
        }

        return $false
    }
}

function Save-FirstWorkingImage(
    [string]$name,
    [string[]]$urls
) {
    $existing = Get-ExistingImage $name

    if ($null -ne $existing -and -not $Refresh) {
        return $true
    }

    if ($Refresh) {
        Remove-ImageVariants $name
    }

    foreach ($url in $urls) {
        if (Try-DownloadImage $url $name) {
            $saved = Get-ExistingImage $name
            $savedName = Split-Path -Leaf $saved

            Write-Host "[OK]     $savedName" -ForegroundColor Green
            return $true
        }
    }

    Write-Host "[FAILED] $name" -ForegroundColor Red
    return $false
}

function Check-BundledImage([string]$name) {
    $existing = Get-ExistingImage $name

    if ($null -ne $existing) {
        return $true
    }

    Write-Host "[MISSING] $name" -ForegroundColor Red
    return $false
}

Write-Host ""
Write-Host "Fiber Training image setup" -ForegroundColor White
Write-Host "==========================" -ForegroundColor White
Write-Host ""

if ($Refresh) {
    Write-Host "Refreshing downloadable images..." -ForegroundColor DarkGray
}
else {
    Write-Host "Downloading missing images..." -ForegroundColor DarkGray
}

Write-Host ""

$null = Save-FirstWorkingImage "osp-handhole" @(
    "https://www.thefoa.org/images/SantaMonicaHandhole.jpg"
)

$null = Save-FirstWorkingImage "aerial-osp" @(
    "https://foa.org/tech/ref/install/SM-FiOS-Aerial.jpg"
)

$null = Save-FirstWorkingImage "aerial-terminal-field" @(
    "https://foa.org/tech/ref/install/SM-FiOS-Aerial-a.jpg"
)

$null = Save-FirstWorkingImage "pedestal-ftth" @(
    "https://www.thefoa.org/tech/ref/install/Closures/FTTH-pedestal.jpg"
)

$null = Save-FirstWorkingImage "aerial-splice-closure" @(
    "https://www.thefoa.org/tech/ref/install/Closures/Dome-aerial.jpg"
)

$null = Save-FirstWorkingImage "aerial-service-loops" @(
    "https://www.thefoa.org/tech/ref/install/Closures/Service%20loops%20aerial.jpg"
)

$null = Save-FirstWorkingImage "aerial-pole-closure" @(
    "https://www.thefoa.org/tech/ref/install/Closures/aerial%20splice%20closure%20T.jpg"
)

$null = Check-BundledImage "q1000k"

$null = Save-FirstWorkingImage "q1000k-bottom" @(
    "https://www.quantumfiber.com/content/dam/quantumfiber/equipment/smartnids/q1000k/q1000k-bottom.png"
)

$null = Save-FirstWorkingImage "w1700k" @(
    "https://www.quantumfiber.com/content/dam/quantumfiber/equipment/wifi-pods/wifi-7/1700-front.png"
)

$null = Save-FirstWorkingImage "w1700k-bottom" @(
    "https://www.quantumfiber.com/content/dam/quantumfiber/equipment/wifi-pods/wifi-7/1700-bottom-view.png"
)

$null = Save-FirstWorkingImage "w1701k" @(
    "https://www.quantumfiber.com/content/dam/quantumfiber/equipment/wifi-pods/wifi-7/1701-front-wide.png"
)

$null = Save-FirstWorkingImage "mst-product" @(
    "https://cdn11.bigcommerce.com/s-eoti58prd2/images/stencil/1280x1280/products/9389/948/mst-04mh00__04459.1663264116.jpg?c=1"
)

$null = Save-FirstWorkingImage "opm-field" @(
    "https://www.pztest.com/uploadfile/202503/4af1f4e3ee4354d.jpg",
    "https://cdn11.bigcommerce.com/s-51j4f4gi/images/stencil/500x659/products/8266/20821/KomShine_KPM-35_Power_Meter-7__59883.1621355881.jpg?c=2"
)

$null = Save-FirstWorkingImage "vfl" @(
    "https://www.karono.com/wp-content/uploads/2019/09/61Bwa02OTKL._SL1200_.jpg"
)

$null = Save-FirstWorkingImage "otdr-field" @(
    "https://www.exfo.com/contentassets/11f4f7f0a5f94dbd847873d07b5f12d1/axs-120_tech_cabinet_pingpong_1400x800-1.jpg?rxy=0.5",
    "https://www.alles-mit-stecker.de/images/alles-mit-stecker/product_images/popup_images/73f70cd84f25263a74c601b97f488319-1.jpg"
)

$null = Save-FirstWorkingImage "sc-apc-connector" @(
    "https://media.cablematic.com/__sized__/images_1000/fl13400-02-thumbnail-1080x1080-70.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/7/7a/SC-APC_fiber_optic_cable.jpg"
)

$null = Save-FirstWorkingImage "ethernet-rj45" @(
    "https://web-data.teledynamics.com/tdresources/e1ee8160-ce80-4be5-8afb-cc9f7bebafed_orig.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/a/af/Cat-5e_Ethernet_network_cable_RJ45_end_connectors.jpg"
)

$null = Save-FirstWorkingImage "pon-splitter" @(
    "https://imrorwxhiqmojq5p.leadongcdn.com/cloud/lmBpoKrrjiSRokpllkqljo/weixintupian_20240804184647.png"
)

$null = Save-FirstWorkingImage "olt-rack" @(
    "https://www.datafoxbrasil.com.br/upload/service/kUXsu7y4aO1BOTN6WekEFcbgTwW4GaHJXCZRPnLE.jpeg",
    "https://lafibre.info/images/pro/202104_omega_ont_amneville_1.jpg"
)

$null = Save-FirstWorkingImage "gpon-olt" @(
    "https://www.softel-optic.com/pic/big/2023-12-12-5-44-36.jpg",
    "https://image.made-in-china.com/2f0j00VABbrGKCrecR/High-Quality-8-Ports-Gpon-Olt-Fiber-Optic-Equipment-FTTH-FTTB-Gpon-Olt.jpg"
)

$null = Save-FirstWorkingImage "apc-connectors" @(
    "https://phantomcables.com/cdn/shop/files/FO-FH604-SCA2-xxR-BK_2_800x.jpg?v=1708640646",
    "https://bilder.tragant.de/produkte/orig/625e90d9e8de13.95147654.jpg"
)

$null = Save-FirstWorkingImage "db-loss" @(
    "https://www.thefoa.org/images/Test_loss_dB1.jpg"
)

$null = Save-FirstWorkingImage "dbm-power" @(
    "https://www.tae.de/fileadmin/_processed_/d/2/csm_IMG_9992_bearbeitet_35e1485c74.jpg"
)

$null = Save-FirstWorkingImage "gps-field" @(
    "https://dcdn-us.mitiendanube.com/stores/002/202/092/products/spectra_mm6_02-a6db4a0641174efda017247648211910-640-0.webp"
)

$null = Save-FirstWorkingImage "bsw-trench" @(
    "https://www.rnz.de/cms_media/module_img/2129/1064533_1_detail_Glasfaserkabel_werden_in_die_Erde_verlegt..jpeg"
)

$null = Save-FirstWorkingImage "fiber-cleaver" @(
    "https://global-sei.com/sumitomo-electric-splicers/common/img/products/fiber-cleavers/fc-6rp/main_image.png"
)

$null = Save-FirstWorkingImage "fiber-stripper" @(
    "https://i5.walmartimages.com/seo/Fiber-Optic-Stripping-Stripper-FO-103-S-Fibra-Optica-Stripper-FO-103-S-Fiber-Optic-Stripper-Precise-Cleaving_351c041a-ca40-4d78-ae6c-62de77b39757.a6a66cb288ab91f9b2b2d006fb6c9944.jpeg"
)

$null = Save-FirstWorkingImage "drop-cable-stripper" @(
    "https://www.quanhengtech.com/Uploads/pro/drop-cable-Stripper.29.3-1.jpg"
)

$null = Save-FirstWorkingImage "kevlar-scissors" @(
    "https://fibreplus.co.uk/storage/app/media/products/Ripley%20Tools/KS1%20Kevlar%20Scissors%20201774/Miller-KS1-Series-Fiber-Optic-Kevlar-Shears-2.png"
)

$null = Save-FirstWorkingImage "one-click-cleaner" @(
    "https://telecomtools.com.au/cdn/shop/products/one-click_cleaner_SC_1200x1200.jpg?v=1554187006"
)

$null = Save-FirstWorkingImage "fiber-inspection-scope" @(
    "https://gelecekbt.com/image/cache/catalog/Fluke/FI-500_1-1000x1000.jpg"
)

$null = Save-FirstWorkingImage "optical-light-source" @(
    "https://www.splicermarket.com/cdn/shop/products/splicermarket-orientek-optical-power-meter.jpg?v=1640576187"
)

$null = Save-FirstWorkingImage "fiber-cleaning-wipes" @(
    "https://licoom.com/wp-content/uploads/2026/04/task-wipers.png"
)

$null = Save-FirstWorkingImage "fiber-shard-container" @(
    "https://cdn.shopify.com/s/files/1/1026/4509/products/18326_grande.jpg?v=1464378926"
)

$null = Save-FirstWorkingImage "fusion-splicer" @(
    "https://images.shopcdn.co.uk/b6/85/b6857056160d304caf1b9cf5c7d5c634/512x512/webp/fit?compression=80&force=true&quality=80"
)

$null = Save-FirstWorkingImage "sc-apc-patch-cord" @(
    "https://www.hbyweb.com/pic/big/2023-8-15-15-14-39.jpg"
)

$null = Save-FirstWorkingImage "sc-apc-coupler" @(
    "https://www.l-com.com/Content/Images/Product/Large/FOA-017_500x500_View1.jpg"
)

$null = Save-FirstWorkingImage "rj45-tool-kit" @(
    "https://m.media-amazon.com/images/I/7105epkXNdL._AC_SL1000__.jpg"
)

$null = Save-FirstWorkingImage "rj45-crimper" @(
    "https://data.kleintools.com/sites/all/product_assets/hires/klein/vdv226110_photo.jpg"
)

$null = Save-FirstWorkingImage "ethernet-cable-tester" @(
    "https://data.kleintools.com/sites/all/product_assets/hires/klein/vdv526200_photo.jpg"
)

$null = Save-FirstWorkingImage "drill-driver" @(
    "https://cdn.contractorcave.ca/images/2025/10/DCD801B-2.jpeg"
)

$null = Save-FirstWorkingImage "fish-tape" @(
    "https://data.kleintools.com/sites/all/product_assets/hires/klein/56331_photo.jpg"
)

$null = Save-FirstWorkingImage "extension-ladder" @(
    "https://cdn11.bigcommerce.com/s-nu76q5988i/images/stencil/1280x1280/products/21999/25498/D6216-2_PI_jpeg1000__39010.1604505279.jpg?c=2"
)

$null = Save-FirstWorkingImage "caulk-gun" @(
    "https://amtechdiy.com/cdn/shop/files/bk4p3cyegga01jylkpa4.jpg?v=1757019772&width=2000"
)

$null = Save-FirstWorkingImage "cable-clips" @(
    "https://i.ebayimg.com/images/g/PzoAAeSwaO1p0Bkw/s-l400.jpg"
)

$wanted = @(
    "osp-handhole",
    "aerial-osp",
    "pedestal-ftth",
    "aerial-splice-closure",
    "mst-product",
    "aerial-terminal-field",
    "aerial-service-loops",
    "aerial-pole-closure",
    "q1000k",
    "q1000k-bottom",
    "w1700k",
    "w1700k-bottom",
    "w1701k",
    "opm-field",
    "vfl",
    "otdr-field",
    "sc-apc-connector",
    "ethernet-rj45",
    "pon-splitter",
    "olt-rack",
    "gpon-olt",
    "apc-connectors",
    "db-loss",
    "dbm-power",
    "gps-field",
    "bsw-trench",
    "fiber-cleaver",
    "fiber-stripper",
    "drop-cable-stripper",
    "kevlar-scissors",
    "one-click-cleaner",
    "fiber-inspection-scope",
    "optical-light-source",
    "fiber-cleaning-wipes",
    "fiber-shard-container",
    "fusion-splicer",
    "sc-apc-patch-cord",
    "sc-apc-coupler",
    "rj45-tool-kit",
    "rj45-crimper",
    "ethernet-cable-tester",
    "drill-driver",
    "fish-tape",
    "extension-ladder",
    "caulk-gun",
    "cable-clips"
)

$missing = @()

foreach ($name in $wanted) {
    if ($null -eq (Get-ExistingImage $name)) {
        $missing += $name
    }
}

$readyCount = $wanted.Count - $missing.Count

Write-Host ""

if ($missing.Count -eq 0) {
    Write-Host "$readyCount of $($wanted.Count) images ready." -ForegroundColor Green
    exit 0
}

Write-Host "$readyCount of $($wanted.Count) images ready." -ForegroundColor Yellow
Write-Host ""
Write-Host "Missing:" -ForegroundColor Red

foreach ($name in $missing) {
    Write-Host "  - $name" -ForegroundColor Red
}

exit 1