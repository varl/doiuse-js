const fs = require('fs')
const path = require('path')

const r = require('recast')

const es = {
    'es6': path.join(__dirname, 'es6'),
    'es7': path.join(__dirname, 'es7'),
}

exports.features = function (file, level = 'all') {
    let features = []

    const code = fs.readFileSync(file)
    const ast = r.parse(code)

    if (Object.keys(es).includes(level)) {
        const feats = fs.readdirSync(es[level])

        features = features.concat(feats.map(f => require(path.join(es[level], f))))
    } else {
        for (const [key, val] of Object.entries(es)) {
            const feats = fs.readdirSync(val)

            const load = feats.map(f => require(path.join(val, f)))

            features = features.concat(load)
        }
    }

    return features.filter(feature => feature.def(ast))
}
