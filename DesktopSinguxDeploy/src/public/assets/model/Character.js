class Character {

    //**** TODO ****\\
    //       need to handle idle
    //       set different cooldown
    //       different actions

    constructor(posX, posY) {
        this._id = 1
        this._ctx
        this._x = posX
        this._y = posY
    }


    // TODO doc + review specs
    draw() {
        this._ctx.fillStyle = "red"
        this._ctx.beginPath()
        this._ctx.arc(this._x, this._y, 5, 0, CIRC)
        this._ctx.fill()
    }

    // Character movement
    move() { }

    
    minimiseWindow() { }



    get x() { return this._x }
    get y() { return this._y }
    get id() { return this._id }

    set x(x) { this._x = x }
    set y(y) { this._y = y }
}