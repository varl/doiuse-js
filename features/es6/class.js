const { types } = require('recast')

exports.name = 'es6.class'

exports.def = function (ast) {
    let result = false

    types.visit(ast, {
        visitClassBody: function (path) {
            const node = path.node
			result = true
            this.traverse(path)
        },
		visitClassBodyElement: function (path) {
            const node = path.node
			result = true
            this.traverse(path)
		},
		visitClassProperty: function (path) {
            const node = path.node
			result = true
            this.traverse(path)
		},
		visitClassPropertyDefinition: function (path) {
            const node = path.node
			result = true
            this.traverse(path)
		},
		visitClassExpression: function (path) {
            const node = path.node
			result = true
            this.traverse(path)
		},
    })

    return result
}
