<template>
    <div class="c--container" >
        <span
            v-for='(item, index) in data'
            :key='"scene" + index'
            class="sceen"
            @enter='state="pinted"'
            @leave='state="unpinted"'
            v-scrollmagic-scene.indicators='item'
            v-scrollmagic-pin='"#pin"'
            v-scrollmagic-class-toggle='"#pin"'></span>

        <div class="spacer"></div>
        <div class="trigger" id='trigger'></div>
        <div class="pin" id='pin'>
            <p>{{state}}</p>
        </div>
        <div class="spacer"></div>
        <div class="spacer"></div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            state: 'unpinted',
            data: [
                { triggerElement: '#trigger', duration: 150, offset: 0 },
                { triggerElement: '#trigger', duration: 150, offset: 300 },
                { triggerElement: '#trigger', duration: 150, offset: 600 }
            ]
        }
    }
}
</script>
<style scoped>
.c--container {
    text-align: center;
    display: block;
}
.scene {
    display: none;
}
.spacer {
    height: 500px;
}
.actived {
    background-color: green !important;
}
.trigger {
    height: 1px;
}
.pin {
    width: 100px;
    height: 100px;
    color: white;
    display: inline-block;
    align-items: center;
    justify-content: center;
    background-color: red;
}
</style>
