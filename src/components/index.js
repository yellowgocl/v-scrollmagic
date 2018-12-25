import * as Directives from './directives'
import { map, kebabCase, isFunction, assign, isUndefined } from 'lodash'
const plugins = {
    tween: () => require('scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js'),
    indicators: () => require('scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js')
}
export default {
    install (Vue, option) {
        // register directives for global
        option = assign({}, { indicators: true }, option)
        Vue.SCROLLMAGIC_DEBUG = isUndefined(option.debug) ? process.env.VUE_APP_V_SCROLL_MAGIC_DEBUG === 'true' : option.debug
        map(option, (v, k) => {
            v && plugins[k] && plugins[k].apply(this)
        })
        map({ ...Directives }, (v, k) => {
            return Vue.directive(kebabCase('scrollmagic' + k), isFunction(v) ? v() : v)
        })
    }
}
