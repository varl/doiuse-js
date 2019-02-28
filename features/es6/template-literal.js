const { types } = require('recast')

exports.name = 'es6.template-literal'

exports.type = 'syntax'

exports.def = function (ast) {
    let result = false

    types.visit(ast, {
        visitTaggedTemplateExpression: function (path) {
            const node = path.node

            result = true

            this.traverse(path)
        },
        visitTemplateElement: function (path) {
            const node = path.node

            result = true

            this.traverse(path)
        },
        visitTemplateLiteral: function (path) {
            const node = path.node

            result = true

            this.traverse(path)
        },
    })

    return result
}
