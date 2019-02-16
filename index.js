const glob = require('glob')

const { features } = require('./features')

function print(report, json) {
    if (json) {
        const format = report
        .filter(r => r.features.length > 0)
        .map(r => {
            return {
                file: r.file,
                features: r.features.map(f => f.name)
            }
        })
        console.log(JSON.stringify(format, null, 4))
    } else {
        console.log('')
        console.log('Report:')
        report.map(r => {
            if (r.features.length > 0) {
                console.log(`${r.file}:`)
                r.features.map(r => console.log(r.name))
                console.log('')
            }
        })
    }
}

module.exports = function main(opts) {
    glob(opts.glob, opts, function (err, files) {
        const report = files.map(f => {
            const list = features(f)
            return {
                file: f,
                features: list,
            }
        })

        print(report, opts.json)


        // output:
        // {
        //  es6: {
        //    features: [...],
        //    builtIns: [...]
        //  },
        //  es7: ...
        // }
        //
        // const browserslist = require('...')
        //
        // caniuse(report, browserslist)
        //
        // prettyPrint(report)
    })
}
