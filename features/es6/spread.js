const { types } = require('recast')

exports.name = 'es6.spread'
exports.type = 'operator'

exports.def = function (ast) {
    let result = false

    types.visit(ast, {
        visitSpreadElement: function (path) {
            const node = path.node

            result = true

            this.traverse(path)
        },
    })

    return result
}
