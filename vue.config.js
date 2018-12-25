var path = require('path')
module.exports = {
    configureWebpack: {
        performance: {
            maxEntrypointSize: 512000,
            maxAssetSize: 512000,
            hints: process.env.NODE_ENV === 'production' ? 'warning' : false
        },
        resolve: {
            alias: {
                'TweenLite': path.resolve('node_modules', 'gsap/src/minified/TweenLite.min.js'),
                'TweenMax': path.resolve('node_modules', 'gsap/src/minified/TweenMax.min.js'),
                'TimelineLite': path.resolve('node_modules', 'gsap/src/minified/TimelineLite.min.js'),
                'TimelineMax': path.resolve('node_modules', 'gsap/src/minified/TimelineMax.min.js'),
                'ScrollMagic': path.resolve('node_modules', 'scrollmagic/scrollmagic/minified/ScrollMagic.min.js'),
                'animation.gsap': path.resolve('node_modules', 'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js'),
                'debug.addIndicators': path.resolve('node_modules', 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js')
            }
        }
    },
    chainWebpack: config => {
        // console.info(process.env.NODE_ENV)
        config.optimization.minimize(process.env.NODE_ENV === 'production')
    }
}
