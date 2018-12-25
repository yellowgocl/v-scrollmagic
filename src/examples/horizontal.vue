<template>
    <div class="c--container" v-scrollmagic-controller.horizontal>
        <div class="spacer"></div>
        <div id="trigger"></div>
        <div 
            class="scene"
            scrollmagic-trigger-element="#trigger"
            v-scrollmagic-scene.indicators='{ duration: 500 }'
            v-scrollmagic-tween='[".scene", { backgroundColor: "green", width: "+=400" }]'>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {}
    },
    mounted () {
                   
    }
}
</script>
<style scoped>
.c--container {
    height: 100%;
    display: flex;
    flex-direction: row;
}
#trigger {
    min-width: 1px;
}
.spacer {
    min-width: 200px;
}
.scene {
    width: 100px;
    height: 60px;
    background-color: blue;
}
</style>

