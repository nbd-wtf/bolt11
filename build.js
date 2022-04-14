#!/usr/bin/env node

const esbuild = require('esbuild')
const nodeGlobals = require('@esbuild-plugins/node-globals-polyfill').default

const prod = process.argv.indexOf('prod') !== -1

esbuild
  .build({
    entryPoints: ['main.js'],
    outfile: 'main.build.js',
    bundle: true,
    plugins: [nodeGlobals({buffer: true})],
    define: {
      window: 'self',
      global: 'self'
    },
    loader: {'.js': 'jsx'},
    sourcemap: prod ? false : 'inline',
    minify: prod
  })
  .then(() => console.log('build success.'))
