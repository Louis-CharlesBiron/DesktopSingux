// 

class State {
    constructor(name, actions=[], baseDelay=3000) {
        this._name = name           // state name, ex: idle
        this._actions = actions     // array of all possible actions: [Action]
        this._currentAction = null  // current action being played
        this._startTime = null      // time in ms at start
        this._actionPlayed = 0      // count of all played action
        this._delay = baseDelay     // delay between action picks
        this._delayProg = 0         // delay progress
    }

    // called once on character state change
    init(time) {
        this._startTime = time
        this._actionPlayed = 0

        return this
    }

    // chooses and plays action
    chooseAction() {
        let possibleActions = this._actions.filter(a=>!a.cooldownProg)
        if (possibleActions.length) {
            this._currentAction = possibleActions[weightedRandom(possibleActions.map(a=>a.weight))].play(()=>this._currentAction=null)
            this._delayProg = this._delay+this._currentAction.modCooldown
            this._actionPlayed++
        }
    }

    // runs every frame
    tick(msDeltaTime) {
        if (this._delayProg > 0) {// state cooldown
            this._delayProg -= msDeltaTime
            if (this._delayProg < 0) this._delayProg = 0
        } else if (!this._currentAction) {// can choose action if no current action
            this.chooseAction()
            console.log("CHOSING:", this._delayProg, this._actions.map(x=>x.cooldownProg))
        }

        // action cooldown
        this._actions.filter(a=>a.cooldownProg > 0).forEach(a=>{
            a.cooldownProg -= msDeltaTime
            if (a.cooldownProg < 0) a.cooldownProg = 0
        })
    }

    get name() {return this._name}
	get actions() {return this._actions}
	get currentAction() {return this._currentAction}
	get startTime() {return this._startTime}
	get actionPlayed() {return this._actionPlayed}
	get delay() {return this._delay}
	get delayProg() {return this._delayProg}

	set name(_name) {return this._name = _name}
	set actions(_actions) {return this._actions = _actions}
	set delay(delay) {return this._delay = delay}


}