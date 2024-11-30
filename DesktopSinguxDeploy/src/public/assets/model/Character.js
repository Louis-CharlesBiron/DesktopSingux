const STATES = {IDLE:0}

class Character {

    //**** TODO ****\\
    //       need to handle idle
    //       set different cooldown
    //       different actions

    constructor(pos, size) {
        this._id = idGiver++        // canvas obj id
        this._cvs = null            // Canvas instance
        this._speed = 1             // speed
        this._initPos = pos||[0,0]  // initial position : [x,y] || (Canvas)=>{return [x,y]}
        this._pos = this._initPos   // current position from the center of the object : [x,y]
        this._size = size||[50,50]  // size in px : [width, height]
        this._scale = [1,1]         // scale factor : [scaleX, scaleY]
        this._state = STATES.IDLE   // current state of the character
    }

    // Runs when the object gets added to a canvas instance
    initialize() {
        if (typeof this._initPos=="function") this._pos = this._initPos(this._cvs)
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
            this.moveBy(modifier*dirX, modifier*dirY)
        }

    }

    // Returns the [top, right, bottom, left] distances between the canvas limits, according to the object's size
    posDistances(pos=this._pos) {
        let [x,y]=pos, cw=this._cvs.width, ch=this._cvs.height
        return [y-this.height/2, cw-(x+this.width/2), ch-(y+this.height/2), x-this.width/2]
    }

    // Teleports to given coords
    moveAt(x, y) {
        this.x = x
        this.y = y
    }

    // Teleports to incremented coords
    moveBy(x, y) {
        this.x += x
        this.y += y
    }

    moveTo() { }


    minimizeWindow() { }

    // GETTERS
	get id() {return this._id}
	get cvs() {return this._cvs}
    get x() {return this._pos[0]}
    get y() {return this._pos[1]}
    get pos() {return this._pos}
	get initPos() {return this._initPos}
    get scaleX() {return this._scale[0]}
    get scaleY() {return this._scale[1]}
    get scale() {return this._scale}
    get width() {return this._scale[0]}
    get height() {return this._scale[1]}
    get size() {return this._scale}
    get speed() {return this._speed}
    get state() {return this._state}

    //SETTERS
	set cvs(_cvs) {this._cvs = _cvs}
    set x(x) {this._pos[0] = x}
    set y(y) {this._pos[1] = y}
    set pos(pos) {this._pos = pos}
    set scaleX(sx) {this._scale[0] = sx}
    set scaleY(sy) {this._scale[1] = sy}
    set scale(s) {this._scale = s}
    set width(w) {this._size[0] = w}
    set height(h) {this._size[1] = h}
    set size(s) {this._size = s}
    set speed(s) {this._speed = s}
    set state(s) {this._state = s}

}