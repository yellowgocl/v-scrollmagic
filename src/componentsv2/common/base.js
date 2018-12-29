import { isString, isObject, isArray, uniqueId, map, isEqual } from 'lodash'
import * as Utils from '../utils'
import * as Const from '../const'
import Vue from 'vue'
export default class Base {
    _value
    _name
    _parent
    _sourceValue
    _oldValue
    _children = new Map()
    constructor (name, value) {
        // this.reset()
        this.name = name
        this.value = value
    }
    get debug () {
        return Vue.SCROLLMAGIC_DEBUG
    }
    set parent (value) {
        this._parent = value
    }
    get parent () {
        return this._parent
    }
    set value (value) {
        let temp = value
        this._value = this.parseValue(value, this._sourceValue)
        this._oldValue = this._sourceValue
        this._sourceValue = temp
    }
    get value () {
        return this._value
    }
    get oldValue () {
        return this._oldValue
    }
    get sourceValue () {
        return this._sourceValue
    }
    set name (value) {
        this._name = value
    }
    get name () {
        return this._name
    }
    parseValue (value) {
        return value
    }
    reset () {
        this._value = undefined
        this.name = undefined
        this._parent = undefined
        this._sourceValue = undefined
        this._oldValue = undefined
        this._children.clear()
    }
    has (key) {
        return this._children.has(key)
    }
    get (key) {
        return this._children.get(key)
    }
    beforeAdd (child, name, replace) {
        return true
    }
    afterAdd (child, name, replace) {
        child.name = name
        this._children.set(name, child)
        child.parent = this
        return true
    }
    _addChild (child, option, replace = true) {
        let result = false
        if (child) {
            let name
            if (option) {
                if (isObject(option)) {
                    name = option.name
                    replace = option.replace
                }
                if (!name) {
                    name = isString(option) ? option || child.name : uniqueId('_vScrollmagicObject_')
                }
            } else {
                name = child.name || uniqueId('_vScrollmagicObject_')
            }
            result = this.beforeAdd(child, name, replace)
            if (result) {
                result = this.afterAdd(child, name, replace)
            }
        }
        return result
    }
    add (child, option, replace = true) {
        let result = false
        if (isArray(child)) {
            map(child, (v, k) => v && this._addChild(v, v.name, v.replace || replace))
        } else {
            this._addChild(child, option, replace)
        }
        return result
    }
    destroyChild (child) {
        return !!child
    }
    delete (key) {
        let child = this.get(key)
        if (child) {
            this.destroyChild(child) && this._children.delete(key)
        }
        return child
    }
    inserted (el, binding, vnode) {
        this.update(el, binding, vnode)
    }

    update (el, binding, vnode) {
        if (isEqual(this.oldValue, this.sourceValue)) {
            return
        }
        let mode = Utils.getModelName(el, binding, vnode)
        let reset = Utils.getReset(el, binding, vnode)
        let parentValue = this.parent && this.parent.value
        let enabled = Utils.getEnabled(el, binding, vnode)
        switch (mode) {
        case Const.Models.Controller:
            this.value.update(reset)
            break
        case Const.Models.Scene:
            this.value.update(reset)
            break
        case Const.Models.Pin:
            enabled ? parentValue.setPin.apply(parentValue, this.value) : parentValue.removePin.apply(parentValue, reset)
            break
        case Const.Models.ClassToggle:
            enabled ? parentValue.setClassToggle.apply(parentValue, this.value) : parentValue.removeClassToggle.apply(parentValue, reset)
            break
        case Const.Models.Tween:
            let tweenChanges = Utils.getTweenChanges(el, binding, vnode)
            if (parentValue.setTween) {
                if (enabled) {
                    parentValue.setTween.apply(parentValue, this.value)
                    !isEqual(tweenChanges, parentValue.tweenChanges.apply(parentValue)) && parentValue.tweenChanges.apply(parentValue, tweenChanges)
                } else {
                    parentValue.removeTween.apply(parentValue, reset)
                }
            } else {
                console.error('make sure you set "tween" with true for lib option. "Vue.use(vScrollmagic, { tween: true })"')
            }
            break
        }
    }
    unbind (el, binding, vnode) {
        // this._children.forEach((v, k) => this.delete(k))
        this.reset()
        let model = Utils.getModelName(el, binding, vnode)
        delete el.dataset[model]
    }
}
