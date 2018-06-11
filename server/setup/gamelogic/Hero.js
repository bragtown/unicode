const Damageable = require("./Damageable");
module.exports = class Hero extends Damageable {
    constructor (name, emote, cost, health, attack){
        super(name, emote, cost, health, attack)
        this.health = 30;
        this.targetable = true;
    }
    isTargetable(obj){
        obj.hero = this.targetable;
        this.setToTarget = true;
    }

}