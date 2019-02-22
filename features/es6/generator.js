const { types } = require('recast')

exports.name = 'es6.generator'
exports.type = 'api'

exports.def = function (ast) {
    let result = false

    types.visit(ast, {
        visitFunction: function (path) {
            const node = path.node

            if (node.generator) {
                result = true
            }

            this.traverse(path)
        },
        visitFunctionExpression: function (path) {
            const node = path.node

            if (node.generator) {
                result = true
            }

            this.traverse(path)
        },
        visitFunctionDeclaration: function (path) {
            const node = path.node

            if (node.generator) {
                result = true
            }

            this.traverse(path)
        },
		visitGeneratorExpression: function (path) {
            const node = path.node
           	result = true
            this.traverse(path)
		},
		visitYieldExpression: function (path) {
            const node = path.node
           	result = true
            this.traverse(path)
		},
    })

    return result
}
