const test   = require('tape')
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
const arraybuffer = require('../features/es6/arraybuffer.js')
const typedarray = require('../features/es6/typedarray.js')
const generator = require('../features/es6/generator.js')
const classy = require('../features/es6/class.js')
const modules = require('../features/es6/modules.js')
const rest = require('../features/es6/rest.js')
const spread = require('../features/es6/spread.js')
const forof = require('../features/es6/for-of.js')
const templateliteral = require('../features/es6/template-literal.js')
const arrow = require('../features/es6/arrow.js')

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

test('ArrayBuffer', t => {
    t.plan(1)

    const ast = recast.parse(`const ab = new ArrayBuffer(16)`)

    t.ok(arraybuffer.def(ast))
})

test('TypedArray', t => {
    t.plan(9)

    const ast1 = recast.parse(`() => {new Int8Array (this._buffer,  0,  1)}`)
    const ast2 = recast.parse(`() => {new Uint8Array (this._buffer,  0,  1)}`)
    const ast3 = recast.parse(`() => {new Uint8ClampedArray (this._buffer,  0,  1)}`)
    const ast4 = recast.parse(`() => {new Int16Array (this._buffer,  0,  1)}`)
    const ast5 = recast.parse(`() => {new Uint16Array (this._buffer,  0,  1)}`)
    const ast6 = recast.parse(`() => {new Int32Array (this._buffer,  0,  1)}`)
    const ast7 = recast.parse(`() => {new Uint32Array (this._buffer,  0,  1)}`)
    const ast8 = recast.parse(`() => {new Float32Array (this._buffer,  0,  1)}`)
    const ast9 = recast.parse(`() => {new Float64Array (this._buffer,  0,  1)}`)

    t.ok(typedarray.def(ast1))
    t.ok(typedarray.def(ast2))
    t.ok(typedarray.def(ast3))
    t.ok(typedarray.def(ast4))
    t.ok(typedarray.def(ast5))
    t.ok(typedarray.def(ast6))
    t.ok(typedarray.def(ast7))
    t.ok(typedarray.def(ast8))
    t.ok(typedarray.def(ast9))
})

test('Generator', t => {
    t.plan(3)

    const ast1 = recast.parse(`const foobar = function* () {console.log(1, yield)};`)
    const ast2 = recast.parse(`const foobar = function () {console.log(1)};`)
    const ast3 = recast.parse(`const foobar = () => {console.log(foo)}`)

    t.ok(generator.def(ast1))
    t.notOk(generator.def(ast2))
    t.notOk(generator.def(ast3))
})

test('Class', t => {
    t.plan(2)

    const ast = recast.parse(`class Rectangle extends Shape { constructor (id, x, y, width, height) { super(id, x, y); this.width  = width; this.height = height; } } class Circle extends Shape { constructor (id, x, y, radius) { super(id, x, y); this.radius = radius; } } `)
	const ce = recast.parse('var Foo = class {}')

    t.ok(classy.def(ast))
    t.ok(classy.def(ce))
})

test('Modules', t => {
	t.plan(2)

	const ast1 = recast.parse('import foo from "bar"')
	const ast2 = recast.parse('import { foo } from "bar/lib/foo"')

	t.ok(modules.def(ast1))
	t.ok(modules.def(ast2))
})

test('Rest', t => {
    t.plan(1)

    const ast = recast.parse('function bla(pants, ...rest) {}')

    t.ok(rest.def(ast), 'RestElement')
})

test('Spread', t => {
    t.plan(1)

    const ast = recast.parse('const foo = [...blargh]')

    t.ok(spread.def(ast), 'SpreadElement')
})

test('For-Of', t => {
    t.plan(1)

    const ast = recast.parse('for (foo of bar) { continue }')

    t.ok(forof.def(ast), 'ForOfStatement')
})

test('Template Literal', t => {
    t.plan(3)

    const ast1 = recast.parse('const hey = `a rad string`')
    const ast2 = recast.parse('`${a + b}`')
    const ast3 = recast.parse('foo`${a + b}`')

    t.ok(templateliteral.def(ast1), 'TemplateLiteral')
    t.ok(templateliteral.def(ast2), 'TemplateExpression')
    t.ok(templateliteral.def(ast3), 'TaggedTemplateExpression')
})


test('Arrow Expression', t => {
    t.plan(1)

    const ast = recast.parse('const foo = a => { const b = a + 1; return b }')

    t.ok(arrow.def(ast), 'ArrowExpression')
})
