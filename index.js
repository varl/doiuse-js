const recast = require('recast')

const code = `
    const foo = [1,2,3].includes(1)
    Promise.all([])
`

function main(opts) {
    const ast = recast.parse(code)
    const types = recast.types

    //console.log('ast', ast)
    types.visit(ast, {

        visitIdentifier: function (path) {
            const node = path.node

            console.log(node)

            this.traverse(path)
        },

        visitVariableDeclaration: function (path) {
            console.log(path.node)

            this.traverse(path)
        }

    })

}

main({})
