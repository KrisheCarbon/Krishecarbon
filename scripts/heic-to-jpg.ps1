# Converts HEIC photos to JPEG using Windows' own image decoder (works when the HEIF/HEVC extensions are installed).
param([string]$In, [string]$Out, [int]$MaxEdge = 1600)
Add-Type -AssemblyName PresentationCore
New-Item -ItemType Directory -Force $Out | Out-Null
$ok = 0; $bad = 0
Get-ChildItem -LiteralPath $In -File | Where-Object { $_.Extension -match '^\.hei[cf]$' } | ForEach-Object {
  try {
    $stream = [System.IO.File]::OpenRead($_.FullName)
    $decoder = [System.Windows.Media.Imaging.BitmapDecoder]::Create($stream, 'PreservePixelFormat', 'OnLoad')
    $frame = $decoder.Frames[0]
    $scale = [Math]::Min(1.0, $MaxEdge / [Math]::Max($frame.PixelWidth, $frame.PixelHeight))
    $small = New-Object System.Windows.Media.Imaging.TransformedBitmap($frame, (New-Object System.Windows.Media.ScaleTransform($scale, $scale)))
    $encoder = New-Object System.Windows.Media.Imaging.JpegBitmapEncoder
    $encoder.QualityLevel = 86
    $encoder.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($small))
    $target = Join-Path $Out ($_.BaseName + '.jpg')
    $file = [System.IO.File]::Create($target)
    $encoder.Save($file)
    $file.Close(); $stream.Close()
    $ok++
  } catch {
    $bad++
    if ($bad -eq 1) { Write-Output ("first failure: " + $_.Exception.Message) }
  }
}
Write-Output "converted $ok, failed $bad"
