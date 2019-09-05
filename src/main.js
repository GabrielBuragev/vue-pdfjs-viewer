import "babel-polyfill";
import Vue from "vue";
import { PDFView } from "./";
import './assets/scss/app.scss';

// PDFJS Conf
import PDFJS from "pdfjs-dist/webpack";
import TextLayerBuilder from "./assets/js/text_layer_builder.js";
window.PDFJS = PDFJS;
window.TextLayerBuilder = TextLayerBuilder;

Vue.config.productionTip = false;


new Vue({
  render: h => h(PDFView)
}).$mount("#app");

