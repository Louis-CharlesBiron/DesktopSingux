const ACCEPTABLE_DIF = 0.0000001

function random(min, max, decimals = 0) {
    return +(Math.random() * (max - min) + min).toFixed(decimals)
}

class FPSCounter {
    constructor(avgSampleSize) {
        this._t = []
        this._maxFps = 0
        this._avgSampleSize = avgSampleSize || 10
        this._avg = []
    }

    getFpsRaw() {//run in the loop
        let n = performance.now(), fps
        while (this._t.length > 0 && this._t[0] <= n - 1000) this._t.shift()
        fps = this._t.push(n)
        if (this._maxFps < fps) this._maxFps = fps
        return fps
    }

    getFps() {//or run in the loop
        this._avg.push(this.getFpsRaw())
        if (this._avg.length > this._avgSampleSize) this._avg.shift()
        return Math.floor(Math.min(this._avg.reduce((a, b) => a + b, 0) / this._avgSampleSize, this._maxFps))
    }

    get maxFps() { return this._maxFps - 1 }
    get avgSample() { return this._avgSampleSize }
    get fpsRaw() { return this._t.length }

    set avgSample(s) { this._avgSampleSize = s }
}

Array.prototype.last=function(index=0){return this[this.length-1-index]}
Array.prototype.addAt=function(el, index=0){return this.slice(0,index).concat(...[el, this.slice(index, this.length)])}

function getDist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
}

/**
 * Returns the interpolated number between (max) and (max-range) 
 * @param {Number} max: the max value to return
 * @param {Number} ratio: the linear interpolation progress (0 to 1)
 * @param {Number} range: defines the range of the max value to be used, inverts direction when negated
                          [if range=max, then (0 to max) will be used] or
                          [if range=max/2, only (max/2 to max) will be used] or
                          [if range=0, only (max to max) will be used]
 */
function mod(max, ratio, range) {
    return max - ratio * range + max * (((range??=max)>=0)-1)
}

function formatColor(rgba) {
    return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`
}

function toRad(deg) {
    return deg * (Math.PI / 180)
}

function toDeg(rad) {
    return rad / (Math.PI / 180)
}

function getAcceptableDif(n, okDif) {
    return Math.round(n) - n <= okDif ? Math.round(n) : n
}

function weightedRandom(weights) {// [5, 14, 200, 4, 80...]
    let pool = weights.reduce((a,b,i)=>a.concat((a[i-1]??0)+b), []), num = random(0, pool[pool.length-1])
    return pool.indexOf(pool.reduce((a,b)=>a<num?b:a,-1))
}

