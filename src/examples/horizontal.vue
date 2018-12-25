<template>
    <div class="c--container">
        <div class="spacer viewport">scroll to left</div>
        <div class='spacer' v-scrollmagic-controller:myController.horizontal>
            <div class="spacer s2"></div>
            <div id="trigger" class='spacer'></div>
            <div
                class="scene"
                v-scrollmagic-scene:myController.indicators='{ duration: 500 }'
                v-scrollmagic-tween='[".scene", 3, { backgroundColor: "green", width: "+=400" }]'
                scrollmagic-trigger-element="#trigger" >
            </div>
            <div class="spacer viewport"></div>
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
    display:inline-block;
    min-width: 100%;
    width: 100%;
    white-space: nowrap;
    vertical-align: top;
}
.spacer.viewport {
    min-width: 100%;
}
#trigger {
    min-width: 1px;
}
.spacer.s2 {
    min-width: 200px;
    width: 200px;
}
.spacer {
    display: inline-block;
    vertical-align: top;
    height: 100%;
    margin-bottom: 0;
    vertical-align: top;
}
.scene {
    margin: -25px 25px auto 25px;
    width: 50px;
    height: 60px;
    padding: 0 5px;
    background-color: blue;
    display: inline-block;
}
</style>
