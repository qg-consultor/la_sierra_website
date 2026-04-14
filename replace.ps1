$htmlPath = "index.html"
$cssPath = "style.css"

$html = Get-Content $htmlPath -Raw -Encoding UTF8
$css = Get-Content $cssPath -Raw -Encoding UTF8

$replacements = @(
    @("IMAGENES/UBICACIÓN/", "SECCIONES/UBICACIÓN/IMAGENES/"),
    @("IMAGENES/lasierra_residencial_", "SECCIONES/PROTOTIPOS/GALERIA DE PLANOS/lasierra_residencial_"),
    @("IMAGENES/La sierra Residencial A.png", "LOGOS/La sierra Residencial A.png"),
    @("IMAGENES/La sierra Residencial B.png", "LOGOS/La sierra Residencial B.png"),
    @("IMAGENES/La Sierra 2.jpg", "SECCIONES/PROYECTO/IMAGENES/La Sierra 2.jpg"),
    @("IMAGENES/La Sierra 3.jpg", "SECCIONES/PROYECTO/IMAGENES/La Sierra 3.jpg"),
    @("IMAGENES/La Sierra 6.jpg", "SECCIONES/PROYECTO/IMAGENES/La Sierra 6.jpg"),
    @("IMAGENES/La Sierra 7.jpg", "SECCIONES/PROYECTO/IMAGENES/La Sierra 7.jpg"),
    @("IMAGENES/WhatsApp Image 2025-11-18 at 9.17.31 AM (7).jpeg", "SECCIONES/PROYECTO/IMAGENES/WhatsApp Image 2025-11-18 at 9.17.31 AM (7).jpeg"),
    @("IMAGENES/WhatsApp Image 2025-11-18 at 9.17.32 AM (1).jpeg", "SECCIONES/PROYECTO/IMAGENES/WhatsApp Image 2025-11-18 at 9.17.32 AM (1).jpeg"),
    @("IMAGENES/WhatsApp Image 2025-11-18 at 9.17.32 AM.jpeg", "SECCIONES/PROYECTO/IMAGENES/WhatsApp Image 2025-11-18 at 9.17.32 AM.jpeg"),
    @("VIDEOS/20251106_222310000_iOS.MP4", "SECCIONES/PROYECTO/VIDEOS/20251106_222310000_iOS.MP4"),
    @("IMAGENES/La Sierra (3).png", "SECCIONES/HERO/IMAGENES/La Sierra (3).png"),
    @("IMAGENES/La Sierra 5.jpg", "SECCIONES/CONTACTO/IMAGENES/La Sierra 5.jpg")
)

foreach ($r in $replacements) {
    if ($html) { $html = $html.Replace($r[0], $r[1]) }
    if ($css) { $css = $css.Replace($r[0], $r[1]) }
}

[System.IO.File]::WriteAllText($htmlPath, $html, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText($cssPath, $css, [System.Text.Encoding]::UTF8)
Write-Output "Done"
