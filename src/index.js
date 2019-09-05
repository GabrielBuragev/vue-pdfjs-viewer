import './assets/scss/app.scss';
import PDFView from "./components/PDFView";
import PDFPage from "./components/PDFPage";
import PDFContainer from "./components/PDFContainer";

// PDFJS Conf
import PDFJS from "pdfjs-dist/webpack";
import TextLayerBuilder from "./assets/js/text_layer_builder.js";
window.PDFJS = PDFJS;
window.TextLayerBuilder = TextLayerBuilder;

export { PDFView, PDFPage, PDFContainer };
