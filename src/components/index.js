// import Context from './context'
import { map, kebabCase, isFunction, isUndefined, assign } from 'lodash'
import * as Directives from './directives'
const plugins = {
    tween: () => require('animation.gsap'),
    indicators: () => require('debug.addIndicators')
}
export default {
    install (Vue, option) {
        option = assign({}, { indicators: true }, option)
        Vue.SCROLLMAGIC_DEBUG = isUndefined(option.debug) ? process.env.VUE_APP_V_SCROLL_MAGIC_DEBUG === 'true' : option.debug
        // Vue.vScrollMagic = Vue.prototype.$vScrollMagic = Context.getInstance()
        map(option, (v, k) => {
            v && plugins[k] && plugins[k].apply(this)
        })
        map({ ...Directives }, (v, k) => {
            return Vue.directive(kebabCase('scrollmagic' + k), isFunction(v) ? v() : v)
        })
    }
}
