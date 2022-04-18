import plugin_globals from "rollup-plugin-node-globals";
import builtins from "rollup-plugin-node-builtins";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import minify from "rollup-plugin-babel-minify";
import resolve from "rollup-plugin-node-resolve";
import vue from "rollup-plugin-vue2";
import postcss from "rollup-plugin-postcss";
import css from "rollup-plugin-css-only";
import image from "rollup-plugin-img";
import pkg from "./package.json";

const LIBRARY_NAME = "PDFView";
const FILE_NAME = "vue-pdfjs-viewer";

const externals = [
  ...(pkg.dependencies ? Object.keys(pkg.dependencies) : []),
  ...(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []),
  "pdfjs-dist/build/pdf.js",
];
const externalExcludes = [];

const sourcemap = false;
const plugins = [
  resolve({
    browser: true,
    preferBuiltins: true,
  }),
  vue({ css: false }),
  commonjs({
    namedExports: {
      "node_modules/pdfjs-dist/build/pdf.js": ["pdfjs"],
    },
  }),
  babel({
    runtimeHelpers: true,
    exclude: "node_modules/**",
    babelrc: true,
    extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".vue"],
  }),
  postcss({
    extensions: [".css, .scss"],
    namedExports: true,
  }),
  css({
    output: false,
  }),
  plugin_globals(),
  builtins(),
  image({
    output: `dist/images`, // default the root
    extensions: /\.(png|jpg|jpeg|gif|svg)$/, // support png|jpg|jpeg|gif|svg, and it's alse the default value
    limit: 50000, // default 8192(8k)
    exclude: "node_modules/**",
  }),
];
const pluginsWithMinify = plugins.slice(0);
const defaultConfig = {
  input: "src/index.js",
  external: externals.filter((dep) => {
    return !externalExcludes.includes(dep);
  }),
};

if (process.env.NODE_ENV === "production") {
  pluginsWithMinify.push(minify());
}

export default [
  Object.assign({}, defaultConfig, {
    output: [
      {
        file: `dist/${FILE_NAME}.es.js`,
        format: "es",
        sourcemap,
        exports: "named",
      },
      {
        file: `dist/${FILE_NAME}.umd.js`,
        format: "umd",
        name: LIBRARY_NAME,
        sourcemap,
        exports: "named",
      },
    ],
    plugins,
  }),
  Object.assign({}, defaultConfig, {
    output: {
      file: `dist/${FILE_NAME}.js`,
      format: "iife",
      name: LIBRARY_NAME,
      sourcemap,
      exports: "named",
    },
    plugins,
  }),
  Object.assign({}, defaultConfig, {
    output: {
      file: `dist/${FILE_NAME}.min.js`,
      format: "iife",
      name: LIBRARY_NAME,
      sourcemap,
      exports: "named",
    },
    plugins: pluginsWithMinify,
  }),
];
