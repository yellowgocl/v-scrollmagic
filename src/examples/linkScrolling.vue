<template>
    <div class="c--container">
        <form class='move'>
            <fieldset>
                <legend>anchor</legend>
                <p
                    v-for='(item, index) in data'
                    :key='`anchor-${index}`'>
                    <a :href="`#${item.id}`">{{item.id}}</a>
                </p>
            </fieldset>
        </form>
        <div class='spacer'></div>
        <template
            v-for='(item, index) in data'>
            <a :id='item.id' :key='`action-${index}`'></a>
            <div class='spacer1' :key='`spacer-${index}`'></div>
        </template>
        <div class="scene"
            v-scrollmagic-scene.indicators.end='sceneOption'
            v-scrollmagic-tween='tween'>
            <div class="box">
                box
            </div>
        </div>
        <div class='spacer'></div>
        <div class='spacer'></div>
    </div>
</template>
<script>
import TweenMax from 'TweenMax'
export default {
    data () {
        return {
            data: [
                { id: 'top' },
                { id: 'middle' },
                { id: 'bottom' }
            ],
            sceneOption: {
                triggerElement: "#top",
                duration: 200,
            },
            tween: null
        }
    },
    mounted () {
        this.tween = TweenMax.from('.scene', 0.5, { autoAlpha: 0, scale: 0.5 })
    }
}
</script>
<style scoped>
.move {
    position: fixed;
}
.spacer {
    height: 400px;
}
.spacer1 {
    height: 100px;
}
.scene {
    display: flex;
    justify-content: center;
    align-items: center;
}
.box {
    width: 100px;
    height: 100px;
    color: white;
    background-color: darkblue;
}
</style>
