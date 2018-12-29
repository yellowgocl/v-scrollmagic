import Base from './base'
import ScrollMagic from 'ScrollMagic'
import * as Utils from '../utils'
import { isEqual } from 'lodash'
export default class Controller extends Base {
    _scrollTo
    parseValue (value, source) {
        let result = (value instanceof ScrollMagic.Controller) ? value : new ScrollMagic.Controller(value)
        return result
    }
    destroyChild (child) {
        let result = super.destroyChild(child)
        // result && child.value.destroy(true)
        return result
    }
    update (el, binding, vnode) {
        this.scrollTo = Utils.getScrollTo(el, binding, vnode)

        super.update(el, binding, vnode)
    }
    unbind (el, binding, vnode) {
        super.unbind(el, binding, vnode)
        this.value && this.value.destroy(true)
    }
    set scrollTo (val) {
        if (isEqual(this._offset, val)) {
            this._offset = val
            this.value && this.value.scrollTo.apply(this, val)
        }
    }
    get scrollTo () {
        return this._scrollTo
    }
}
