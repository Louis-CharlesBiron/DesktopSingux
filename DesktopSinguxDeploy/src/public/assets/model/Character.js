class Character extends Obj {

    #CHARACTER_STATES = {
        NONE:new State("none"),
        TEST:new State("idle", [
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
        IDLE:new State("idle", [
            new Action("move_near", (end)=>{
                console.log("move_near")
                let duration = random(2000, 4000), radius = random(20, 125)
                this.moveTo(this.getRandomPosInRadius(radius), duration)
                setTimeout(()=>end(), duration)
            }, 15, 5000, 0.5),
            new Action("move_far", (end)=>{
                console.log("move_far")
                let duration = random(4000, 7000), radius = random(125, 400)
                this.moveTo(this.getRandomPosInRadius(radius), duration)
                setTimeout(()=>end(), duration)
            }, 10, 8000, 0.5),
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
        ], 6000)
    }

    constructor(pos, size) {
        super(pos, size)
        this._cvs = null                            // Canvas instance
        this._speed = 1                             // speed
        this._state = this.#CHARACTER_STATES.IDLE   // current state of the character
    }


    // Runs every frame and draws the object (Canvas drawable context, time in milisecond since start, mouse infos)
    draw(ctx, time, deltaTime, mouse) {
        super.draw(ctx, time)
        
        ctx.fillStyle = "red"
        ctx.beginPath()
        ctx.arc(this.x, this.y, 10, 0, CIRC)
        ctx.fill()

        this.tick(ctx, deltaTime, mouse)
    }

    // Runs every frame
    tick(ctx, deltaTime, m) {
        // state updates
        if (this._state.name !== "none") this._state.tick(deltaTime*1000)

        if (this.isWithin([m.x,m.y])) this._cvs.cvs.style.cursor = "pointer"
        else this._cvs.cvs.style.cursor = "default"
            
        // just pour tester jar
        //if (m.ok) {
        //    let dist = getDist(this.x, this.y, m.x, m.y), 
        //        modifier = mod(1, dist/((dist+50)*1.5), 1), dirX = Math.sign(m.x-this.x), dirY = Math.sign(m.y-this.y)
        //    this.moveBy([modifier*dirX, modifier*dirY])
        //}


    }

    minimizeWindow() { }

    getRandomPosInRadius(radius) {
        return [this.x+random(-radius,radius), this.y+random(-radius,radius)]
    }

    setState(state) {
        this._state = state.init(this._cvs.timeStamp)
    }

    // GETTERS
	get cvs() {return this._cvs}
    get speed() {return this._speed}
    get state() {return this._state}

    //SETTERS
	set cvs(_cvs) {this._cvs = _cvs}
    set speed(s) {this._speed = s}

}