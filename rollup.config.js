import commonjs from 'rollup-plugin-commonjs'; // Convert CommonJS modules to ES6
import resolve from 'rollup-plugin-node-resolve';
import vue from 'rollup-plugin-vue2'; // Handle .vue SFC files
import scss from 'rollup-plugin-scss';
import babel from 'rollup-plugin-babel'; // Transpile/polyfill with reasonable browser support
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import worker from 'rollup-plugin-bundle-worker';
import preset2015 from 'babel-preset-es2015-rollup';
import webworker from 'rollup-plugin-web-worker-loader';

export default {
    input: 'src/main.js', // Path relative to package.json
    output: {
        name: 'PDFView',
        file: 'dist/app.js',
        exports: 'named',
        format: 'iife',
        globals: {
            'pdfjs-dist': 'pdfjs',
        }
    },
    plugins: [
        resolve({ browser: true }),
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            runtimeHelpers: true,
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: false,
                        useBuiltIns: 'usage',
                        targets: {
                            ie: '11',
                        },
                    },
                ],
            ],
        }),
        commonjs(),
        vue({
            css: false, // Dynamically inject css as a <style> tag
        }),
        scss(),
        builtins(),
        globals(),
        webworker(),
    ],

};