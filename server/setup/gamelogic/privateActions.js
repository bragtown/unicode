module.exports = {
    draw:function(player, number){
        for(let i = 0; i < number; i++){
            // console.log("drawing...")
            player.hand.push(player.deck.pop());
        }
    },
    endTurn:function(){

    },
    startTurn:function(){

    },
    releaseTargets:function(game){
        game.p1.releaseTargets();
        game.p2.releaseTargets();
        return true;
    },
    destroyMinions:function(game){
        game.p1.destroyMinions();
        game.p2.destroyMinions();
    }
}