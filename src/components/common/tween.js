import Action from './action'
import * as Utils from '../utils'
class Tween extends Action {
    _tweenChanges = false
    constructor (el, binding, vnode) {
        super(el, binding, vnode, '')
    }
    update (el, binding, vnode) {
        super.update(el, binding, vnode)
        this.tweenChanges = Utils.getTweenChanges(el, binding, vnode)
    }
    set tweenChanges (val) {
        if (this._tweenChanges !== val) {
            this._tweenChanges = val
            let context = this.getContext()
            context && context.value.tweenChanges(val)
        }
    }
    get tweenChanges () {
        return this._tweenChanges
    }
}
export default Tween
