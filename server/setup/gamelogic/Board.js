module.exports = class Board {
    constructor(cards){
        this.cards = cards;
        this.targetable = true;
        this.setToTarget = false;
    }
    isTargetable(card, player){
        if (this.cards <= 7){
            if(card.cost >= player.manaLeft){
                this.setToTarget = true;
            }
        }
    }
}