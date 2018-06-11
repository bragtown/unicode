
const Main = require("./classes/Main");
console.log(Main);
let main = new Main();

main.listen({
    actorChain:[],
    action:"changeTurn",
    targetChain:[],
    actionParams:[],
    playerId:0
})

main.listen({
    actorChain:[],
    action:"changeTurn",
    targetChain:[],
    actionParams:[],
    playerId:1
})


main.listen({
    actorChain:["p1"],
    action:"playToBoard",
    targetChain:undefined,
    actionParams:[0, 1],
    playerId:0
})

main.listen({
    actorChain:[],
    action:"changeTurn",
    targetChain:[],
    actionParams:[],
    playerId:0
})

main.listen({
    actorChain:["p2"],
    action:"playToBoard",
    targetChain:undefined,
    actionParams:[0, 1],
    playerId:1
})

main.listen({
    actorChain:[],
    action:"changeTurn",
    targetChain:[],
    actionParams:[],
    playerId:1
})

main.listen({
    actorChain:["p1", "board", 0],
    action:"findTargets",
    targetChain:[],
    actionParams:["attack"],
    playerId:0
})


main.listen({
    actorChain:["p1", "board", 0],
    action:"dealDamage",
    targetChain:["p2", "board", 0],
    actionParams:[],
    playerId:0
})

main.listen({
    actorChain:[],
    action:"releaseTargets",
    targetChain:[],
    actionParams:[],
    playerId:0
})

main.listen({
    actorChain:[],
    action:"changeTurn",
    targetChain:[],
    actionParams:[],
    playerId:0
})