import Controller from './controller'
import Scene from './scene'
import Base from './base'
import * as Utils from '../utils'
import { isElement, isString } from 'lodash'
export default class Builder {
    static controllers = new Map()
    static removeController (el, binding, vnode) {
        let name = Utils.getOwnControllerName(el, binding, vnode)
        if (Builder.controllers.has(name)) {
            let controller = Builder.getController(el, binding, vnode)
            controller.unbind(el, binding, vnode)
            Builder.controllers.delete(name)
        }
    }
    static getControllerByName (name, option) {
        name = name || '_defaultControllerBuilder_'
        let result = Builder.controllers.get(name)
        if (!result) {
            result = new Controller(name, option)
            Builder.controllers.set(name, result)
        }
        return result
    }
    static getControllerByDirective (el, binding, vnode) {
        let name = Utils.getInstanceName(el, binding, vnode, binding.arg || '_defaultControllerBuilder_')
        let option = Utils.getControllerOption(el, binding, vnode)
        // console.info(option)
        return Builder.getControllerByName(name, option)
    }
    static getController () {
        let result
        if (isElement(arguments[0]) && arguments.length === 3) {
            result = Builder.getControllerByDirective(...arguments)
        } else if (isString(arguments[0])) {
            result = Builder.getControllerByName(...arguments)
        } else {
            console.error('arguments type error')
        }
        return result
    }

    static getSceneByName (name, controllerName, option) {
        let controller
        if (controllerName) {
            controller = Builder.getController(controllerName)
        } else {
            Builder.controllers.forEach((v, k, m) => {
                if (v.has(name)) {
                    controller = v
                }
            })
        }
        // console.info('get scene by name: ', controllerName, controller)
        let result
        if (controller) {
            if (controller.has(name)) {
                result = controller.get(name)
            } else {
                if (option !== false) {
                    result = new Scene(name, option)
                    controller.add(result)
                }
            }
        }
        return result
    }
    static getSceneByDirective (el, binding, vnode, autoNew = true) {
        let name = Utils.getInstanceName(el, binding, vnode)
        let controllName = Utils.getOwnControllerName(el, binding, vnode)
        let option = Utils.getSceneOption(el, binding, vnode)
        if (!autoNew && !name) {
            option = false
        }
        return Builder.getSceneByName(name, controllName, option)
    }
    static getScene () {
        let result
        if (isElement(arguments[0]) && arguments.length >= 3) {
            result = Builder.getSceneByDirective(...arguments)
        } else if (isString(arguments[0])) {
            result = Builder.getSceneByName(...arguments)
        } else {
            console.error('arguments type error')
        }
        return result
    }

    static getAction (el, binding, vnode) {
        let model = Utils.getModelName(el, binding, vnode)
        let scene = Builder.getSceneByName(Utils.getOwnSceneName(el, binding, vnode))
        let option = Utils.getActionOption(el, binding, vnode)
        let name = Utils.getInstanceName(el, binding, vnode)
        let result
        if (scene) {
            result = scene.get(model)
            if (!result) {
                result = new Base(name, option)
                scene.add(result, model)
            } else {
                result.value = option
            }
        }
        return result
    }
}
