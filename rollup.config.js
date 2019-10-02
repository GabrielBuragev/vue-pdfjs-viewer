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
import url from "rollup-plugin-url"

const LIBRARY_NAME = 'PDFView';
const FILE_NAME = 'vue-pdfjs-viewer';

const sourcemap = true;
const plugins = [

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
    babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true,
    }),
    plugin_globals(),
    builtins(),
    svg({ base64: true }),
    url({
        limit: 10 * 1024, // inline files < 10k, copy files > 10k
        include: ["**/*.png"], // defaults to .svg, .png, .jpg and .gif files
    })
];
const pluginsWithMinify = plugins.slice(0);
const external = [
    // 'fs',
    // 'path',
    // 'url'
];
const globals = {
    // 'fs': 'fs',
    // 'path': 'path',
    // 'url': 'url'
}
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
        external: external,
        output: [
            {
                file: `dist/${FILE_NAME}.common.js`,
                format: 'cjs',
                sourcemap,
                exports: 'named',
                globals: globals
            },
            {
                file: `dist/${FILE_NAME}.es.js`,
                format: 'es',
                sourcemap,
                exports: 'named',
                globals: globals

            },
            {
                file: `dist/${FILE_NAME}.umd.js`,
                format: 'umd',
                name: LIBRARY_NAME,
                sourcemap,
                exports: 'named',
                globals: globals

            },
        ],
        plugins
    }),
    Object.assign({}, defaultConfig, {
        external: external,
        output: {
            file: `dist/${FILE_NAME}.js`,
            format: 'iife',
            name: LIBRARY_NAME,
            sourcemap,
            exports: 'named',
            globals: globals

        },
        plugins
    }),
    Object.assign({}, defaultConfig, {
        external: external,
        output: {
            file: `dist/${FILE_NAME}.min.js`,
            format: 'iife',
            name: LIBRARY_NAME,
            sourcemap,
            exports: 'named',

            globals: globals
        },
        plugins: pluginsWithMinify
    }),
];