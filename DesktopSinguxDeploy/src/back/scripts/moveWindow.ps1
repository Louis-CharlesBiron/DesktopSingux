
function script($windowTitle, $finalX, $finalY, $time) {
    try {Add-Type -TypeDefinition 'using System;using System.Runtime.InteropServices;public class User32{[DllImport("user32.dll", SetLastError = true)]public static extern IntPtr FindWindow(string lpClassName, string lpWindowName);[DllImport("user32.dll", SetLastError = true)][return: MarshalAs(UnmanagedType.Bool)]public static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int X, int Y, int cx, int cy, uint uFlags);}'}
    catch {}

    $windowId = [User32]::FindWindow([NullString]::Value, $windowTitle)

    if ($windowId -ne [IntPtr]::Zero) {
        # TODO GET INIT POS
        $initX = 0
        $initY = 0

        #ig calc steps and dist
        
        ## (see more doc) SetWindowPos(IntPtr windowId, IntPtr windowIdInsertAfter, int X, int Y, int cx, int cy, uint uFlags)
        [User32]::SetWindowPos($windowId, [IntPtr]::Zero, [int]$x, [int]$y, 0, 0, 0)

        #Start-Sleep -Milliseconds $time/steps

    } else {Write-Host "NO WINDOW FOUND, $windowTitle, $finalX, $finalY, $time"}
}

