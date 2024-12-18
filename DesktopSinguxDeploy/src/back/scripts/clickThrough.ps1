
function script($windowTitle,$enabled) {
    try {Add-Type -TypeDefinition 'using System;using System.Text;using System.Runtime.InteropServices;public class User32 {[DllImport("user32.dll", SetLastError = true)] public static extern IntPtr FindWindow(string lpClassName, string lpWindowName);[DllImport(\"user32.dll\", SetLastError = true)] public static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount); [DllImport(\"user32.dll\", SetLastError = true)] public static extern int GetWindowLong(IntPtr hWnd, int nIndex); [DllImport(\"user32.dll\", SetLastError = true)] public static extern int SetWindowLong(IntPtr hWnd, int nIndex, int dwNewLong); public const int GWL_EXSTYLE = -20; public const int WS_EX_LAYERED = 0x80000; public const int WS_EX_TRANSPARENT = 0x20; public static string GetWindowTitle(IntPtr hWnd) { StringBuilder sb = new StringBuilder(256); GetWindowText(hWnd, sb, sb.Capacity); return sb.ToString(); }}'} catch {}
    $windowId=[User32]::FindWindow([NullString]::Value, $windowTitle);
    if ($windowId -ne [IntPtr]::Zero) {
        if ($enabled) {[User32]::SetWindowLong($windowId, [User32]::GWL_EXSTYLE, [User32]::GetWindowLong($windowId, [User32]::GWL_EXSTYLE) -bor [User32]::WS_EX_LAYERED -bor [User32]::WS_EX_TRANSPARENT) | Out-Null}
        else {[User32]::SetWindowLong($windowId, [User32]::GWL_EXSTYLE, [User32]::GetWindowLong($windowId, [User32]::GWL_EXSTYLE) -band -bnot ([User32]::WS_EX_LAYERED -bor [User32]::WS_EX_TRANSPARENT)) | Out-Null}}
        else {Write-Host "NO WINDOW FOUND, $windowTitle, $enabled"}
    }

script "Photos" "true"
