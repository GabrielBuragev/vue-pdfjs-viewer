import 'babel-polyfill'
import Vue from "vue";
import App from './App.vue'
// import './assets/scss/app.scss';
// import VueDropzone from "vue_dropzone_directive";

// PDFJS Conf
// import PDFJS from "pdfjs-dist";
// import PdfjsWorker from 'web-worker:pdfjs-dist/build/pdf.worker.js'

// if (typeof window !== 'undefined' && 'Worker' in window) {
//   pdfjs.GlobalWorkerOptions.workerPort = new PdfjsWorker();
// }

// import TextLayerBuilder from "./assets/js/text_layer_builder.js";
// window.PDFJS = PDFJS;
// window.TextLayerBuilder = TextLayerBuilder;

Vue.config.productionTip = false;
// Vue.use(VueDropzone);

new Vue({
  render: h => h(App)
}).$mount("#app");
