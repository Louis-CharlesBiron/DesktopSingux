// 
class Action {

    constructor(name, action, weight, cooldown=5000, stateIgnoredCooldown=false) {
        this._name = name                                 // action name, ex: minimizeWindow
        this._action = action                             // callback containing the action to run: (end)=>{} // end is a function that needs to be called when the action is finished
        this._weight = weight                             // probability of being chosen, number 1-100, 100 being the most likely
        this._cooldown = cooldown                         // cooldown in ms before being available to be played again 
        this._cooldownProg = 0                            // cooldown progress in ms 
        this._stateIgnoredCooldown = stateIgnoredCooldown // whether the state ignores this action's cooldown when setting its own
        // CHANGE ↑ this to modifier instead of bool probably
    }

    play(endCallback) {
        this._action(endCallback)
        this._cooldownProg = this._cooldown

        return this
    }

    get name() {return this._name}
	get action() {return this._action}
	get weight() {return this._weight}
	get cooldown() {return this._cooldown}
	get cooldownProg() {return this._cooldownProg}
	get stateIgnoredCooldown() {return this._stateIgnoredCooldown}

	set name(_name) {return this._name = _name}
	set action(_action) {return this._action = _action}
	set weight(_weight) {return this._weight = _weight}
	set cooldown(_cooldown) {return this._cooldown = _cooldown}
	set cooldownProg(c) {return this._cooldownProg = c}
	set stateIgnoredCooldown(s) {return this._stateIgnoredCooldown = s}


}