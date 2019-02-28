const { types } = require('recast')

exports.name = 'es6.arrow-expression'
exports.type = 'syntax'

exports.def = function (ast) {
    let result = false

    types.visit(ast, {
        visitArrowFunctionExpression: function (path) {
            const node = path.node

            result = true

            this.traverse(path)
        },
    })

    return result
}
