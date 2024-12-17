class Character extends Obj {

    #CHARACTER_STATES = {
        NONE:new State("none"), // no artificial intelligence, testing only

        TEST:new State("test", [// testing only
            new Action("test1", (end)=>{
                console.log("do action 1")
                setTimeout(()=>end(), 2000)
            }, 1, 1000),
            new Action("test2", (end)=>{
                console.log("do action 2")
                setTimeout(()=>end(), 3000)
            }, 50, 10000),
            new Action("test3", (end)=>{
                console.log("do action 3")
                setTimeout(()=>end(), 4000)
            }, 20, 15000),
            new Action("idle", (end)=>{
                console.log("idling")
                setTimeout(()=>end(), 3000)
            }, 12, 0)
        ]),

        // MOVES AROUND AND DOES SMALL IDLE ANIMATION
        IDLE:new State("idle", [
            new Action("move_near", (end)=>{
                console.log("move_near")
                let duration = random(2000, 4000), radiusMin = 20, radiusMax = 125
                this.moveTo(this.getRandomPosInRadius(radiusMin, radiusMax, 0.5), duration)
                setTimeout(()=>end(), duration)
            }, 10, 5000, 0.5),
            new Action("move_far", (end)=>{
                console.log("move_far")
                let duration = random(4000, 7000), radiusMin = 225, radiusMax = 450
                this.moveTo(this.getRandomPosInRadius(radiusMin, radiusMax, 0.5), duration)
                setTimeout(()=>end(), duration)
            }, 15, 8000, 0.5),
            new Action("backflip", (end)=>{
                console.log("backflip")
                this.moveTo([this.x, this.y-8], 300, null, false)
                this.moveTo([this.x, this.y+8], 300, null, false, [this.x, this.y-8])
                this.moveTo([this.x, this.y-8], 300, null, false, [this.x, this.y+8])
                this.moveTo([this.x, this.y+8], 300, null, false, [this.x, this.y-8])
                setTimeout(()=>end(), 2000)
            }, 100, 30000, 0),
            new Action("idle", (end)=>{
                console.log("idling")
                setTimeout(()=>end(), 4000)
            }, 5, 0)
        ], 6000, 8000, ()=>{
            console.log("ENDED idle")
            this.setState(this.#CHARACTER_STATES.OPENER)
        }),

        OPENER:new State("opener", [
            new Action("open_explorer", (end)=>{
                console.log("open_explorer")
                let duration = random(2000, 4000), radiusMin = 20, radiusMax = 125
                send({type:"ps", value:"explorer.exe"})
                //this.moveTo(this.getRandomPosInRadius(radiusMin, radiusMax, 0.5), duration)
                setTimeout(()=>end(), duration)
            }, 10, 5000, 0.5),
            new Action("idle", (end)=>{
                console.log("idling")
                setTimeout(()=>end(), 4000)
            }, 5, 0)
        ], 6000, 60000, ()=>{
            console.log("ENDED opener")
            this.setState(this.#CHARACTER_STATES.NONE)
        }),
    }

    constructor(pos, size) {
        super(pos, size)
        this._cvs = null                                    // Canvas instance
        this._speed = 1                                     // speed
        //this._state = this.#CHARACTER_STATES.IDLE           // current state of the character
    }

    // Runs when the object gets added to a canvas instance
    initialize() {
        super.initialize()
        this.setState(this._state)
    }

    // Runs every frame and draws the object (Canvas drawable context, time in milisecond since start, mouse infos)
    draw(ctx, time, deltaTime, mouse) {
        super.draw(ctx, time)
        
        ctx.fillStyle = "red"
        ctx.beginPath()
        ctx.arc(this.x, this.y, 10, 0, CIRC)
        ctx.fill()

        this.tick(ctx, deltaTime, mouse)

        // state updates
        if (this._state && this._state.name !== "none") this._state.tick(deltaTime*1000)
    }

    // Runs every frame
    tick(ctx, deltaTime, m) {
        if (this.isWithin([m.x,m.y])) document.body.style.cursor = "pointer"
        else document.body.style.cursor = "default"
    }

    // smoothly moves the character to specified pos, but positions are restrained to inside the canvas
    moveTo(pos, time=1000, easing=Anim.easeInOutQuad, force=true, initPos=this.pos) {
        const padding = [2+this.width/2,2+this.height/2], dists = this.posDistances(pos)
        if (dists[0] <= padding[1]) pos[1] = padding[1]
        else if (dists[2] <= padding[1]) pos[1] = this._cvs.height-padding[1]
        if (dists[1] <= padding[0]) pos[0] = this._cvs.width-padding[0]
        else if (dists[3] <= padding[0]) pos[0] = padding[0]
        super.moveTo(pos, time, easing, force, initPos)
    }

    // returns a random pos within a certain radius of the provided pos.
    // weightModifier [0..1] is how much the returned pos will favoritise being towards the center (1=no weight, 0=will only go towards the center)
    getRandomPosInRadius(radiusMin=0, radiusMax=50, weightModifier=1, pos=this.pos) {
        let [x, y] = pos, [dt, dr, db, dl] = this.posDistances(pos),
            retDxy = [random(-radiusMax,radiusMax), random(-radiusMax,radiusMax)]

        if (weightModifier !== 1) {
            if (dt > db) retDxy[1] = random(-radiusMax,radiusMax*weightModifier) //go more top
            else retDxy[1] = random(-radiusMax*weightModifier,radiusMax) //go bottom
            if (dr > dl) retDxy[0] = random(-radiusMax*weightModifier,radiusMax) //go right
            else retDxy[0] = random(-radiusMax,radiusMax*weightModifier) //go left
        }

        return [x+(Math.abs(retDxy[0])>=radiusMin?retDxy[0]:radiusMin*Math.sign(retDxy[0])), y+(Math.abs(retDxy[1])>=radiusMin?retDxy[1]:radiusMin*Math.sign(retDxy[0]))]
    }

    // sets the active state and initializes it
    setState(state) {
        return this._state = state?.init(this._cvs.timeStamp)
    }

    // GETTERS
	get cvs() {return this._cvs}
    get speed() {return this._speed}
    get state() {return this._state}

    //SETTERS
	set cvs(_cvs) {this._cvs = _cvs}
    set speed(s) {this._speed = s}

}