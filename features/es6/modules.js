const { types } = require('recast')

exports.name = 'es6.modules'

exports.def = function (ast) {
    let result = false

    types.visit(ast, {
        visitModuleSpecifier: function (path) {
            const node = path.node
			result = true
            this.traverse(path)
        },
        visitImportSpecifier: function (path) {
            const node = path.node
			result = true
            this.traverse(path)
        },
        visitImportNamespaceSpecifier: function (path) {
            const node = path.node
			result = true
            this.traverse(path)
        },
        visitImportDefaultSpecifier: function (path) {
            const node = path.node
			result = true
            this.traverse(path)
        },
        visitImportDeclaration: function (path) {
            const node = path.node
			result = true
            this.traverse(path)
        },
    })

    return result
}
