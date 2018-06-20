module.exports = class Game {
    constructor(p1, p2){
        this.p1 = p1;
        this.p2 = p2;
        p1.draw(3);
        p2.draw(3);
        this.activePlayer;
        this.startTurn(p1);
    }
    getTargets(hero, minion, board, opponent, self, card){
        let returnable = []
        returnable[this.p1.playerId] = {hero:false, minions:[], board:false}
        returnable[this.p2.playerId] = {hero:false, minions:[], board:false}
        if(opponent){
            if(this.p1.playerId != this.activePlayer.playerId){
                this.p1.findTargets(hero, minion, board, returnable, card)
            }
            else{
                this.p2.findTargets(hero, minion, board, returnable, card);
            }
        }
        
        if(self){
            if(this.p1.playerId == this.activePlayer.playerId){
                this.p1.findTargets(hero, minion, board, returnable, card)
            }
            else{
                this.p2.findTargets(hero, minion, board, returnable, card)
            }
        }
        return returnable;
        

    }   
    doAction(params){
        let returnObj = {msg:""}
        // console.log("Recieving action..." + params.action);
        let actor = this;
        let target = this;
        let breakAction = false;
        if(params.playerId == this.activePlayer.playerId){
            params.actorChain.forEach((item)=>{
                if(actor[item]) actor = actor[item];
                else breakAction = true;
            })
            if(params.targetChain){
                params.targetChain.forEach((item)=>{
                    if(target[item]) target = target[item]
                    else breakAction = true
                    
                })
            }
            if(!breakAction) {
                returnObj.result = actor[params.action](params.actionParams, target, returnObj)
                if(returnObj.minionsDestroyed) this.destroyMinions()
            }
            else returnObj.result = false;
        }
        returnObj.game = this;
        return returnObj
    }

}
