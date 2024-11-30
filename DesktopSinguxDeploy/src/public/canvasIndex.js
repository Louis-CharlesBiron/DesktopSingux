const fpsCounter = new FPSCounter(), CVS = new Canvas(canvas, ()=>{//looping
    fpsDisplay.textContent = fpsCounter.getFps()+"\n"+fpsCounter.fpsRaw
    mouseSpeed.textContent = CVS?.mouse?.speed?.toFixed(2)+" px/sec"
    mouseAngle.textContent = CVS?.mouse?.dir?.toFixed(2)+" deg"
})

const character = new Character(cvs=>cvs.getCenter())

CVS.add(character, true, true)

// USER ACTIONS
let mMove=m=>mouseInfo.textContent = "("+m.x+", "+m.y+")"
CVS.setmousemove(mMove)
CVS.setmouseleave(mMove)
CVS.setmousedown()
CVS.setmouseup()

// START
CVS.startLoop()

console.log(character)