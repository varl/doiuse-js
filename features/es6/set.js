const { types } = require('recast')

exports.name = 'es6.set'
exports.type = 'api'

exports.def = function (ast) {
    let result = false

    types.visit(ast, {
        visitIdentifier: function (path) {
            const node = path.node

            if (node.name === 'Set') {
                result = true
            }

            this.traverse(path)
        },
    })

    return result
}
