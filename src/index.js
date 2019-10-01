import "./assets/scss/app.scss";
// PDFJS Conf
import PDFJS from "pdfjs-dist/build/pdf.js";
import TextLayerBuilder from "./assets/js/text_layer_builder.js";
window.PDFJS = PDFJS;
window.TextLayerBuilder = TextLayerBuilder;
PDFJS.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.worker.js';

// Import vue component
import PDFView from './components/PDFView.vue';


// Declare install function executed by Vue.use()
export function install(Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('PDFView', PDFView);
}

// Create module definition for Vue.use()
const plugin = {
    install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export { PDFView };
