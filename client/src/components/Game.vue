<template>
  <div>
      <textarea v-model="control"></textarea>
      <button v-on:click="doAction()">Do Action</button>
      <div v-if = "board != null">
          <table class = "table">
            <tbody>
              <tr>
                  <td colspan = "3"><Hand :cards = "board.game.p2.hand"></Hand></td>
              </tr>
              <tr>
                  <td>[{{board.game.p2.deck.length}}]</td>
                  <td><Hero :hero = "board.game.p2.hero"></Hero></td>
                  <td>Mana: {{board.game.p2.manaLeft}}</td>
              </tr>
              <tr>
                  <td colspan = "3"><Board v-if = "board" :board = "board.game.p2.board"></Board></td>
              </tr>
              <tr>
                  <td colspan = "3"><button v-on:click = "endTurn()">End Turn</button></td>
              </tr>
              <tr>
                  <td colspan = "3"><Board v-if = "board" :board = "board.game.p1.board"></Board></td>
              </tr>
              <tr>
                  <td>[{{board.game.p1.deck.length}}]</td>
                  <td><Hero :hero = "board.game.p1.hero"></Hero></td>
                  <td>Mana: {{board.game.p1.manaLeft}}</td>
              </tr>
              <tr>
                  <td colspan = "3"><Hand :cards = "board.game.p1.hand"></Hand></td>
              </tr>
            </tbody>
          </table>
      </div>
  </div>
</template>
<script>
import io from 'socket.io-client'
import Hand from './Hand.vue'
import Hero from './Hero.vue'
import Board from './Board.vue'
import {mapGetters} from 'vuex'
export default {
    components:{
        Hand,
        Hero,
        Board
    },
    computed:{
        ...mapGetters([
            'socket'
        ])
    },
    data:function(){
        return{
            control:"",
            board:null,
            actions:[
                {
                    actorChain:[],
                    action:"changeTurn",
                    targetChain:[],
                    actionParams:[],
                    playerId:1
                },
                {
                    actorChain:["p1"],
                    action:"playToBoard",
                    targetChain:undefined,
                    actionParams:[0, 1],
                    playerId:0
                },
                {
                    actorChain:[],
                    action:"changeTurn",
                    targetChain:[],
                    actionParams:[],
                    playerId:0
                },
                {
                    actorChain:["p2"],
                    action:"playToBoard",
                    targetChain:undefined,
                    actionParams:[0, 1],
                    playerId:1
                },
                {
                    actorChain:[],
                    action:"changeTurn",
                    targetChain:[],
                    actionParams:[],
                    playerId:1
                },
                {
                    actorChain:["p1", "board", 0],
                    action:"findTargets",
                    targetChain:[],
                    actionParams:["attack"],
                    playerId:0
                },
                {
                    actorChain:["p1", "board", 0],
                    action:"dealDamage",
                    targetChain:["p2", "board", 0],
                    actionParams:[],
                    playerId:0
                },
                {
                    actorChain:[],
                    action:"releaseTargets",
                    targetChain:[],
                    actionParams:[],
                    playerId:0
                },
                {
                    actorChain:[],
                    action:"changeTurn",
                    targetChain:[],
                    actionParams:[],
                    playerId:0
                }

            ]
        }
    },
    beforeMount(){
        this.makeSocket();
    },
    methods:{
        makeSocket(){
            let vm = this;
            
            vm.socket.on('connect', ()=>{
                vm.socket.emit('gamesearch', 'myinfo')
            })
            
            vm.socket.on('confirmconnect', function(msg){
                console.log('iotest', msg);
                // searchBtn.disabled = false;
                // action.disabled = false;
                // control.disabled = false;
                // searchBtn.addEventListener("click", gamesearch);
                // action.addEventListener("click", doAction);
                vm.control = `{
                    "actorChain":[],
                    "action":"changeTurn",
                    "targetChain":[],
                    "actionParams":[],
                    "playerId":0
                }`
            })
            
            vm.socket.on('gameboard', function(msg){
                console.log(msg)
                vm.board = msg;
                console.log('p1', msg.game.p1.board);
                console.log('p2', msg.game.p2.board);
            })
        },
        gamesearch(){
            this.socket.emit("gamesearch", "My Info")
        },
        doAction(){

            // this.socket.emit("action", this.control)
            if(this.actions.length) this.socket.emit("action", JSON.stringify(this.actions.splice(0,1)[0]))
        },
        endTurn(){
            this.socket.emit("action", JSON.stringify(
                {
                    actorChain:[],
                    action:"changeTurn",
                    targetChain:[],
                    actionParams:[],
                    playerId:0
                }
            ))
        }
    }
}
</script>
<style>
    .canBeSelected{
        color:lightblue;
    }
</style>
