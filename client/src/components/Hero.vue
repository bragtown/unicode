<template>
    <div :class = "hero.setToTarget? 'canBeSelected' : ''">
        A:{{hero.attack}} {{hero.name}} H:{{hero.health}}
    </div>
</template>
<script>
export default {
    name:"Hero",
    props:["hero"]
}
</script>

