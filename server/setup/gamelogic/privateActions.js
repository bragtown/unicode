module.exports = {
    draw:function(player, number){
        for(let i = 0; i < number; i++){
            // console.log("drawing...")
            player.hand.push(player.deck.pop());
        }
    }
}