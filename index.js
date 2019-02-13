const glob = require('glob')

const { features } = require('./features')

module.exports = function main(opts) {
    glob(opts.glob, opts, function (err, files) {
        console.log('Files:')
        const report = files.map(f => {
            console.log(f)
            const list = features(f)
            return {
                file: f,
                features: list,
            }
        })

        console.log('')
        console.log('Report:')
        report.map(r => {
            if (r.features.length > 0) {
                console.log(`${r.file}:`)
                r.features.map(f => {
                    Object.keys(f).map(e => console.log(e))
                })
                console.log('')
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
