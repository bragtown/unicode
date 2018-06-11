<template>
  <div :class = "board.setToTarget ? 'highlighted' : ''">
      <span v-for="(card, index) in board.cards"><Minion :minion = "card"></Minion></span>
  </div>
</template>
<script>
import Minion from './Minion.vue'
export default {
  components:{
    Minion
  },
  name:"Board",
  props:["board"]
}
</script>
<style scoped>
  .highlighted{
    border: 3px solid lightblue;
  }
</style>

