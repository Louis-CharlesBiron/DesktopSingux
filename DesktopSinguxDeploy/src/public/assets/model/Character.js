class Character {

    //**** TODO ****\\
    //       need to handle idle
    //       set different cooldown
    //       different actions

    constructor(pos) {
        this._id = 1
        this._cvs = null
        this._initPos = pos||[0,0]
        this._pos = this._initPos
    }

    initialize() {
        if (typeof this._initPos=="function") this._pos = this._initPos(this._cvs)
    }

    // TODO doc + review specs
    draw(ctx, time) {
        ctx.fillStyle = "red"
        ctx.beginPath()
        ctx.arc(this.x, this.y, 10, 0, CIRC)
        ctx.fill()

        this.tick()
    }

    tick() {
        this.x += random(-3, 3)
        this.y += random(-3, 3)
    }

    // Character movement
    move() { }

    
    minimizeWindow() { }



	get id() {return this._id}
	get cvs() {return this._cvs}
    get x() {return this._pos[0]}
    get y() {return this._pos[1]}
    get pos() {return this._pos}
	get initPos() {return this._initPos}

	set cvs(_cvs) {return this._cvs = _cvs}
    set x(x) {this._pos[0] = x}
    set y(y) {this._pos[1] = y}

}