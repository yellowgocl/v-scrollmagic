import Base from './base'
import * as Const from '../const'
import * as Utils from '../utils'
import { map, kebabCase } from 'lodash'
class Scene extends Base {
    _offset
    _triggerElement
    _triggerHook
    constructor (el, binding, vnode) {
        super(el, binding, vnode, Const.Models.Scene)
    }
    getValue (old) {
        console.info(Utils.getSceneOption(this.el, this.binding, this.vnode))
        return this.value || new Const.ScrollMagic.Scene(Utils.getSceneOption(this.el, this.binding, this.vnode))
    }
    canUpdate (el, binding, vnode) {
        super.canUpdate(el, binding, vnode)

        return true
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
    update (el, binding, vnode) {
        el = this.el || el
        binding = this.binding || binding
        vnode = this.vnode || vnode
        super.update(el, binding, vnode)
        if (!this.getContext()) {
            console.error('be sure to set v-scrollmagic-controller directive in any element')
        } else {
            if (binding.modifiers.indicators && this.debug) {
                this.value.addIndicators()
            }
            this.offset = Utils.getOffset(el, binding, vnode)
            this.triggerElement = Utils.getTriggerElement(el, binding, vnode)
            this.triggerHook = Utils.getTriggerHook(el, binding, vnode)
            this.value.addTo(this.getContext().value)
            this.updateEvents(vnode)
        }
    }
    getContext () {
        let self = this.vnode && this.vnode.context
        return self[Utils.getControllerName(this.el, this.binding, this.vnode)]
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
export default Scene
