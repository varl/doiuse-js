const { types } = require('recast')

exports.name = 'es6.spread'
exports.type = 'operator'

exports.def = function (ast) {
    let result = false

    types.visit(ast, {
        visitSpreadElementExpression: function (path) {
            const node = path.node

            console.log(node.name, node.type) 
            result = true

            this.traverse(path)
        },
        visitSpreadElement: function (path) {
            const node = path.node

            console.log(node.name, node.type)
            result = true

            this.traverse(path)
        },
    })

    return result
}
