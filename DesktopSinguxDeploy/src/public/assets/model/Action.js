class Action {

    constructor(name, action, weight, cooldown=5000, sciModifier=1) {
        this._name = name                // action name, ex: minimizeWindow
        this._action = action            // callback containing the action to run: (end)=>{} // the provided "end" parameter is a function you need to call when your action is finished
        this._weight = weight            // probability of being chosen, number 1-100, 100 being the most likely
        this._cooldown = cooldown        // cooldown in ms before being available to be played again 
        this._cooldownProg = 0           // cooldown progress in ms 
        this._sciModifier = sciModifier  // modifier of this action's cooldown value when the state is setting its own (state cooldown increment modifier)
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
	get modCooldown() {return this._cooldown*this._sciModifier}
	get cooldownProg() {return this._cooldownProg}
	get sciModifier() {return this._sciModifier}

	set name(_name) {return this._name = _name}
	set action(_action) {return this._action = _action}
	set weight(_weight) {return this._weight = _weight}
	set cooldown(_cooldown) {return this._cooldown = _cooldown}
	set cooldownProg(c) {return this._cooldownProg = c}
	set sciModifier(s) {return this._sciModifier = s}


}