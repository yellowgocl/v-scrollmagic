import Base from './base'
import ScrollMagic from 'ScrollMagic'
import * as Utils from '../utils'
import * as Const from '../const'
import { map, kebabCase } from 'lodash'
export default class Scene extends Base {
    _offset
    _triggerElement
    _triggerHook
    parseValue (value) {
        let result = (value instanceof ScrollMagic.Scene) ? value : new ScrollMagic.Scene(value)
        return result
    }
    updateEvents (vnode) {
        if (this.value) {
            map(Const.SceneEvents, (eventName, key) => {
                eventName = kebabCase(eventName)
                this.value.on(eventName, function () {
                    Utils.emitEvent(vnode, eventName, ...arguments)
                })
            })
        }
    }
    inserted (el, binding, vnode) {
        if (binding.modifiers.indicators && this.debug) {
            this.value.addIndicators()
        } else {
            this.value.removeIndicators()
        }
        this.value.addTo(this.parent.value)
        this.updateEvents(vnode)
    }
    unbind (el, binding, vnode) {
        this.debug && this.value && this.value.removeIndicators()
        this.value && this.value.destroy(true)
        super.unbind(el, binding, vnode)
    }
    update (el, binding, vnode) {
        this.offset = Utils.getOffset(el, binding, vnode)
        this.triggerElement = Utils.getTriggerElement(el, binding, vnode)
        this.triggerHook = Utils.getTriggerHook(el, binding, vnode)
        super.update(el, binding, vnode)
    }
    set offset (val) {
        if (this._offset !== val) {
            this._offset = val
            this.value && this.value.offset(val)
        }
    }
    get offset () {
        return this._offset
    }
    set triggerElement (val) {
        if (this._triggerElement !== val) {
            this._triggerElement = val
            this.value && this.value.triggerElement(val)
        }
    }
    get triggerElement () {
        return this._triggerElement
    }
    set triggerHook (val) {
        if (this._triggerHook !== val) {
            this._triggerHook = val
            this.value && this.value.triggerHook(val)
        }
    }
    get triggerHook () {
        return this._triggerHook
    }
}
