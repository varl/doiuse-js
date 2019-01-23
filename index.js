const recast = require('recast')

const code = `
    const foo = [1,2,3].includes(1)
`

function main() {
    const ast = recast.parse(code)
    const types = recast.types

    types.visit(ast, {
        visitVariableDeclaration: function (path) {
            console.log(path.node)
            this.traverse(path)
        }
    })

}


main()
