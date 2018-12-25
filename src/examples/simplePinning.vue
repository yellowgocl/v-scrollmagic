<template>
    <div class="c-container" v-scrollmagic-controller>
        <div class="spacer1"></div>
        <template v-for='(item, index) in data'>
            <div
                :id="'trigger'+index"
                :key="'trigger'+index">
                {{'trigger'+index}}
            </div>
            <div
                :id="'content'+index"
                :key="'content'+index"
                v-scrollmagic-scene='{ duration: item.duration, triggerElement: "#trigger"+index }'
                v-scrollmagic-pin.self>
                <b >{{'content'+index}}</b>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    data () {
        return {
            data: [
                { duration: 300 },
                { duration: 400 }
            ]
        }
    }
}
</script>
<style lang='postcss' scoped>
.c-container {
    width: 100vw;
    height: 1600px;
}
.spacer1 {
    min-height: 200px;
}
</style>
