import * as Const from './const'
import { camelCase, uniqueId, findIndex, isArray, isObject, isBoolean, isString, assign } from 'lodash'
export const emitEvent = (vnode, name, data) => {
    const handlers = (vnode.data && vnode.data.on) ||
        (vnode.componentOptions && vnode.componentOptions.listeners)
    if (handlers && handlers[name]) {
        handlers[name].fns(data)
    }
}
export const getAttrsValue = (vnode, name, defaultValue) => {
    let result = defaultValue
    if (vnode && vnode.data.attrs) {
        let attrs = vnode.data.attrs
        if (attrs) {
            result = attrs[name] || attrs[camelCase(name)] || defaultValue
        }
    }
    return result
}
export const isController = (el, binding, vnode) => {
    return findIndex(vnode.data.directives, ['name', 'scrollmagic-controller']) >= 0
}
export const getInstanceName = (el, binding, vnode, defaultValue, key) => {
    let model = getModelName(el, binding, vnode)
    if (!el.dataset[model]) {
        el.dataset[model] = createInstanceName(el, binding, vnode, defaultValue, key)
    }
    return el.dataset[model]
}
export const cleanInstanceName = (el, binding, vnode) => {
    let model = getModelName(el, binding, vnode)
    let flag = !!el.dataset[model]
    delete el.dataset[model]
    return flag
}
export const createInstanceName = (el, binding, vnode, defaultValue = '__autoCreate__', key = 'vscrollmagic-name') => {
    let value = getAttrsValue(vnode, key)
    let result = null
    if (value) {
        result = value
    } else if (isController(el, binding, vnode) && el.id) {
        result = el.id
    } else {
        result = defaultValue === '__autoCreate__' ? uniqueId('scrollmagic-directives-instance-') : defaultValue
    }
    return result
}
const _parseSceneOption = (el, binding, vnode, option = {}) => {
    let result = option
    if (binding.modifiers.start || binding.modifiers.end) {
        result.triggerHook = binding.modifiers.start ? 'onEnter' : 'onLeave'
    }
    return result
}
export const getOwnControllerName = (el, binding, vnode) => {
    let result = el.dataset[Const.Models.Controller]
    if (!result) {
        result = getAttrsValue(vnode, 'vscrollmagic-controller', binding.arg || '_defaultControllerBuilder_')
    }
    return result
}
export const getOwnSceneName = (el, binding, vnode) => {
    let result = el.dataset[Const.Models.Scene]
    if (!result) {
        result = getAttrsValue(vnode, 'vscrollmagic-scene', binding.arg)
    }

    return result
}
export const getControllerOption = (el, binding, vnode) => {
    let value = isBoolean(binding.value) ? {} : binding.value
    let result = assign({}, Const.Options.controller, getAttrsValue(vnode, 'vscrollmagic-option', {}), value)
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
    let result = assign({}, Const.Options.scene, getAttrsValue(vnode, 'vscrollmagic-option', {}), value)
    result.triggerElement = binding.modifiers.self ? el : getTriggerElement(el, binding, vnode)
    return _parseSceneOption(el, binding, vnode, result)
}
export const getEnabled = (el, binding, vnode) => {
    let result = getAttrsValue(vnode, 'vscrollmagic-enabled', isBoolean(binding.value) ? binding.value : true)
    return result
}
export const getScrollTo = (el, binding, vnode) => {
    let result = getAttrsValue(vnode, 'vscrollmagic-scroll-to')
    if (result) {
        if (!isArray(result)) {
            result = [result]
        }
    }
    console.info(result)
    return result
}
export const getReset = (el, binding, vnode) => {
    let result = getAttrsValue(vnode, 'vscrollmagic-reset', !!binding.modifiers.reset)
    return result
}
export const getTweenChanges = (el, binding, vnode) => {
    let result = getAttrsValue(vnode, 'vscrollmagic-tween-changes', false)
    return result
}
export const getOffset = (el, binding, vnode) => {
    let result = getAttrsValue(vnode, 'vscrollmagic-offset', (binding.value && binding.value.offset) || 0)
    return result
}
export const getTriggerElement = (el, binding, vnode) => {
    let v = isString(binding.value) ? binding.value : binding.value && binding.value.triggerElement
    let result = getAttrsValue(vnode, 'vscrollmagic-trigger-element', v || el)
    return result
}
export const getTriggerHook = (el, binding, vnode) => {
    let result = getAttrsValue(vnode, 'vscrollmagic-trigger-hook')
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
export const getActionOption = (el, binding, vnode) => {
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
export const getModelName = (el, binding, vnode) => {
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
