import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const input = 'src/Collection.js';
const outputName = 'Collection';

export default [
    // UMD build (for browsers)
    {
        input,
        output: {
            name: outputName,
            file: pkg.browser,
            format: 'umd',
            exports: 'default'
        },
        plugins: [
            resolve(),
            commonjs(),
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**'
            }),
            terser()
        ]
    },
    // CommonJS (for Node) and ES module (for bundlers) build
    {
        input,
        output: [
            { file: pkg.main, format: 'cjs', exports: 'default' },
            { file: pkg.module, format: 'es' }
        ],
        plugins: [
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**'
            })
        ]
    }
];