# Web-optimized H.264 for Git LFS / site delivery (1280px wide, ~2.5 Mbps cap)
param(
  [string]$VideoDir = "$PSScriptRoot\..\public\videos"
)

$ErrorActionPreference = "Stop"
$targets = @("aardvark-film.mp4", "aardvark-wild.mp4")

foreach ($name in $targets) {
  $input = Join-Path $VideoDir $name
  $output = Join-Path $VideoDir ($name -replace '\.mp4$', '.compressed.mp4')
  if (-not (Test-Path $input)) { throw "Missing: $input" }
  $before = (Get-Item $input).Length / 1MB
  Write-Host "Compressing $name ($([math]::Round($before,1)) MB)..."
  & ffmpeg -y -i $input `
    -vf "scale='min(1280,iw)':-2" `
    -c:v libx264 -crf 28 -preset medium -maxrate 2500k -bufsize 5000k `
    -movflags +faststart -c:a aac -b:a 96k -ac 2 $output
  if ($LASTEXITCODE -ne 0) { throw "ffmpeg failed for $name" }
  $after = (Get-Item $output).Length / 1MB
  Write-Host "Done: $name -> $([math]::Round($after,1)) MB"
  Move-Item -Force $output $input
}

Write-Host "Skipped gorilla-uganda.mp4 (already small)."
