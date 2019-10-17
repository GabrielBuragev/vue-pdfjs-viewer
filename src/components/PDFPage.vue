<template>
  <div
    class="pdf-page page"
    :class="['page-' + page.pageNumber]"
    :id="'page-'+ page.pageNumber"
    :data-page-number="page.pageNumber"
    ref="pageWrapper"
    :style="viewportSizeStyle"
  >
    <div class="page-content-wrapper" v-if="inViewport.now">
      <div class="page-loader-wrapper">
        <img :src="(browser === 'IE')? loaderGif : loaderSvg" v-if="resizing" class="page-loader" />
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
    <div class="page-content-fallback" v-else>
      <div class="canvasWrapper" ref="canvasWrapper" :style="viewportSizeStyle"></div>
    </div>
  </div>
</template>


<script>
import TextLayer from "./Layers/PDFTextLayer.vue";
import AnnotationLayer from "./Layers/PDFAnnotationLayer.vue";
import loaderGif from "../assets/images/icons/loader_red.gif";
import loaderSvg from "../assets/images/icons/loader.svg";
import inViewport from "vue-in-viewport-mixin";
import userInfo from "../mixins/user-info";

export default {
  props: ["page", "maxDimensions", "canvasContainer", "scale"],
  components: {
    TextLayer,
    AnnotationLayer
  },
  mixins: [inViewport, userInfo],
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
      resizing: false,
      loaderSvg,
      loaderGif
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
    },
    "inViewport.now": function(visible) {
      if (visible) {
        this.$nextTick(function() {
          this.render();
        });
      }
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
    async render(e) {
      this.resizing = true;

      var page = this.page;
      var canvas = this.$refs.canvas;
      var defaultViewport = this.dprViewport;

      var ctx = canvas.getContext("2d");

      await page.render({
        canvasContext: ctx,
        viewport: defaultViewport
      });

      this.textContent = await page.getTextContent();
      this.annotations = await page.getAnnotations({ intent: "display" });

      this.resizing = false;
    },
    async resizePage() {
      if (this.inViewport.now) await this.render();

      this.$emit("finishedRender");
    }
  }
};
</script>