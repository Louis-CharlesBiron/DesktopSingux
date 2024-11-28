<#
    THIS IS THE SOURCE CODE OF RUNNER.EXE, USE AN EXECUTABLE FOR PRODUCTION
#>
param (
    [string]$node,
    [string]$fullMain
)
function getAt() {$inv=$global:MyInvocation.MyCommand;if($inv.CommandType -eq "ExternalScript"){$ScriptPath=Split-Path -Parent -Path $inv.Definition}else{$ScriptPath=Split-Path -Parent -Path ([Environment]::GetCommandLineArgs()[0]);if(!$ScriptPath){$ScriptPath="."}}return $ScriptPath}

#SET DEFAULT LOCATION
$at = (Get-Item $(getAt)).Parent.FullName
Write-Host $at
$defaultNode = "ex\node.exe"
$defaultFullMain = "back\server.js"
if ($node -eq $null -or $node -eq "" -or !(Test-Path $node)) {$node = "$at\$defaultNode"}
if ($fullMain -eq $null -or $fullMain -eq "" -or !(Test-Path $fullMain)) {$fullMain = "$at\$defaultFullMain"}

#RUN
write-host "- - - USB KEY REMOVABLE - - -"
write-host "NODE PATH: $node"
write-host "FULL MAIN PATH: $fullMain"
write-host "RUNNING APP...`n"
# RUN BACKEND
Start-Process $node -ArgumentList $fullMain
# RUN FRONTEND
#Start-Process $node -ArgumentList TODO PATH TO NEUTRALINO BUILD EXE
