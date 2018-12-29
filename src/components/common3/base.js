import * as Utils from '../utils'
import Vue from 'vue'
export default class Base {
    _el
    _binding
    _vnode
    _destroyed
    get el () {
        return this._el
    }
    get binding () {
        return this._binding
    }
    get vnode () {
        return this._vnode
    }
    get name () {
        console.info(this)
        return Utils.getInstanceName(this.el, this.binding, this.vnode)
    }
    constructor (el, binding, vnode) {
        this._destroyed = false
        this.init(el, binding, vnode)
    }
    init (el, binding, vnode) {
        this.updateDirectiveValue(el, binding, vnode)
    }
    updateDirectiveValue (el, binding, vnode) {
        this._el = el
        this._binding = binding
        this._vnode = vnode
    }
    updateImpl (el, binding, vnode) {
        // console.error('must be override updateImpl')
    }
    update (el, binding, vnode, immediately = false) {
        this.updateDirectiveValue(el, binding, vnode)
        immediately ? this.updateImpl(el, binding, vnode) : Vue.nextTick(() => this.updateImpl(el, binding, vnode))
    }
    unbind (el, binding, vnode) {
        this._destroyed = true
        // delete vnode.context[Utils.getSelfName(el, binding, vnode)]
        Utils.cleanInstanceName(el, binding, vnode)
        this.updateDirectiveValue()
    }
}
