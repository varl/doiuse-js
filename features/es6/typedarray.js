const { types } = require('recast')

exports.name = 'es6.typedarray'

exports.def = function (ast) {
    let result = false

    types.visit(ast, {
        visitIdentifier: function (path) {
            const node = path.node

            switch (node.name) {
                case 'Int8Array': 
                case 'Uint8Array': 
                case 'Uint8ClampedArray': 
                case 'Int16Array': 
                case 'Uint16Array': 
                case 'Int32Array': 
                case 'Uint32Array': 
                case 'Float32Array': 
                case 'Float64Array': 
                    result = true
                    break
                default:
                    break
            }

            this.traverse(path)
        },
    })

    return result
}
