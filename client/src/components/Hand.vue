<template>
    <div class = "hand">
        <card v-for = "(handCard, index) in cards" :card="handCard" :index="index"></card>
    </div>
</template>
<script>
import Card from './Card.vue'
export default {
    name:"Hand",
    components:{
        Card
    },
    props:["cards"],
    data:function(){
        return{

        }
    }
}
</script>
<style>

</style>
