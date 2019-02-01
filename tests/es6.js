const test = require('tape')
const recast = require('recast')

const symbol = require('../features/es6/symbol.js')
const promise = require('../features/es6/promise.js')

const map = require('../features/es6/map.js')
const weakmap = require('../features/es6/weak-map.js')

const set = require('../features/es6/set.js')
const weakset = require('../features/es6/weak-set.js')

const intl = require('../features/es6/intl.js')
const reflect = require('../features/es6/reflect.js')
const proxy = require('../features/es6/proxy.js')

test('Symbol', t => {
    t.plan(3)

    const ast1 = recast.parse(`const foo = Symbol('foo')`)
    const ast2 = recast.parse(`;;Symbol();`)
    const ast3 = recast.parse(`Symbol`)

    t.ok(symbol.def(ast1))
    t.ok(symbol.def(ast2))
    t.ok(symbol.def(ast3))
})

test('Map/WeakMap', t => {
    t.plan(2)

    const ast1 = recast.parse(`const foo = new Map([])`)
    const ast2 = recast.parse(`new WeakMap()`)

    t.ok(map.def(ast1))
    t.ok(weakmap.def(ast2))
})

test('Set/WeakSet', t => {
    t.plan(2)

    const ast1 = recast.parse(`new Set()`)
    const ast2 = recast.parse(`new WeakSet([1,2,3])`)

    t.ok(set.def(ast1))
    t.ok(weakset.def(ast2))
})

test('Promise', t => {
    t.plan(1)

    const ast = recast.parse(`var promise1 = new Promise(function(resolve, reject) {
          setTimeout(function() {
                  resolve('foo');
                }, 300);
    });`)

    t.ok(promise.def(ast))
})

test('Intl', t => {
    t.plan(4)

    const ast1 = recast.parse(`var l10nSV = new Intl.Collator("sv")`)
    const ast2 = recast.parse(`var l10nEN = new Intl.NumberFormat("en-US")`)
    const ast3 = recast.parse(`var l10nEUR = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" })`)
    const ast4 = recast.parse(`var l10nDE = new Intl.DateTimeFormat("de-DE")`)

    t.ok(intl.def(ast1))
    t.ok(intl.def(ast2))
    t.ok(intl.def(ast3))
    t.ok(intl.def(ast4))
})

test('Reflect', t => {
    t.plan(1)

    const ast = recast.parse(`Reflect.ownKeys({ a: 1 })`)

    t.ok(reflect.def(ast))
})

test('Proxy', t => {
    t.plan(1)

    const ast = recast.parse(`let proxy = new Proxy(target, { get (receiver, name) { return name in receiver ? receiver[name] : name } })`)

    t.ok(proxy.def(ast))
})
