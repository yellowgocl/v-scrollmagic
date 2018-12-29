<template>
    <div class="c--container" v-scrollmagic-controller>
        <div class="spacer"></div>
        <div class="trigger"></div>
        <div
            class="info"
            @progress="onprogress"
            @start="onstate"
            @end="onstate"
            @enter="onstate"
            @leave='onstate'
            @update='onupdate'
            v-scrollmagic-scene.indicators='{triggerElement: ".trigger", duration: 200}'>
            <p class="direction">direction: {{direction}}</p>
            <p class="state">state: {{state}}</p>
            <p class="lastHit">lastHit: {{lastHit}}</p>
            <p class="progress">progress: {{progress}}</p>
        </div>
        <div class="spacer"></div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            direction: '',
            state: '',
            lastHit: '',
            progress: ''
        }
    },
    methods: {
        onprogress (event) {
            this.progress = event.progress
        },
        onupdate (event) {
            this.direction = event.target.controller().info('scrollDirection')
        },
        onstate (event) {
            switch (event.type) {
            case 'enter':
                this.state = 'inside'
                break
            case 'leave':
                this.state = 'outside'
                break
            case 'start':
                this.lastHit = 'top'
                break
            case 'end':
                this.lastHit = 'bottom'
                break
            }
        }
    }
}
</script>
<style scoped>
.trigger {
    height: 1px;
}
.spacer {
    height: 400px;
}
.info {
    display: flex;
    padding: 20px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    vertical-align: middle;
    height: 200px;
    background-color: darkgreen;
}
</style>
