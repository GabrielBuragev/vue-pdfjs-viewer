<template>
  <div
    class="annotationLayer"
    ref="annotationLayer"
    id="annotation-layer"
    style="width:0px; height:0px;"
  ></div>
</template>

<script>
import { PDFLinkService } from "pdfjs-dist/lib/web/pdf_link_service.js";
export default {
  props: ["page", "viewport", "canvas", "annotations"],
  data() {
    return {};
  },
  watch: {
    annotations() {
      this.$refs.annotationLayer.innerHTML = "";
      this.renderAnnotations();
    },
    viewport() {
      this.$refs.annotationLayer.innerHTML = "";
      this.renderAnnotations();
    }
  },
  methods: {
    renderAnnotations() {
      var self = this;

      let pdfLinkService = new PDFLinkService({
        externalLinkTarget: 2
      });

      // Render the annotation layer
      PDFJS.AnnotationLayer.render({
        viewport: self.viewport.clone({ dontFlip: true }),
        div: self.$refs.annotationLayer,
        annotations: self.annotations,
        page: self.page,
        renderInteractiveForms: false,
        linkService: pdfLinkService
      });
    }
  }
};
</script>
<style>
#annotation-layer {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0.2;
  line-height: 1;
}

#annotation-layer > section {
  color: transparent;
  position: absolute;
  white-space: pre;
  cursor: text;
  transform-origin: 0% 0%;
}

#annotation-layer > .linkAnnotation > a {
  position: absolute;
  font-size: 1em;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>