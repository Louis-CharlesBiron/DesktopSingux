const STATES = {IDLE:0}

class Character extends Obj {

    //**** TODO ****\\
    //       need to handle idle
    //       set different cooldown
    //       different actions

    constructor(pos, size) {
        super(pos, size)
        this._cvs = null            // Canvas instance
        this._speed = 1             // speed
        this._state = STATES.IDLE   // current state of the character
    }


    // Runs every frame and draws the object (Canvas drawable context, time in milisecond since start, mouse infos)
    draw(ctx, time, mouse) {
        ctx.fillStyle = "red"
        ctx.beginPath()
        ctx.arc(this.x, this.y, 10, 0, CIRC)
        ctx.fill()

        this.tick(ctx, mouse)
    }

    // Runs every frame
    tick(ctx, m) {
        // just pour tester jar
        if (m.ok) {
            let dist = getDist(this.x, this.y, m.x, m.y), 
                modifier = mod(1, dist/((dist+50)*1.5), 1), dirX = Math.sign(m.x-this.x), dirY = Math.sign(m.y-this.y)
            this.moveBy([modifier*dirX, modifier*dirY])
        }

    }

    moveTo(pos, easing) {

    }

    minimizeWindow() { }

    // GETTERS
	get cvs() {return this._cvs}
    get speed() {return this._speed}
    get state() {return this._state}

    //SETTERS
	set cvs(_cvs) {this._cvs = _cvs}
    set speed(s) {this._speed = s}
    set state(s) {this._state = s}

}