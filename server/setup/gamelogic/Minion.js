const Damageable = require("./Damageable");
module.exports = class Minion extends Damageable {
    constructor (name, emote, cost, health, attack){
        super(name, emote, cost, health, attack)
        this.targetable = true;
    }
    //pushes to the index if this is targetable
    isTargetable(arr, ind){
        if(this.targetable){
            this.setToTarget = true;
            arr.push(ind);
        }
    }
}
