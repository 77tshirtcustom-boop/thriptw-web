$logPath = 'C:\Users\Tahir\.gemini\antigravity\brain\81760c8f-d138-4ef9-89b3-f097d43379cf\.system_generated\logs\overview.txt'
$lines = Get-Content $logPath | Select-Object -Last 100
foreach ($line in $lines) {
    if ($line -like '*write_to_file*') {
        try {
            $data = $line | ConvertFrom-Json
            foreach ($tool in $data.tool_calls) {
                if ($tool.name -eq 'write_to_file' -and $tool.args.TargetFile -like '*DashboardLayout.jsx*') {
                    $content = $tool.args.CodeContent
                    if ($content.StartsWith('"') -and $content.EndsWith('"')) { $content = $content.Substring(1, $content.Length - 2) }
                    $content = $content.Replace('\\n', "`n").Replace('\\r', "`r").Replace('\\"', '"')
                    $content | Out-File -FilePath 'c:\Users\Tahir\Desktop\THRIPTW\src\components\DashboardLayout.jsx' -Encoding utf8 -Force
                    Write-Host "DashboardLayout.jsx recovered!"
                }
                if ($tool.name -eq 'write_to_file' -and $tool.args.TargetFile -like '*App.jsx*') {
                    $content = $tool.args.CodeContent
                    if ($content.StartsWith('"') -and $content.EndsWith('"')) { $content = $content.Substring(1, $content.Length - 2) }
                    $content = $content.Replace('\\n', "`n").Replace('\\r', "`r").Replace('\\"', '"')
                    $content | Out-File -FilePath 'c:\Users\Tahir\Desktop\THRIPTW\src\App.jsx' -Encoding utf8 -Force
                    Write-Host "App.jsx recovered!"
                }
            }
        } catch {
            Write-Host "Error parsing line"
        }
    }
}
