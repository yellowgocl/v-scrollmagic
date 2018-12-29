import Container from './container'
export default class Scene extends Container {
    constructor (el, binding, vnode) {
        super(el, binding, vnode)
        console.log('Scene')
    }
}
