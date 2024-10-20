import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
// import packageJson from './package.json';

const INPUT = 'src/Collection.js';
const OUTPUTFILE = 'Collection';

export default {
  input: INPUT,
  output: [
    // ESM Format
    { 
        file: 'dist/bundle.esm.js',
        format: 'esm', 
        sourcemap: true,
        exports: 'default',
    },
    { 
        file: 'dist/bundle.esm.min.js',
        format: 'esm',
        exports: 'default',
        plugins: [terser()]
    },

    // CommonJS Format
    { 
        file: 'dist/bundle.cjs.js',
        format: 'cjs',
        exports: 'default',
        sourcemap: true 
    },
    { 
        file: 'dist/bundle.cjs.min.js',
        format: 'cjs',
        exports: 'default',
        plugins: [terser()]
    },

    // IIFE Format
    { 
        file: 'dist/bundle.iife.js',
        format: 'iife', 
        name: OUTPUTFILE,
        exports: 'default',
        sourcemap: true 
    },
    { 
        file: 'dist/bundle.iife.min.js', 
        format: 'iife', 
        name: OUTPUTFILE,
        exports: 'default', 
        plugins: [terser()] 
    },

    // UMD Format
    { 
        file: 'dist/bundle.umd.js',
        format: 'umd', 
        name: OUTPUTFILE,
        exports: 'default',
        sourcemap: true 
    },
    { 
        file: 'dist/bundle.umd.min.js',
        format: 'umd', 
        name: OUTPUTFILE,
        exports: 'default',
        plugins: [terser()] 
    }
  ],
  plugins: [
    resolve(),   // Resolves dependencies from node_modules
    commonjs(),      // Converts CommonJS to ES modules
    babel({          // Transpile code using Babel
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    })
  ]
};
