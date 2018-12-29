import Container from './container'
export default class Controller extends Container {
    constructor (el, binding, vnode) {
        super(el, binding, vnode)
        console.log('Controller')
    }
}
