<template>
  <div class="pdf-wrapper" id="pdfCanvasContainer" ref="canvasContainer">
    <div
      class="pdf-wrapper-inside"
      v-if="value.pdf || loading"
      @click.capture="$emit('update:sidebarVisible', false)"
    >
      <div>
        <div class="loading-status" v-if="pdfLoadingProgress < pdfNumPages || loading ">
          <img src="../assets/images/icons/loader.svg" width="20%" height="20%" />
          <br />
          <h3>{{loadingAlert}}</h3>
        </div>

        <PDFPage
          v-for="(page, index) in value.pages"
          :page="page"
          :maxDimensions="maxDimensions"
          :scale="normalizedScale"
          :canvasContainer="$refs.canvasContainer"
          :ref="'pdfpage-' + index"
          @finishedRender="pdfLoadingProgress++"
          v-bind:key="index"
        ></PDFPage>
      </div>
    </div>

    <PageNotFound :statusMessage="pageNotFoundMessage" statusCode="404" v-else></PageNotFound>
  </div>
</template>

<script>
import PageNotFound from "./404.vue";
import PDFPage from "./PDFPage.vue";
import { isMobile } from "mobile-device-detect";

export default {
  props: {
    scale: {
      type: String,
      default: "1"
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingAlert: {
      type: String,
      default: "Please wait..."
    },
    value: {
      type: Object,
      default: () => ({
        pdf: null,
        loading: false,
        pages: []
      })
    }
  },
  components: {
    PageNotFound,
    PDFPage
  },
  data() {
    return {
      pageNotFoundMessage: "Please insert a correct pdf source !",
      PAGE_BORDER_SIZE: 8,
      SCROLLBAR_WIDTH: 17,
      pdfLoadingProgress: 1,
      pdfLoading: true,
      pages: [],
      height: 0
    };
  },
  mounted() {
    this.height = this.$refs.canvasContainer.parentNode.clientHeight;
  },
  watch: {
    "value.pdf": async function(pdf) {
      if (pdf) {
        await this.render(pdf);
      }
    }
  },
  methods: {
    async render(pdf) {
      console.log(pdf.cleanup, pdf.destroy);
      var promiseArray = Array.from(new Array(pdf.numPages).keys()).map(
        function(val, index) {
          return pdf.getPage(val + 1);
        }
      );

      this.pages = [];

      let pages = await Promise.all(promiseArray);

      this.value.pages = pages;
      this.$emit("input", this.value);

      return true;
    },
    scrollToPage(index) {
      let scrollTop = this.$refs["pdfpage-" + index][0].$el.offsetTop;
      this.$refs.canvasContainer.scrollTo(0, scrollTop);
    }
  },
  computed: {
    maxDimensions() {
      var self = this;
      var maxDims = {
        width: 0,
        height: 0
      };

      for (var i = 0; i < self.pages.length; i++) {
        let page = self.pages[i];
        var pageVP = page.getViewport(1.0);
        if (pageVP.width > maxDims.width) {
          maxDims.width = pageVP.width;
        }
        if (pageVP.height > maxDims.height) {
          maxDims.height = pageVP.height;
        }
      }

      return maxDims;
    },
    normalizedScale() {
      let fitScale =
        (this.$refs.canvasContainer.clientWidth -
          this.PAGE_BORDER_SIZE * 2 -
          this.SCROLLBAR_WIDTH) /
        this.maxDimensions.width;

      let scaleDecimal = parseFloat(this.scale);

      console.log(this.scale, fitScale, scaleDecimal);
      if (this.scale == "auto") return fitScale;
      else return isMobile ? fitScale * scaleDecimal : scaleDecimal;
    },
    pdfNumPages() {
      return this.value.pdf && this.value.pdf.numPages;
    }
  }
};
</script>

<style>
</style>