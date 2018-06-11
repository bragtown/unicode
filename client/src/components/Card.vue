<template>
    <span v-on:click = "findTargets()"> [ {{card.name}} {{card.cost}} ] </span>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name:"Card",
    props:["card", "index"],
    computed:{
        ...mapGetters([
            'socket'
        ])
    },
    methods:{
        findTargets:function(){
            let vm = this;
            this.socket.emit("action", JSON.stringify(
                {
                    actorChain:["p2", "hand", vm.index],
                    action:"findTargets",
                    targetChain:[],
                    actionParams:["playCard"],
                    playerId:1
                }
            ))
        }
    }
}
</script>
