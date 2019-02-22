const { types } = require('recast')

exports.name = 'es6.rest'
exports.type = 'operator'

exports.def = function (ast) {
    let result = false

    types.visit(ast, {
        visitRestElement: function (path) {
            const node = path.node

            console.log(node.name, node.type)

            result = true

            this.traverse(path)
        },
    })

    return result
}
