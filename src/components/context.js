import ScrollMagic from 'ScrollMagic'
import Vue from 'vue'
import { isObject, map, values, head } from 'lodash'
export default class Context {
    static CONTROLLER_NAME = 'vScrollMagicController'
    static __instance
    _controller = {}
    _scenes = {}
    _vm

    static getInstance () {
        if (!Context.__instance) {
            Context.__instance = new Context()
        }
        return Context.__instance
    }

    constructor () {
        this._controller = {}
        this._scenes = {}
        this.initContext()
    }
    initContext () {
        this._vm = new Vue({
            created () {
                const vm = this
                vm.$on('addScene', (name, value, controllerName) => {
                    Context.getInstanec().addScene(name, value, controllerName)
                })
                vm.$on('removeScene', (name, controllerName) => {
                    Context.getInstanec().removeScene(name, controllerName)
                })
            }
        })
    }
    emit (event, ...args) {
        this._vm.$emit(event, ...args)
    }
    addController (name, value, { force } = { force: false }) {
        name = name || Context.CONTROLLER_NAME
        let controller = (value instanceof ScrollMagic) ? value : new ScrollMagic.Controller(value || {})
        if (!force) {
            if (!this._controller[name]) {
                this._controller[name] = controller
            }
        } else {
            if (this._controller[name]) {
                this._controller[name].destroy(true)
            }
            let scenes = this.getScenes(name)
            map(scenes, (v, k) => {
                controller.addScene(v, true)
            })
            this._controller[name] = controller
        }
        return controller
    }
    removeController (name) {
        let result = false
        if (name) {
            let controller = this._controller[name]
            controller && controller.destroy(true)
            delete this._controller[name]
            result = true
        }
        return result
    }

    getController (name) {
        name = Context.CONTROLLER_NAME
        return this._controller[name]
    }
    getScenes (controllerName) {
        return this._scenes[controllerName || Context.CONTROLLER_NAME]
    }
    removeScenes (controllerName) {
        controllerName = controllerName || Context.CONTROLLER_NAME
        let scenes = this.getScenes(controllerName)
        if (scenes) {
            this.removeScene(controllerName)
        }
        delete this._scenes[controllerName]
    }
    addScene (name, value, controllerName, option = {}) {
        // let { force } = option
        option = isObject(controllerName) && arguments.length === 3 ? controllerName : option
        controllerName = controllerName || Context.CONTROLLER_NAME
        let scene = (value instanceof ScrollMagic) ? value : new ScrollMagic.Scene(value || {})
        let scenes = this.getScenes(controllerName) || {}
        scenes[name] = scene
        if (!this.getController(controllerName)) this.addController(controllerName)
        scene.addTo(this.getController(controllerName))
        return scene
    }
    getScene (name, controllerName) {
        controllerName = arguments.length === 1 ? name : controllerName
        name = arguments.length === 1 ? undefined : name
        let scenes = this.getScenes(controllerName)
        return name ? scenes[name] : head(values(scenes))
    }
    removeScene (name, controllerName) {
        controllerName = arguments.length === 1 ? name : controllerName
        name = arguments.length === 1 ? undefined : name
        let result = false
        if (controllerName) {
            let scenes = this.getScenes(controllerName)
            if (scenes) {
                if (name) {
                    scenes[name] && scenes[name].destroy(true)
                    delete scenes[name]
                } else {
                    map(scenes, (v, k) => {
                        v && v.destroy(true)
                        delete scenes[k]
                    })
                }
                result = true
                if (values(scenes).length === 0) {
                    delete this._scenes[controllerName]
                }
            }
        }
        return result
    }
}
