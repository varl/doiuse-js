const { types, namedTypes } = require('recast')

exports.name = 'es6.weak-set'

exports.def = function (ast) {
    let result = false

    types.visit(ast, {
        visitIdentifier: function (path) {
            const node = path.node

            if (node.name === 'WeakSet') {
                result = true
            }

            this.traverse(path)
        },
    })

    return result
}
