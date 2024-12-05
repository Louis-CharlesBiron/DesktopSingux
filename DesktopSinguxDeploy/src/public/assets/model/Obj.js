// Abstract canvas obj class
class Obj {

    constructor(pos, size) {
        this._id = idGiver++        // canvas obj id
        this._initPos = pos||[0,0]  // initial position : [x,y] || (Canvas)=>{return [x,y]}
        this._pos = this._initPos   // current position from the center of the object : [x,y]
        this._size = size||[50,50]  // size in px : [width, height]
        this._scale = [1,1]         // scale factor : [scaleX, scaleY]
        this._anims = []            // backlogs of animations to play
    }

    // Runs when the object gets added to a canvas instance
    initialize() {
        if (typeof this._initPos=="function") this._pos = this._initPos(this._cvs)
    }

    // Runs every frame
    draw(ctx, time) {
        if (this._anims[0]) this._anims[0].getFrame(time)
    }

    // Returns the [top, right, bottom, left] distances between the canvas limits, according to the object's size
    posDistances(pos=this._pos) {
        let [x,y]=pos, cw=this._cvs.width, ch=this._cvs.height
        return [y-this.height/2, cw-(x+this.width/2), ch-(y+this.height/2), x-this.width/2]
    }

    // Teleports to given coords
    moveAt(pos) {
        if (pos[0] !== null) this.x = pos[0]
        if (pos[1] !== null) this.y = pos[1]
    }

    // Teleports to incremented coords
    moveBy(pos) {
        if (pos[0] !== null) this.x += pos[0]
        if (pos[1] !== null) this.y += pos[1]
    }

    // Smoothly moves to coords in set time
    moveTo(pos, time=1000, easing=Anim.easeInOutQuad) {
        let ix = this.x, iy = this.y, 
        dx = pos[0]-ix,
        dy = pos[1]-iy

        return this.queueAnim(new Anim((prog)=>{
            this.x = ix+dx*prog
            this.y = iy+dy*prog
        }, time, easing, ()=>this._anims.shift()), true)
    }

    // adds an animation to the end of the backlog
    queueAnim(anim, force) {
        if (this.currentAnim && force) {
            this._anims.addAt(anim, 1)
            this.currentAnim.end()
        }
        if (!anim.endCallback) anim.endCallback=()=>this._anims.shift()
        this._anims.push(anim)
        return anim
    }

    // GETTERS
	get id() {return this._id}
    get x() {return this._pos[0]}
    get y() {return this._pos[1]}
    get pos() {return this._pos}
	get initPos() {return this._initPos}
    get scaleX() {return this._scale[0]}
    get scaleY() {return this._scale[1]}
    get scale() {return this._scale}
    get width() {return this._size[0]}
    get height() {return this._size[1]}
    get size() {return this._size}
    get currentAnim() {return this._anims[0]}

    //SETTERS
    set x(x) {this._pos[0] = x}
    set y(y) {this._pos[1] = y}
    set pos(pos) {this._pos = pos}
    set scaleX(sx) {this._scale[0] = sx}
    set scaleY(sy) {this._scale[1] = sy}
    set scale(s) {this._scale = s}
    set width(w) {this._size[0] = w}
    set height(h) {this._size[1] = h}
    set size(s) {this._size = s}

}