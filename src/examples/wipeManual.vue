<template>
    <div class="c--container viewport" v-scrollmagic-controller>
        <div class="container viewport"
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
    }
}
</script>
<style scoped>
.viewport {
    width: 100%;
    height: 100%;
}
.c--container {
    font-size: 2rem;
}
.container {
    overflow: hidden;
    color: white;
    text-align: center;
    perspective: 1000;
}
.content {
    height: 100%;
    width: 400%;
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
    margin: -5% 0
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
