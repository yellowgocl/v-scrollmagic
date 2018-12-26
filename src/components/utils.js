import * as Const from './const'
import { camelCase, uniqueId, assign, findIndex, isString, isObject, isBoolean, isArray } from 'lodash'
export const emitEvent = (vnode, name, data) => {
    const handlers = (vnode.data && vnode.data.on) ||
        (vnode.componentOptions && vnode.componentOptions.listeners)
    if (handlers && handlers[name]) {
        handlers[name].fns(data)
    }
}
export const getAttrsValue = (vnode, name, defaultValue, defaultIsKey = false) => {
    let result = !defaultIsKey ? defaultValue : null
    if (vnode && vnode.data.attrs) {
        let attrs = vnode.data.attrs
        if (attrs) {
            result = attrs[name] ||
                attrs[camelCase(name)] ||
                (defaultIsKey ? attrs[defaultValue] ||
                    attrs[camelCase(defaultValue)] : defaultValue)
        }
    }
    return result
}
export const isController = (el, binding, vnode) => {
    return findIndex(vnode.data.directives, ['name', 'scrollmagic-controller']) >= 0
}
export const getControllerName = (el, binding, vnode) => {
    let result = binding.arg
    if (!result) {
        result = getInstanceName(el, binding, vnode, false) || Const.Models.Controller
    }
    return result
}
export const getSceneName = (el, binding, vnode) => {
    let result = binding.arg
    if (!result) {
        result = getInstanceName(el, binding, vnode, false, false, 'scene') || el.dataset[Const.Models.Scene]
    }

    return result
}
export const getInstanceName = (el, binding, vnode, defaultValue, defaultIsKey, key = 'instance-name') => {
    let value = getAttrsValue(vnode, key, defaultValue, defaultIsKey)
    let result = null
    if (value) {
        result = value
    } else if (isController(el, binding, vnode) && el.id) {
        result = el.id
    } else if (defaultValue !== false) {
        result = uniqueId('scrollmagic-directives-instance-')
    }
    return result
}
export const getSelfName = (el, binding, vnode) => {
    let key = getActionModel(el, binding, vnode)
    return el.dataset[key]
}
export const getSelf = (el, binding, vnode) => {
    let name = getSelfName(el, binding, vnode)
    // console.info(el.dataset, name, vnode.context[name])
    return vnode.context[name]
}
const _parseSceneOption = (el, binding, vnode, option = {}) => {
    let result = option
    if (binding.modifiers.start || binding.modifiers.end) {
        result.triggerHook = binding.modifiers.start ? 'onEnter' : 'onLeave'
    }
    return result
}
export const getControllerOption = (el, binding, vnode) => {
    let value = isBoolean(binding.value) ? {} : binding.value
    let result = assign({}, Const.Options.controller, getAttrsValue(vnode, 'scrollmagic-option', {}), value)
    if (binding.modifiers.self) {
        result.container = el
    }
    if (binding.modifiers.horizontal) {
        result.vertical = false
    }
    result.globalSceneOptions = _parseSceneOption(el, binding, vnode, result.globalSceneOptions)
    return result
}
export const getSceneOption = (el, binding, vnode) => {
    let value = isBoolean(binding.value) ? {} : binding.value
    value = isString(value) ? { triggerElement: value } : value
    let result = assign({}, Const.Options.scene, getAttrsValue(vnode, 'scrollmagic-option', {}), value)
    result.triggerElement = binding.modifiers.self ? el : getTriggerElement(el, binding, vnode)
    return _parseSceneOption(el, binding, vnode, result)
}
export const getEnabled = (el, binding, vnode) => {
    let result = getAttrsValue(vnode, 'scrollmagic-enabled', isBoolean(binding.value) ? binding.value : true)
    return result
}
export const getTweenChanges = (el, binding, vnode) => {
    let result = getAttrsValue(vnode, 'scrollmagic-tween-changes', false)
    return result
}
export const getOffset = (el, binding, vnode) => {
    let result = getAttrsValue(vnode, 'scrollmagic-offset', 0)
    return result
}
export const getTriggerElement = (el, binding, vnode) => {
    let result = getAttrsValue(vnode, 'scrollmagic-trigger-element', el)
    return result
}
export const getTriggerHook = (el, binding, vnode) => {
    let result = getAttrsValue(vnode, 'scrollmagic-trigger-hook')
    return result
}

const _getPinValue = (el, binding, vnode) => {
    return [binding.value || el]
}
const _getCssToggle = (el, binding, vnode) => {
    let result = []
    let value = binding.value || {}
    if (isString(value)) {
        // value = { target: value }
        result[0] = value
        result[1] = 'actived'
    } else if (isObject(value)) {
        if (!value.target) {
            value.target = el
        }
        if (!value.class) {
            value.class = 'actived'
        }
        result[0] = value.target
        result[1] = value.class
    }
    if (isArray(result) && result.length === 2) {
        return result
    } else {
        console.error('v-scrollmagic-class-toggle value type must be array and length equal 2.')
        return null
    }
}
const _getTween = (el, binding, vnode) => {
    let value = binding.value
    if (isArray(value)) {
        return value
    } else if (isObject(value)) {
        value = [value]
    }
    return value
}
export const getActionValue = (el, binding, vnode) => {
    let value
    switch (binding.name) {
    case 'scrollmagic-pin':
        value = _getPinValue(el, binding, vnode)
        break
    case 'scrollmagic-class-toggle':
        value = _getCssToggle(el, binding, vnode)
        break
    case 'scrollmagic-tween':
        value = _getTween(el, binding, vnode)
        break
    }
    return value
}
export const getActionModel = (el, binding, vnode) => {
    let value = Const.Models.Action
    switch (binding.name) {
    case 'scrollmagic-controller':
        value = Const.Models.Controller
        break
    case 'scrollmagic-scene':
        value = Const.Models.Scene
        break
    case 'scrollmagic-pin':
        value = Const.Models.Pin
        break
    case 'scrollmagic-class-toggle':
        value = Const.Models.ClassToggle
        break
    case 'scrollmagic-tween':
        value = Const.Models.Tween
        break
    case 'scrollmagic-velocity':
        value = Const.Models.Velocity
        break
    }
    return value
}
