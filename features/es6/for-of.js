const { types } = require('recast')

exports.name = 'es6.modules'
exports.type = 'operator'

exports.def = function (ast) {
    let result = false

    types.visit(ast, {
        visitForOfStatement: function (path) {
            const node = path.node

            result = true
            
            this.traverse(path)
        }
    })

    return result
}
