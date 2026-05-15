$files = @(
    'c:\Users\Tahir\Desktop\THRIPTW\src\App.jsx',
    'c:\Users\Tahir\Desktop\THRIPTW\src\components\DashboardLayout.jsx'
)

foreach ($path in $files) {
    if (Test-Path $path) {
        $content = [IO.File]::ReadAllText($path)
        $content = $content.Trim()
        
        # Quitar comillas si existen
        if ($content.StartsWith('"') -and $content.EndsWith('"')) {
            $content = $content.Substring(1, $content.Length - 2)
        }
        
        # Reemplazar secuencias literales por reales usando el operador -replace
        $content = $content -replace '\\n', [char]10
        $content = $content -replace '\\r', [char]13
        $content = $content -replace '\\"', '"'
        $content = $content -replace '\\\\', '\'
        
        [IO.File]::WriteAllText($path, $content)
        Write-Host "Archivo $path limpiado con éxito."
    }
}
