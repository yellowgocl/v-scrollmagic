
import { Scene } from '../common'
import * as Utils from '../utils'
export default {
    bind (el, binding, vnode) {
    },
    inserted (el, binding, vnode) {
        let instance = new Scene(el, binding, vnode)
        instance.init()
        // console.info(instance.getContext())
    },
    update (el, binding, vnode) {
        let self = Utils.getSelf(el, binding, vnode)
        self.update(el, binding, vnode)
    },
    unbind (el, binding, vnode) {
        let self = Utils.getSelf(el, binding, vnode)
        self && self.unbind(el, binding, vnode)
    }
}
