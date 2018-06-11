const Card = require("./Card")
module.exports = class Damageable extends Card {
    constructor (name, emote, cost, health, attack){
        super(name, emote, cost)
        this.cost = cost;
        this.health = health;
        this.attack = attack;
        this.summoningSickness = true;
        this.setToTarget = false;
    }
    dealDamage(emptyParam, target, returnObj){
        if(!this.summoningSickness && target.setToTarget == true){
            returnObj.msg += (this.name + " is attacking " + target.name + "..."+'\n')
            target.takeDamage(this.attack, this.takeDamage.bind(this), returnObj);
            return true;
        }
        else{
            if(this.summoningSickness) returnObj.msg += (this.name + " can't attack"+'\n')
            if(!target.setToTarget) returnObj.msg += (target.name + " can't be attacked"+'\n')
            return false;
        }
    }
    takeDamage(amount, callback, returnObj){
        this.health -= amount;
        returnObj.msg += (this.name + "'s health is being reduced by " + amount + " to " + this.health+'\n')
        if(this.health <= 0){
            //destroy this card
            returnObj.minionsDestroyed = true;
        }
        if(callback && this.attack > 0){
            callback(this.attack, undefined, returnObj)
        }
    }
    endTurnActions(){
        this.summoningSickness = false;
    }

}
