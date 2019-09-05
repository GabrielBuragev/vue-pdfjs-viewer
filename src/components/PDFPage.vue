<template>
  <div
    class="pdf-page page"
    :class="['page-' + page.pageNumber]"
    :id="'page-'+ page.pageNumber"
    :data-page-number="page.pageNumber"
    ref="pageWrapper"
    :style="viewportSizeStyle"
  >
    <div class="page-loader-wrapper">
      <img src="../assets/images/icons/loader.svg" v-if="resizing" class="page-loader" />
    </div>

    <div class="canvasWrapper" ref="canvasWrapper" :style="viewportSizeStyle">
      <canvas
        ref="canvas"
        :width="dprViewport.width"
        :height="dprViewport.height"
        :data-page="page.pageNumber"
        :style="viewportSizeStyle"
      ></canvas>
    </div>

    <TextLayer :viewport="viewport" :textContent="textContent" :page="page"></TextLayer>
    <AnnotationLayer :viewport="viewport" :page="page" :annotations="annotations"></AnnotationLayer>
  </div>
</template>


<script>
import TextLayer from "./Layers/PDFTextLayer";
import AnnotationLayer from "./Layers/PDFAnnotationLayer";

export default {
  props: ["page", "maxDimensions", "canvasContainer", "scale"],
  components: {
    TextLayer,
    AnnotationLayer
  },
  data() {
    return {
      dims: {
        width: 0,
        height: 0
      },
      canvas: undefined,
      canvasWrapper: undefined,
      pageWrapper: undefined,
      textLayerDiv: undefined,
      pageToDataURL: undefined,
      textContent: {},
      annotations: [],
      resizing: false
    };
  },
  mounted() {
    var self = this;
    this.dims = this.page.getViewport(1.0);
    this.pageIndex = this.page.pageNumber;
    this.resizePage();
  },
  watch: {
    scale: function(newVal, oldVal) {
      var self = this;
      setTimeout(function() {
        self.resizePage();
      }, 100);
    }
  },
  computed: {
    viewportSizeStyle() {
      return {
        width: this.viewport.width + "px",
        height: this.viewport.height + "px"
      };
    },
    viewport: function() {
      var page = this.page;
      var viewport = page.getViewport(this.scale);
      viewport.width = Math.floor(viewport.width);
      viewport.height = Math.floor(viewport.height);
      return viewport;
    },
    dprViewport: function() {
      var page = this.page;
      var viewport = page.getViewport(this.scale * window.devicePixelRatio);
      viewport.width = Math.floor(viewport.width);
      viewport.height = Math.floor(viewport.height);
      return viewport;
    }
  },
  methods: {
    async resizePage() {
      this.resizing = true;

      var self = this;
      var page = this.page;
      var canvas = this.$refs.canvas;
      var canvasWrapper = this.$refs.canvasWrapper;
      var pageWrapper = this.$refs.pageWrapper;
      var canvasContainer = this.canvasContainer;
      var viewport = this.viewport;
      var defaultViewport = this.dprViewport;

      var ctx = canvas.getContext("2d");

      await page.render({
        canvasContext: ctx,
        viewport: defaultViewport
      });

      this.textContent = await page.getTextContent();
      this.annotations = await page.getAnnotations();
      this.resizing = false;
      this.$emit("finishedRender");
    }
  }
};
</script>