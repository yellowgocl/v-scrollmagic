import * as Utils from '../utils'
import { isEqual } from 'lodash'
import Vue from 'vue'

class Base {
    _el
    _binding
    _vnode
    _model
    _value
    _destroyed
    _enabled = true
    get debug () {
        return Vue.SCROLLMAGIC_DEBUG
    }
    constructor (el, binding, vnode, model) {
        this._model = model || 'vScrollmagicDirective'
        this._destroyed = false
        this.updateDirectiveValue(el, binding, vnode)
        this.updateInstanceName()
    }
    unbind (el, binding, vnode) {
        this._destroyed = true
        delete vnode.context[Utils.getSelfName(el, binding, vnode)]
        delete el.dataset[this.model]
        this.updateDirectiveValue()
    }
    canUpdate (el, binding, vnode) {
        const oldValue = this.value
        const tempValue = this.getValue(el, binding, vnode, oldValue)
        let result = isEqual(oldValue, tempValue)
        if (!result) {
            this._value = tempValue
        }
        return result
    }
    update (el, binding, vnode) {
        this.updateDirectiveValue(el, binding, vnode)
        this.enabled = Utils.getEnabled(el, binding, vnode)
        return this.canUpdate(el, binding, vnode)
    }
    updateDirectiveValue (el, binding, vnode) {
        this._el = el
        this._binding = binding
        this._vnode = vnode
    }
    init () {
        this.update(this.el, this.binding, this.vnode)
    }
    getValue (oldValue) {
        return null
    }
    _getInstanceName (el, binding, vnode) {
        return Utils.getInstanceName(el, binding, vnode)
    }
    updateInstanceName (newName) {
        if (newName && this.el) {
            this.el.dataset[this.model] = newName
        }
        let result = Utils.getSelfName(this.el, this.binding, this.vnode)
        if (!result) {
            result = this._getInstanceName(this.el, this.binding, this.vnode)
            if (this.el) {
                this.el.dataset[this.model] = result
                this.vnode.context[result] = this
            }
        }
        return result
    }
    get instanceName () {
        return this.updateInstanceName()
    }
    get model () {
        return this._model
    }
    get el () {
        return this._el
    }
    get binding () {
        return this._binding
    }
    get vnode () {
        return this._vnode
    }
    get value () {
        return this._value
    }
    get isDestory () {
        return this._destroyed
    }
    set enabled (val) {
        this._enabled = val
    }
    get enabled () {
        return this._enabled
    }
    getContext () {
        return null
    }
}

export default Base
