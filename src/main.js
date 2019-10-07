import 'babel-polyfill'
import Vue from "vue";
import App from './App.vue'
import './assets/scss/app.scss';


// PDFJS Conf
import PDFJS from "pdfjs-dist";
import PdfjsWorker from 'worker-loader!pdfjs-dist/build/pdf.worker.js'

if (typeof window !== 'undefined' && 'Worker' in window) {
  PDFJS.GlobalWorkerOptions.workerPort = new PdfjsWorker();
}

import TextLayerBuilder from "./assets/js/text_layer_builder.js";
window.PDFJS = PDFJS;
window.TextLayerBuilder = TextLayerBuilder;

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
