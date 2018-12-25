
import { Pin } from '../common'
import Vue from 'vue'
import * as Utils from '../utils'
export default {
    bind (el, binding, vnode) {
    },
    inserted (el, binding, vnode) {
        Vue.nextTick(() => {
            let instance = new Pin(el, binding, vnode)
            instance.init()
        })
    },
    unbind (el, binding, vnode) {
        let self = Utils.getSelf(el, binding, vnode)
        self && self.unbind(el, binding, vnode)
    }
}
