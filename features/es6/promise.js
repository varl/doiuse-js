const { types } = require('recast')

exports.name = 'es6.promise'

exports.def = function (ast) {
    let result = false

    types.visit(ast, {
        visitIdentifier: function (path) {
            const node = path.node

            if (node.name === 'Promise') {
                result = true
            }

            this.traverse(path)
        },
    })

    return result
}

