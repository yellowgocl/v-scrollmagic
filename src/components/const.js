import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min'
const SceneEvents = {
    add: 'add',
    change: 'change',
    destroy: 'destroy',
    end: 'end',
    leave: 'leave',
    progress: 'progress',
    remove: 'remove',
    shift: 'shift',
    start: 'start',
    update: 'update'
}

const SceneActions = {
    pin: 'Pin',
    tween: 'Tween',
    classToggle: 'ClassToggle',
    velocity: 'Velocity'
}

const Models = {
    Controller: 'vScrollmagicController',
    Scene: 'vScrollmagicScene',
    Action: 'vScrollmagicAction',
    Pin: `vScrollmagicAction${SceneActions.pin}`,
    Tween: `vScrollmagicAction${SceneActions.tween}`,
    Velocity: `vScrollmagicAction${SceneActions.velocity}`,
    ClassToggle: `vScrollmagicAction${SceneActions.classToggle}`
}

const LogLevel = {
    silent: 0, // silents
    errors: 1, // errors
    warnings: 2, // errors, warnings
    debug: 3 // errors, warnings, debuginfos
}

const Options = {
    controller: {
        container: window,
        vertical: true,
        globalSceneOptions: {},
        loglevel: LogLevel.warnings,
        refreshInterval: 100
    },
    scene: {
        duration: 0,
        offset: 0,
        triggerElement: null,
        triggerHook: 'onCenter',
        reverse: true,
        loglevel: LogLevel.warnings
    }
}

export { Models, Options, SceneEvents, ScrollMagic, SceneActions, LogLevel }
