<template>
    <div class="c--container" v-scrollmagic-controller.start='{ globalSceneOptions: { duration: "300%" } }'>
        <div class="info">
            <p><span>progress:</span>{{progress}}</p>
            <p><span>offset:{{offset}}</span><input type="range" id='offset' size='3' v-model='offset' min='-300' max='300' step='1'></p>
        </div>
        <div class="panel"
            v-for='(item, index) in data'
            :key='"panel"+index'
            v-scrollmagic-scene.self
            :scrollmagic-offset='offset'
            v-scrollmagic-tween='item.tween'
            @progress='onchange'>
            <div class="content"
                :id='"content"+index'
                :style='{backgroundImage: "url(" + item.src + ")"}'>
            </div>
        </div>
    </div>
</template>
<script>
// import { TweenMax } from 'gsap'
// import { map } from 'lodash'
export default {
    data () {
        return {
            data: [],
            progress: 0,
            offset: 0
        }
    },
    mounted () {
        for (let i = 0; i < 3; i++) {
            // this.data[i] = ({ text: 'One', src: `/images/parallax_bg${i}.png`, tween: [`#content${i}`, 1, { y: '50%' }] })
            this.$set(this.data, i, { src: `/images/parallax_bg${i + 1}.png`, tween: [`#content${i}`, 1, { y: '50%' }] })
        }
    },
    methods: {
        onchange (event) {
            this.progress = event.progress
        }
    }
}
</script>
<style scoped>
.c--container {
    height: 100%;
}
.info {
    position: fixed;
    top: 10%;
    left: 20px;
    z-index: 1;
}
.panel {
    height: 100vh;
    overflow: hidden;
}
.panel > .content {
    height: 200%;
    width: 200%;
    position: relative;
    top: -100%;
    left: -100%;
}
</style>
