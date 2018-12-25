<template>
    <div class="c--container" v-scrollmagic-controller>
        <div class="container"
            id='container'
            v-scrollmagic-scene.end.self='{ duration: "500%" }'
            v-scrollmagic-tween='tween'
            v-scrollmagic-pin>
            <div
                class="content"
                id='content'>
                <div
                    class="panel"
                    v-for='(item, index) in data' :key='index'
                    :class='item.class'>
                    <b>{{item.text}}</b>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
/* import { ScrollMagic } from '../components/const' */
import { TimelineMax } from 'gsap'
export default {
    data () {
        return {
            data: [
                { text: 'one', class: 'green' },
                { text: 'two', class: 'blue' },
                { text: 'three', class: 'red' },
                { text: 'four', class: 'grey' }
            ],
            tween: null,
            target: undefined
        }
    },
    mounted () {
        /* let controller = new ScrollMagic.Controller() */
        this.tween = new TimelineMax()
            .to('#content', 0.5, { z: -150 })
            .to('#content', 1, { x: '-25%' })
            .to('#content', 0.5, { z: 0 })
            .to('#content', 0.5, { z: -150, delay: 1 })
            .to('#content', 1, { x: '-50%' })
            .to('#content', 0.5, { z: 0 })
            .to('#content', 0.5, { z: -150, delay: 1 })
            .to('#content', 1, { x: '-75%' })
            .to('#content', 0.5, { z: 0 })
        /* let scene = new ScrollMagic.Scene({ triggerElement: '#container', triggerHook: 'onLeave', duration: '500%' })
            .setPin('#container')
            .setTween(tween)
            .addTo(controller) */
    }
}
</script>
<style scoped>
.spacer {
    height: 1000px;
}
.c--container {
    width: 100%;
    height: 100%;
    font-size: 2rem;
}
.container {
    height: 100%;
    width: 100%;
    min-height: 100%;
    overflow: hidden;
    color: white;
    text-align: center;
    perspective: 1000;
}
.content {
    height: 100%;
    width: 400%;
    min-height: 100%;
}
.panel {
    height: 100%;
    width: 25%;
    float: left;
}
b {
    position: relative;
    display: block;
    overflow: visible;
    top: 50%;
}
.green {
    background-color: green;
}
.blue {
    background-color: blue;
}
.red {
    background-color: red;
}
.grey {
    background-color: darkgray;
}
</style>
