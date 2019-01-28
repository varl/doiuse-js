#!/usr/bin/env node

const glob = require('glob')
const argv = require('yargs').argv

const { features } = require('./features')

function main(opts) {
    glob(opts.glob, opts, function (err, files) {
        const report = files.map(f => {
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

        //
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

main({
    cwd: argv._[0],
    glob: argv._[1] || '**/*.js',
    absolute: true,
})
