import plugin_globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import minify from 'rollup-plugin-babel-minify';
import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import vue from 'rollup-plugin-vue2';
import postcss from 'rollup-plugin-postcss'
import css from 'rollup-plugin-css-only';
import svg from 'rollup-plugin-svg';

const LIBRARY_NAME = 'PDFView';
const FILE_NAME = 'vue-pdfjs-viewer';

const sourcemap = true;
const plugins = [

    babel({
        "exclude": "node_modules/**",
        "runtimeHelpers": true,
        "presets": [
            "@babel/preset-env",
        ],
        "plugins": [
            "@babel/plugin-transform-arrow-functions"
        ],
    }),
    commonjs({
        namedExports: {
            'node_modules/pdfjs-dist/build/pdf.js': ['pdfjs'],
        }
    }),
    vue({ css: false }),
    postcss({
        extensions: ['.css, .scss'],
        namedExports: true
    }),
    css({
        output: false,
    }),
    resolve({
        browser: true,
        preferBuiltins: true
    }),
    plugin_globals(),
    builtins(),
    svg({ base64: true }),
];
const pluginsWithMinify = plugins.slice(0);
const defaultConfig = {
    input: 'src/index.js'
};

if (process.env.NODE_ENV === 'production') {
    pluginsWithMinify.push(minify());
}

if (process.env.NODE_ENV === 'development') {
    defaultConfig.input = 'dev/main.js';
    defaultConfig.watch = {
        include: ['src/**', 'dev/**']
    };

    plugins.push(livereload());
    plugins.push(serve({
        contentBase: '.',
        open: true
    }));
}

export default [
    Object.assign({}, defaultConfig, {
        output: [
            {
                file: `dist/${FILE_NAME}.common.js`,
                format: 'cjs',
                sourcemap,
                exports: 'named',
            },
            {
                file: `dist/${FILE_NAME}.es.js`,
                format: 'es',
                sourcemap,
                exports: 'named',

            },
            {
                file: `dist/${FILE_NAME}.umd.js`,
                format: 'umd',
                name: LIBRARY_NAME,
                sourcemap,
                exports: 'named',

            },
        ],
        plugins
    }),
    Object.assign({}, defaultConfig, {
        output: {
            file: `dist/${FILE_NAME}.js`,
            format: 'iife',
            name: LIBRARY_NAME,
            sourcemap,
            exports: 'named',
        },
        plugins
    }),
    Object.assign({}, defaultConfig, {
        output: {
            file: `dist/${FILE_NAME}.min.js`,
            format: 'iife',
            name: LIBRARY_NAME,
            sourcemap,
            exports: 'named',
        },
        plugins: pluginsWithMinify
    }),
];