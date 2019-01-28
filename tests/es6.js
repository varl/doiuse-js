const test = require('tape')
const recast = require('recast')

const symbol = require('../features/es6/symbol.js')

const map = require('../features/es6/map.js')
const weakmap = require('../features/es6/weak-map.js')

const set = require('../features/es6/set.js')
const weakset = require('../features/es6/weak-set.js')

test('code uses Symbol', t => {
    t.plan(3)

    const ast1 = recast.parse(`const foo = Symbol('foo')`)
    const ast2 = recast.parse(`;;Symbol();`)
    const ast3 = recast.parse(`Symbol`)

    t.ok(symbol.def(ast1))
    t.ok(symbol.def(ast2))
    t.ok(symbol.def(ast3))
})

test('code uses Map', t => {
    t.plan(2)

    const ast1 = recast.parse(`const foo = new Map([])`)
    const ast2 = recast.parse(`new WeakMap()`)

    t.ok(map.def(ast1))
    t.ok(weakmap.def(ast2))
})

test('code uses Set/WeakSet', t => {
    t.plan(2)

    const ast1 = recast.parse(`new Set()`)
    const ast2 = recast.parse(`new WeakSet([1,2,3])`)

    t.ok(set.def(ast1))
    t.ok(weakset.def(ast2))
})
