# add params, and check ps2exe params more

if ($MyInvocation.MyCommand.CommandType -eq "ExternalScript") {
    $ScriptPath = Split-Path -Parent -Path $MyInvocation.MyCommand.Definition
} else {
    $ScriptPath = Split-Path -Parent -Path ([Environment]::GetCommandLineArgs()[0]) 
    if (!$ScriptPath){ $ScriptPath = "." } 
}

$at = $ScriptPath
$module = "$at\PS2EXEModule\Module\ps2exe.psd1"
Unblock-File -Path $module
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force
Import-Module $module
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force

#TO CONVERT
Get-ChildItem $at | ? {$_.Extension -eq ".ps1" -and $_.BaseName -ne "convertToExe"} | % {
    Invoke-PS2EXE -inputFile $_.FullName -title "Description" -company "Compagnie" -product "Nom de produit"
}