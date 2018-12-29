<template>
    <div class="c-container" v-scrollmagic-controller:myController.end>
        <p><span>offset:{{offset}}</span><input type="range" id='offset' size='3' v-model='offset' min='-300' max='300' step='1'></p>
        <div
            class="panel"
            v-scrollmagic-scene:myController.self
            v-scrollmagic-pin
            :vscrollmagic-offset='offset'
            v-for='(item, index) in data'
            :key='index'
            :class='[`--c${index}`]'>
                <b>{{item.text}}</b>
            </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            data: [
                { text: 'One' },
                { text: 'Two' },
                { text: 'Three' },
                { text: 'Four' }
            ],
            offset: 0
        }
    }
}
</script>
<style lang='postcss' scoped>
.c-container {
}
.panel {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
}
b {
    font-size: 3rem;
    color: white;
}
.panel.--c0 {
    background: green;
}
.panel.--c1 {
    background: red;
}
.panel.--c2 {
    background: blue;
}
.panel.--c3 {
    background: pink;
}
</style>
