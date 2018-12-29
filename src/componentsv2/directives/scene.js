import { Builder } from '../common'
// import Context from '../context'
// import { getOwnControllerName, getInstanceName } from '../utils'
export default {
    bind (el, binding, vnode) {
    },
    inserted (el, binding, vnode) {
        Builder.getScene(el, binding, vnode).inserted(el, binding, vnode)
    },
    update (el, binding, vnode) {
        Builder.getScene(el, binding, vnode).update(el, binding, vnode)
    },
    unbind (el, binding, vnode) {
        Builder.getScene(el, binding, vnode).unbind(el, binding, vnode)
    }
}
