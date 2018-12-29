import Base from './base'
import * as Utils from '../utils'
import * as Const from '../const'
import Context from '../context'
export default class Container extends Base {
    _context
    updateImpl (el, binding, vnode) {
        let model = Utils.getModelName(el, binding, vnode)
        console.info(model)
        let option
        switch (model) {
        case Const.Models.Controller:
            option = Utils.getControllerOption(el, binding, vnode)
            this._context = Context.getInstance().addController(this.name, option)
            break
        case Const.Models.Scene:
            option = Utils.getSceneOption(el, binding, vnode)
            let ownControllerName = Utils.getOwnControllerName(el, binding, vnode)
            this._context = Context.getInstance().addScene(this.name, option, ownControllerName)
            break
        default:
            break
        }
    }
}
