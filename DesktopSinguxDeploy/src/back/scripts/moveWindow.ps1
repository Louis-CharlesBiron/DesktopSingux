function script($windowTitle, $finalX, $finalY, $speed, $startX, $startY) {
    try {Add-Type -TypeDefinition 'using System;using System.Runtime.InteropServices;public class User32{[DllImport("user32.dll", SetLastError = true)]public static extern IntPtr FindWindow(string lpClassName, string lpWindowName);[DllImport("user32.dll", SetLastError = true)][return: MarshalAs(UnmanagedType.Bool)]public static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int X, int Y, int cx, int cy, uint uFlags);[StructLayout(LayoutKind.Sequential)]public struct POS {public int x;public int y;public int nx;public int ny;};[DllImport("user32.dll")]public static extern int GetWindowRect(IntPtr hWnd, ref POS pos);}'}catch {}

    $windowId = [User32]::FindWindow([NullString]::Value, $windowTitle);

    if ($windowId -ne [IntPtr]::Zero) {
        $pos = New-Object User32+POS;
        [User32]::GetWindowRect($windowId, [ref]$pos) | Out-Null;
    
        $initX = $pos.x;
        $initY = $pos.y;
        if ($startX -ne "") {$initX = [int]$startX}
        if ($startY -ne "") {$initY = [int]$startY}

        if ($speed -ne "") {$speed = [double]$speed}
        else {$speed = 3}

        $dx = [int]$finalX - $initX;
        $dy = [int]$finalY - $initY;

        $steps = [math]::Ceiling(([math]::Sqrt($dx*$dx+$dy*$dy))/$speed);
        $delay = $speed/$steps;

        $stepX = $dx/$steps;
        $stepY = $dy/$steps;

        Write-Host "$delay, $steps"

        if ($speed -eq -1) {
            [User32]::SetWindowPos($windowId, [IntPtr]::Zero, [int]$finalX, [int]$finalY, 0, 0, 0) | Out-Null;
        } else {
            for ($i=0;$i -lt $steps;$i++) {
                [User32]::SetWindowPos($windowId, [IntPtr]::Zero, [int]($initX+$stepX*$i), [int]($initY+$stepY*$i), 0, 0, 0) | Out-Null;
                Start-Sleep -Seconds $delay;
            }
        }

    } else {Write-Host "NO WINDOW FOUND, $windowTitle, $finalX, $finalY, $speed, $startX, $startY"}
}
 
script "Photos" "2000" "100" "-1" "" ""

