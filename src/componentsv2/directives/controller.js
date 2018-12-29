import { Builder } from '../common'
export default {
    bind (el, binding, vnode) {
        Builder.removeController(el, binding, vnode)
        Builder.getController(el, binding, vnode)
    },
    inserted (el, binding, vnode) {
        Builder.getController(el, binding, vnode).inserted(el, binding, vnode)
    },
    update (el, binding, vnode) {
        Builder.getController(el, binding, vnode).update(el, binding, vnode)
    },
    unbind (el, binding, vnode) {}
}
