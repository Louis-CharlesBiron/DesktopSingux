function getAt() {
    $inv = $global:MyInvocation.MyCommand
    if ($inv.CommandType -eq "ExternalScript") {
        $ScriptPath = Split-Path -Parent -Path $inv.Definition
    }
    else {
        $ScriptPath = Split-Path -Parent -Path ([Environment]::GetCommandLineArgs()[0])
        if (!$ScriptPath) {$ScriptPath = "."}
    }
    return $ScriptPath
}


Write-Host (getAt)

Read-Host "asd"

