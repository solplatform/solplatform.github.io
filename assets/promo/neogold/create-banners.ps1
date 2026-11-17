Add-Type -AssemblyName System.Drawing

$baseDir = "C:\xampp\htdocs\Projects\solplatform.github.io\assets\promo\neogold"

function New-Banner {
    param(
        [string]$FileName,
        [int]$Width,
        [int]$Height,
        [bool]$IsDark,
        [string]$Orientation
    )
    
    $bmp = New-Object System.Drawing.Bitmap($Width, $Height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::White)
    
    # Background
    if ($IsDark) {
        $bgColor = [System.Drawing.Color]::FromArgb(30, 30, 30)
        $accentColor = [System.Drawing.Color]::FromArgb(255, 193, 7)
        $textColor = [System.Drawing.Color]::White
        $subColor = [System.Drawing.Color]::FromArgb(200, 200, 200)
    } else {
        $bgColor = [System.Drawing.Color]::FromArgb(250, 248, 240)
        $accentColor = [System.Drawing.Color]::FromArgb(255, 160, 0)
        $textColor = [System.Drawing.Color]::FromArgb(30, 30, 30)
        $subColor = [System.Drawing.Color]::FromArgb(100, 100, 100)
    }
    
    $g.Clear($bgColor)
    
    # Top accent bar
    $barHeight = if ($Orientation -eq "portrait") { 120 } else { 80 }
    $accentBrush = New-Object System.Drawing.SolidBrush($accentColor)
    $g.FillRectangle($accentBrush, 0, 0, $Width, $barHeight)
    
    # Gold separator line
    $lineBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 215, 0))
    $g.FillRectangle($lineBrush, 0, $barHeight - 3, $Width, 3)
    
    # Product icon (circle)
    $iconSize = if ($Orientation -eq "portrait") { 180 } else { 120 }
    $iconX = if ($Orientation -eq "portrait") { ($Width - $iconSize) / 2 } else { 40 }
    $iconY = if ($Orientation -eq "portrait") { 180 } else { ($Height - $iconSize) / 2 }
    
    $iconBrush = New-Object System.Drawing.SolidBrush($accentColor)
    $g.FillEllipse($iconBrush, $iconX, $iconY, $iconSize, $iconSize)
    
    # Sparkle in circle
    $starColor = if ($IsDark) { [System.Drawing.Color]::White } else { [System.Drawing.Color]::FromArgb(255, 160, 0) }
    $starBrush = New-Object System.Drawing.SolidBrush($starColor)
    $starSize = $iconSize / 4
    $starX = $iconX + ($iconSize - $starSize) / 2
    $starY = $iconY + ($iconSize - $starSize) / 2
    $g.FillRectangle($starBrush, $starX, $starY, $starSize, $starSize)
    
    # Main title "Neo Gold"
    $titleSize = if ($Orientation -eq "portrait") { 64 } else { 48 }
    $titleFont = New-Object System.Drawing.Font("Arial", $titleSize, [System.Drawing.FontStyle]::Bold)
    $titleBrush = New-Object System.Drawing.SolidBrush($textColor)
    
    $titleText = "Neo Gold"
    $titleBounds = $g.MeasureString($titleText, $titleFont, $Width - 80)
    $titleX = $Width / 2 - $titleBounds.Width / 2
    $titleY = if ($Orientation -eq "portrait") { 420 } else { ($Height - 200) / 2 }
    $g.DrawString($titleText, $titleFont, $titleBrush, $titleX, $titleY)
    
    # Subtitle
    $subFont = New-Object System.Drawing.Font("Arial", 24, [System.Drawing.FontStyle]::Regular)
    $subBrush = New-Object System.Drawing.SolidBrush($subColor)
    $subText = "Универсальное средство"
    $subBounds = $g.MeasureString($subText, $subFont, $Width - 80)
    $subX = $Width / 2 - $subBounds.Width / 2
    $subY = $titleY + $titleBounds.Height + 20
    $g.DrawString($subText, $subFont, $subBrush, $subX, $subY)
    
    # Tagline
    $tagFont = New-Object System.Drawing.Font("Arial", 20, [System.Drawing.FontStyle]::Italic)
    $tagBrush = New-Object System.Drawing.SolidBrush($accentColor)
    $tagText = "от меток и грязи"
    $tagBounds = $g.MeasureString($tagText, $tagFont, $Width - 80)
    $tagX = $Width / 2 - $tagBounds.Width / 2
    $tagY = $subY + $subBounds.Height + 15
    $g.DrawString($tagText, $tagFont, $tagBrush, $tagX, $tagY)
    
    # Bottom decorative line
    $bottomY = if ($Orientation -eq "portrait") { $Height - 60 } else { $Height - 40 }
    $bottomLineBrush = New-Object System.Drawing.Pen($accentColor, 2)
    $g.DrawLine($bottomLineBrush, 40, $bottomY, $Width - 40, $bottomY)
    
    # Dispose
    $titleFont.Dispose()
    $subFont.Dispose()
    $tagFont.Dispose()
    $accentBrush.Dispose()
    $lineBrush.Dispose()
    $iconBrush.Dispose()
    $starBrush.Dispose()
    $titleBrush.Dispose()
    $subBrush.Dispose()
    $tagBrush.Dispose()
    $bottomLineBrush.Dispose()
    $g.Dispose()
    
    $filePath = Join-Path $baseDir $FileName
    $bmp.Save($filePath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $bmp.Dispose()
    
    Write-Host "OK: $filePath ($Width x $Height)"
}

# Light portrait (1080x1920)
New-Banner "ru-neogold-light-portrait.jpg" 1080 1920 $false "portrait"

# Light landscape (1920x1080)
New-Banner "ru-neogold-light-landscape.jpg" 1920 1080 $false "landscape"

# Dark portrait (1080x1920)
New-Banner "ru-neogold-dark-portrait.jpg" 1080 1920 $true "portrait"

# Dark landscape (1920x1080)
New-Banner "ru-neogold-dark-landscape.jpg" 1920 1080 $true "landscape"

Write-Host "`nAll banners created!"
