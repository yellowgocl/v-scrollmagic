import Base from './base'
import * as Const from '../const'
import * as Utils from '../utils'
import { isEqual } from 'lodash'
class Action extends Base {
    constructor (el, binding, vnode) {
        super(el, binding, vnode, Utils.getActionModel(el, binding, vnode))
    }
    getValue (old) {
        let v = Utils.getActionValue(this.el, this.binding, this.vnode)
        return v
    }
    update (el, binding, vnode) {
        let oldValue = this.value
        super.update(el, binding, vnode)
        if (isEqual(oldValue, this.value)) {
            return
        }
        let v = this.value
        let c = this.getContext()
        if (c) {
            let _scene = c.value
            let _model = Const.Models
            if (_model.Pin === this.model) {
                this.enabled ? _scene.setPin.apply(_scene, v) : _scene.removePin.apply(_scene, true)
                _scene.update(true)
            } else if (_model.ClassToggle === this.model) {
                this.enabled ? _scene.setClassToggle.apply(_scene, v) : _scene.removeClassToggle.apply(_scene, true)
            } else if (_model.Tween === this.model) {
                // console.info(v, this.value)
                if (_scene.setTween) {
                    this.enabled ? (v && _scene.setTween.apply(_scene, v)) : _scene.removeTween.apply(_scene, true)
                } else {
                    console.error('make sure you set "tween" with true for lib option. "Vue.use(vScrollmagic, { tween: true })"')
                }
            }
        } else {
            console.error('v-scrollmagic-scene directive not found!')
        }
    }
    getContext () {
        let self = this.vnode && this.vnode.context
        return self[Utils.getSceneName(this.el, this.binding, this.vnode)]
    }
}
export default Action
