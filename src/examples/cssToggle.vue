<template>
    <div class="c-container" v-scrollmagic-controller :scrollmagic-option='controllerOption'>
        <form action="#">
            <fieldset>
                <p v-for='(item, index) in menu' :key='index' :id='item.id'>{{item.name}}</p>
            </fieldset>
        </form>
        <div class="spacer1"></div>
        <div
            v-scrollmagic-scene.self
            v-scrollmagic-class-toggle='`#${item.id}`'
            v-for='(item, index) in menu'
            :key='"panel-" + index'
            :class-toggle='"actived"'
            class="panel"
            :class='`panel-${index}`'></div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            menu: [
                { name: 'One', id: 'menu0' },
                { name: 'Two', id: 'menu1' },
                { name: 'Three', id: 'menu2' },
                { name: 'Four', id: 'menu3' }
            ],
            controllerOption: {
                globalSceneOptions: {
                    duration: 200
                }
            }
        }
    }
}
</script>
<style lang='postcss' scoped>
.c-container {
    width: 100vw;
}
.spacer1 {
    min-height: 300px;
}
form {
    text-align: left;
    position: fixed;
    top: 100px;
    background: white;
    left: 20px;
    display: block;
}
p {
    float: left;
    padding: 10px;
}
.actived {
    background: red;
    color: white;
}
.panel-0 {
    background: red;
}
.panel-1 {
    background: green;
}
.panel-2 {
    background: blue;
}
.panel-3 {
    background: yellow;
}

.panel {
    height: 200px;
}
</style>
