const {exec, spawn} = require("child_process"),
      scripts = require("./scripts"),
      robot = require("robotjs"),
      QRCode = require("qrcode"),
     {formatPath} = require("./utils")

// HANDLES ALL CALLS
function handle(obj, client) {
    let t = obj.type.toLowerCase(), v = obj.value,
        retVal = null

    // BINDINGS (in lowercase)
    if (t=="kill") kill()
    else if (t=="setclickthrough") setClickThrough(v)
    else if (t=="movewindow") moveWindow(v)
    else if (t=="setwindowdisplay") setWindowDisplay(v)
    else if (t=="ps") ps(v)
    else if (t=="getqrcode") getQRCode(v)

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

// CHANGES SPECIFIC WINDOW'S DISPLAY MODE
function setWindowDisplay(obj) {// {windowTitle:"", flag:6}
    ps(`${scripts.WINDOW_DISPLAY} script "${obj.windowTitle}" "${obj.flag}"`)
}

// MOVES SPECIFIC WINDOW, (CANCELS CURRENT ORDER AND STARTS NEW ONE IF CALLED WHEN RUNNING)
let moveWindow_currentProcess = null
function moveWindow(obj) {//{windowTitle:"", finalX:100, finalY:200, speed:8, startX:100 or null, startY:100 or null}
    const process = spawn("powershell", ["-ep","Bypass","-Command", `${scripts.MOVE_WINDOW} script "${obj.windowTitle}" "${obj.finalX}" "${obj.finalY}" "${obj.speed}" "${obj.startX??""}" "${obj.startY??""}"`]);
    
    if (!moveWindow_currentProcess) moveWindow_currentProcess = process
    else moveWindow_currentProcess.kill("SIGINT")

    process.on("close", ()=>moveWindow_currentProcess = null)
}

// QRCODE TODO, MAKE WINDOW OPEN FUNCTION WITH 1)CALLBACK WHEN WINDOW IS READY, 2)OPEN WINDOW minimized or in background first
// CREATES AND OPENS A CUSTOM QR CODE AT DESIGNED POSITION (overides any previous file if exists)
function getQRCode(obj) {// {rootPath:"C:/dir1/dir2/", filename:"test.png", text:"google.com", from:[x, y], to:[x,y], speed:1} (roothPath has to end with "/")
    const {rootPath, filename, text, from, to, speed} = obj, fullPath = formatPath(rootPath+filename)
    QRCode.toFile(path=fullPath, text||"empty").then(()=>ps(fullPath, ()=>{
        // move animation
        setTimeout(()=>{
            if (from && to) moveWindow({windowTitle:filename, speed:speed||1, finalX:to[0], finalY:to[1], startX:from[0], startY:from[1]})
        },500)
    }))
}

//send({type:"getqrcode", value:{rootPath:"%userprofile%/Downloads/", filename:"yomantest.png", text:"heyheyhey123"}})

// POWERSHELL EVAL :^)
function ps(cmd, callback) {
    exec(`powershell -ep Bypass -Command "${cmd.trim().replaceAll(/"/g,'\\"')}"`, (err, out, stderr)=>typeof callback=="function"&&callback(err, out, stderr))
}



module.exports = handle