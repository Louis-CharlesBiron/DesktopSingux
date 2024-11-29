const {exec} = require("child_process"),
      scripts = require("./scripts"),
      robot = require("robotjs")

// HANDLES ALL CALLS
function handle(obj) {
    let t = obj.type.toLowerCase(),
        v = obj.value
    // BINDINGS (in lowercase)
    if (t=="kill") kill()
    else if (t=="setclickthrough") setClickThrough(v)
    else if (t=="movewindow") moveWindow(v)
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

// MOVES SPECIFIC WINDOW
function moveWindow(obj) {//{windowTitle:"", finalX:100, finalY:200, time:100, startX:100 or null, startY:100 or null}
    ps(`${scripts.MOVE_WINDOW} script "${obj.windowTitle}" "${robot.getMousePos().x}" "${robot.getMousePos().y}" "${obj.time}" "${obj.startX??""}" "${obj.startY??""}"`)

}

// POWERSHELL EVAL :^)
function ps(cmd, callback) {
    exec(`powershell -ep Bypass -Command "${cmd.trim().replaceAll(/"/g,'\\"')}"`, (err, out, stderr)=>typeof callback=="function"&&callback(err, out, stderr))
}



module.exports = handle