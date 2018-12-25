import Base from './base'
import * as Const from '../const'
import * as Utils from '../utils'
class Controller extends Base {
    constructor (el, binding, vnode) {
        super(el, binding, vnode, Const.Models.Controller)
    }
    _getInstanceName (el, binding, vnode) {
        return Utils.getControllerName(el, binding, vnode)
    }
    update (el, binding, vnode) {
        let result = super.update(el, binding, vnode)
        console.info(result)
        this.value && this.value.update()
        return result
    }
    getValue (old) {
        return this.value || new Const.ScrollMagic.Controller(Utils.getControllerOption(this.el, this.binding, this.vnode))
    }
}
export default Controller
