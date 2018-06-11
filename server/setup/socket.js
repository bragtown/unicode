const Main = require('./gamelogic/Main')
class GameSearch {
    constructor(){
        this.search = [];
    }
    push(data){
        this.search.push(data)
    }
    start(){
        setInterval(function(){
            console.log('setting up games')
            setGames()
        },1000)
    }
    setGames(){
        while(this.search.length > 1){
            search[0].join("room"+gameCount)
            search[1].join("room"+gameCount)
            search.splice(0,2);
            gameCount++
        }
    }
    testSet(io){
        console.log('testing setup')
        this.search[0].join("room"+gameCount)
        let curSocket = this.search.splice(0,1);
        let main = new Main(curSocket, curSocket,"room"+gameCount,io)
        gameCount++
        return main
    }
}

module.exports = function(server){
    let gameSearch = new GameSearch()
    let io = require('socket.io')(server);
    io.on('connection', function(socket){
        console.log("A user connected!")
        socket.emit('confirmconnect', 'connected');
        
        socket.on('gamesearch', function(payload){
            console.log("gamesearch", payload);
            gameSearch.push(socket)
            let main = gameSearch.testSet(io)
            
            io.to(main.room).emit('gameboard', main.listen(
                {
                    actorChain:[],
                    action:"changeTurn",
                    targetChain:[],
                    actionParams:[],
                    playerId:0
                }
            ))
            socket.on('action', function(msg){
                
                msg = JSON.parse(msg);
                
                // console.log(msg)
                // socket.emit('gameboard', main.listen(msg))
                io.to(main.room).emit('gameboard', main.listen(msg))
            });
        })
 
    })
}
let gameCount = 0;