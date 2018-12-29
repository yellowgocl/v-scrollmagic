<template>
  <div id="app">
    <select name="examples" id="examples" v-model='selectedOption'>
        <option
          v-for='(item, index) in options'
          :key='index'
          :value='item | camelCase'>{{item}}
        </option>
      </select>
      <component :is='componentName'></component>
  </div>
</template>

<script>
import * as Examples from './examples'
import { camelCase } from 'lodash'
export default {
    name: 'app',
    data () {
        return {
            options: Object.keys(Examples),
            selectedOption: Object.keys(Examples)[7]
        }
    },
    filters: {
        camelCase (v) {
            return camelCase(v)
        }
    },
    computed: {
        componentName () {
            return camelCase(this.selectedOption)
        }
    },
    components: { ...Examples },
    created () {
        console.info(process.env)
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
html, body {
    width: 100%;
    margin: 0;
    height: 100%;
}
</style>
