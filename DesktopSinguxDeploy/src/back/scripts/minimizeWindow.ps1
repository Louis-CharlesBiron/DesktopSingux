# Possible flags
# 0 => Hides the window and activates another window
# 3 => Activates the window and maximizes it
# 6 => Minimizes the window and activates the next top-level window
# 9 => Activates and restores a minimized window to its original size and position
# 11 => Forces the window to minimize, even if it's not currently visible

function script($windowTitle, $flag) {
    try {Add-Type -TypeDefinition 'using System;using System.Runtime.InteropServices;public class WindowManagement {[DllImport("user32.dll", CharSet = CharSet.Auto)] public static extern IntPtr FindWindow(string lpClassName, string lpWindowName);[DllImport("user32.dll")]public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);}'}
    catch {}
    $windowId = [WindowManagement]::FindWindow([NullString]::Value, $windowTitle);
    if ($windowId -ne [IntPtr]::Zero) {
        [WindowManagement]::ShowWindow($windowId, [int]$flag);
    } {else Write-Host "NO WINDOW FOUND, $windowTitle, $flag";}
}
