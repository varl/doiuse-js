const test = require('tape')
const recast = require('recast')

const es6 = require('../lib/es6.js')

test('uses `const` declarations', t => {
    const ast = recast.parse(`
        var foobar;const foo='bar';
    `)


    
})

test('uses `let` declarations', t => {

})
