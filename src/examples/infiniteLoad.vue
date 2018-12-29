<template>
    <div class="c--container">
        <div class="scene">
            <item
                v-for='(item, index) in data'
                :key='index'
                :color='item.color'
                :index='index'>
                <div></div>
            </item>
        </div>
        <div class="loading" v-scrollmagic-scene.start.self.indicators @enter='onenter'>loading</div>
    </div>
</template>
<script>
export default {
    components: {
        item: {
            functional: true,
            name: 'item',
            render (h, context) {
                return <div class='item' style={{backgroundColor: context.props.color}}>item-{context.props.index}</div>
            },
            props: { 
                index: { type: Number, default: 0 },
                color: { type: String }
            }
        }
    },
    data () {
        return {
            data: []
        }
    },
    mounted () {
        // this.createItems(50)
    },
    methods: {
        onenter () {
            setTimeout(() => this.createItems(50), 2000)
        },
        createItems (amount) {
            for (var i = 0; i < amount; i++) {
                let color = (`00000${(Math.random() *  0xFFFFFF << 0).toString(16)}`).slice(-6)
                this.data.push({ color: `#${color}`  })
            }
        }
    }
}
</script>
<style scoped>
.item {
    padding: 20px;
    color: white;
    margin-bottom: 10px;
}
</style>

