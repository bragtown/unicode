module.exports = class Game {
    constructor(p1, p2){
        this.p1 = p1;
        this.p2 = p2;
        p1.draw(3);
        p2.draw(3);
        this.activePlayer;
        this.startTurn(p1);
    }
    startTurn(player){
        player.turn = true;
        player.draw(1);
        player.mana++
        player.manaLeft = player.mana;
        this.activePlayer = player;
        // console.log(player.hand)
    }
    endTurn(player){
        player.turn = false;
        player.board.forEach(minion=>{
            minion.endTurnActions();
        })
    }
    changeTurn(params, target, returnObj){
        returnObj.msg += ("Changing turns!\n")
        if(this.p1.turn){
            returnObj.msg += ("Ending turn for player 1\n")
            this.endTurn(this.p1)
            this.startTurn(this.p2)
        }
        else{
            returnObj.msg += ("Ending turn for player 2\n")
            this.endTurn(this.p2)
            this.startTurn(this.p1);
        }
        return true;    
    }
    getTargets(hero, minion, board, opponent, self){
        let returnable = []
        returnable[this.p1.playerId] = {hero:false, minions:[], board:false}
        returnable[this.p2.playerId] = {hero:false, minions:[], board:false}
        if(opponent){
            if(this.p1.playerId != this.activePlayer.playerId){
                this.p1.findTargets(hero, minion, board, returnable)
            }
            else{
                this.p2.findTargets(hero, minion, board, returnable)
            }
        }
        
        if(self){
            if(this.p1.playerId == this.activePlayer.playerId){
                this.p1.findTargets(hero, minion, board, returnable)
            }
            else{
                this.p2.findTargets(hero, minion, board, returnable)
            }
        }
        return returnable;
        

    }
    releaseTargets(){
        this.p1.releaseTargets();
        this.p2.releaseTargets();
        return true;
    }
    destroyMinions(){
        this.p1.destroyMinions();
        this.p2.destroyMinions();
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
        returnObj.result = false;
        returnObj.game = this;
        return returnObj
        //TODO
        //instead of returning false or true or what not, return that along with a copy of the game state and text indicating what happened
    }

}
