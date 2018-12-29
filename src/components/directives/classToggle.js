import { Builder } from '../common'
export default {
    bind (el, binding, vnode) {
        // Builder.getAction(el, binding, vnode)
    },
    inserted (el, binding, vnode) {
        Builder.getAction(el, binding, vnode).inserted(el, binding, vnode)
    },
    update (el, binding, vnode) {
        Builder.getAction(el, binding, vnode).update(el, binding, vnode)
    },
    unbind (el, binding, vnode) {
        let act = Builder.getAction(el, binding, vnode)
        act && act.unbind(el, binding, vnode)
    }
}
