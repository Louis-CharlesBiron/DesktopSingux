let animIdGiver = 0
class Anim {
    constructor(animation, duration, easing, endCallback) {
        this._id = animIdGiver++                    
        this._animation = animation                 //the main animation (progress)=>
        this._duration = duration??1000             //duration in ms
        this._easing = easing||(x=>x)               //easing function (x)=>
        this._endCallback = endCallback             //function called when animation is over

        this._startTime = null                      //start time
        this._progress = 0                          //animation progress
        this._hasEnded = false                      //if animation has ended
    }

    getFrame(time) {//run in loop
        if (!this._hasEnded) {
            // SET START TIME
            if (!this._startTime) this._startTime = time
            // PLAY ANIMATION
            else if (time<this._startTime+this._duration) this._animation(this._progress = this._easing((time-this._startTime)/this._duration))
            // END
            else this.end()
        }
    }

    end() {
        this._animation(1)
        this._hasEnded = true
        if (typeof this._endCallback == "function") this._endCallback()
    }

    reset() {
        this._progress = 0
        this._hasEnded = false
        this._startTime = null
    }

    get id() {return this._id}
    get animation() {return this._animation}
	get duration() {return this._duration}
	get easing() {return this._easing}
	get endCallback() {return this._endCallback}
	get startTime() {return this._startTime}
	get progress() {return this._progress}
	get hasEnded() {return this._hasEnded}

	set animation(_animation) {return this._animation = _animation}
	set duration(_duration) {return this._duration = _duration}
	set easing(_easing) {return this._easing = _easing}
	set endCallback(_endCallback) {return this._endCallback = _endCallback}

    // Easings from: https://easings.net/
    static get easeInOutQuad() {
        return (x) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
    }

    static get easeOutQuad() {
        return (x) => 1 - (1 - x) * (1 - x)
    }

    static get easeOutBounce() {
        return (x) => {
            if (x < 1 / 2.75) return 7.5625 * x * x
            else if (x < 2 / 2.75) return 7.5625 * (x -= 1.5 / 2.75) * x + 0.75
            else if (x < 2.5 / 2.75) return 7.5625 * (x -= 2.25 / 2.75) * x + 0.9375
            else return 7.5625 * (x -= 2.625 / 2.75) * x + 0.984375
        }
    }

    static get easeInOutBounce() {
        return (x) =>x < 0.5 ? (1 - this.easeOutBounce(1 - 2 * x)) / 2: (1 + this.easeOutBounce(2 * x - 1)) / 2
    }

    static get easeInOutBack() {
        return (x) => x < 0.5? (Math.pow(2 * x, 2) * ((1.70158 * 1.525 + 1) * 2 * x - 1.70158 * 1.525)) / 2 : (Math.pow(2 * x - 2, 2) * ((1.70158 * 1.525 + 1) * (x * 2 - 2) + 1.70158 * 1.525) + 2) / 2
    }

    static get easeInOutElastic() {
        return (x) => x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * (2 * Math.PI) / 4.5)) / 2 : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * (2 * Math.PI) / 4.5)) / 2 + 1;
    }
    static get linear() {
        return x=>x
    }
}