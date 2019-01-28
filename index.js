const glob = require('glob')

const { features } = require('./features')

module.exports = function main(opts) {
    glob(opts.glob, opts, function (err, files) {
        const report = files.map(f => {
            console.log(f)
            const list = features(f)
            return {
                file: f,
                features: list,
            }
        })

        report.map(r => {
            if (r.features.length > 0) {
                console.log(`${r.file}:`)
                r.features.map(f => {
                    console.log(f)
                })
                console.log('\n\n')
            }
        })

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
