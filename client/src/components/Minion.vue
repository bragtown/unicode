<template>
  <div :class = "minion.setToTarget? 'canBeSelected' : ''">[ A:{{minion.attack}} {{minion.name}} H:{{minion.health}} ]</div>
</template>
<script>
export default {
  name:"Minion",
  props:["minion"]
}
</script>
