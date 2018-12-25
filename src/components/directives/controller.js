
import { Controller } from '../common'
import * as Utils from '../utils'
export default {
    bind (el, binding, vnode) {
        // console.info(el)
        new Controller(el, binding, vnode).init()
    },
    update (el, binding, vnode) {
        let self = Utils.getSelf(el, binding, vnode)
        self && self.update(el, binding, vnode)
    },
    unbind (el, binding, vnode) {
        let self = Utils.getSelf(el, binding, vnode)
        self && self.unbind(el, binding, vnode)
    }
}
