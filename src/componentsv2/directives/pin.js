import { Builder } from '../common'
// import Context from '../context'
// import { getOwnControllerName, getInstanceName } from '../utils'
export default {
    bind (el, binding, vnode) {
        // Builder.getAction(el, binding, vnode)
    },
    inserted (el, binding, vnode) {
        Builder.getAction(el, binding, vnode).inserted(el, binding, vnode)
        // console.info(Builder.getAction(el, binding, vnode))
        // console.info(Builder.getScene(el, binding, vnode).parent)
        // new Scene(el, binding, vnode).update(el, binding, vnode)
    },
    update (el, binding, vnode) {
        Builder.getAction(el, binding, vnode).update(el, binding, vnode)
        /* Context.getInstance().getScene(
            getInstanceName(el, binding, vnode),
            getOwnControllerName(el, binding, vnode))
            .update(el, binding, vnode) */
    },
    unbind (el, binding, vnode) {
        let act = Builder.getAction(el, binding, vnode)
        act && act.unbind(el, binding, vnode)
        // Builder.getAction(el, binding, vnode).unbind(el, binding, vnode)
        /*  Context.getInstance().getScene(
            getInstanceName(el, binding, vnode),
            getOwnControllerName(el, binding, vnode))
            .unbind(el, binding, vnode) */
    }
}
