module.exports = {
    changeTurn:function(game, params){       
        returnObj.msg += ("Changing turns!\n")
        if (game.p1.turn){
            returnObj.msg += ("Ending turn for player 1\n")
            endTurn(game.p1)
            startTurn(game.p2)
        }
        else {
            returnObj.msg += ("Ending turn for player 2\n")
            endTurn(game.p2)
            startTurn(game.p1);
        }
        return true;    
    },
    startTurn:function(player){
        player.turn = true;
        player.draw(1);
        player.mana++
        player.manaLeft = player.mana;
        this.activePlayer = player;
        // console.log(player.hand)
    },
    endTurn:function(player){
        player.turn = false;
        player.board.cards.forEach(minion=>{
            minion.endTurnActions();
        })
    }
}