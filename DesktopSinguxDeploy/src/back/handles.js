const {exec, spawn} = require("child_process"),
      scripts = require("./scripts"),
      robot = require("robotjs")

// HANDLES ALL CALLS
function handle(obj, client) {
    let t = obj.type.toLowerCase(), v = obj.value,
        retVal = null

    // BINDINGS (in lowercase)
    if (t=="kill") kill()
    else if (t=="setclickthrough") setClickThrough(v)
    else if (t=="movewindow") moveWindow(v)
    else if (t=="setwindowdisplay") setWindowDisplay(v)

    // RESPONSE
    if (retVal) client.send({type:t, value:retVal})
}

// CALLS DEFINITIONS //

// CLOSES SERVER
function kill() {
    process.exit()
}

// CHANGES SPECIFIC WINDOW'S CLICK-THROUGH ABILITIES
function setClickThrough(obj) {// {windowTitle:"", enabled:true}
    ps(`${scripts.CLICK_THROUGH} script "${obj.windowTitle}" "${obj.enabled}"`)
}

function setWindowDisplay(obj) {// {windowTitle:"", flag:6}
    ps(`${scripts.WINDOW_DISPLAY} script "${obj.windowTitle}" "${obj.flag}"`, (a,b,c)=>console.log(a,b,c))
}

// MOVES SPECIFIC WINDOW, (CANCELS CURRENT ORDER AND STARTS NEW ONE IF CALLED WHEN RUNNING)
let moveWindow_currentProcess = null
function moveWindow(obj) {//{windowTitle:"", finalX:100, finalY:200, speed:8, startX:100 or null, startY:100 or null}
    const process = spawn("powershell", ["-ep","Bypass","-Command", `${scripts.MOVE_WINDOW} script "${obj.windowTitle}" "${robot.getMousePos().x}" "${robot.getMousePos().y}" "${obj.speed}" "${obj.startX??""}" "${obj.startY??""}"`]);
    
    if (!moveWindow_currentProcess) moveWindow_currentProcess = process
    else moveWindow_currentProcess.kill("SIGINT")

    process.on("close", ()=>moveWindow_currentProcess = null)
}

// POWERSHELL EVAL :^)
function ps(cmd, callback) {
    exec(`powershell -ep Bypass -Command "${cmd.trim().replaceAll(/"/g,'\\"')}"`, (err, out, stderr)=>typeof callback=="function"&&callback(err, out, stderr))
}



module.exports = handle