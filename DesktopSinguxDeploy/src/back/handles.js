const {exec} = require("child_process"),
      scripts = require("./scripts")

// HANDLES ALL CALLS
function handle(obj) {
    let t = obj.type.toLowerCase(),
        v = obj.value

    // BINDINGS
    if (t=="kill") kill()
    else if (t=="setclickthrough") setClickThrough(v)
    else if (t=="setwindowdisplay") setWindowDisplay(v)
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

// POWERSHELL EVAL
function ps(cmd, callback) {
    exec(`powershell -ep Bypass -Command "${cmd.trim().replaceAll(/"/g,'\\"')}"`, (err, out, stderr)=>typeof callback=="function"&&callback(err, out, stderr))
}



module.exports = handle