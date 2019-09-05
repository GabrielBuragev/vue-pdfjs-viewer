<template>
  <div id="pdf-viewer-wrapper" v-dropzone="dropzoneOptions">
    <PDFToolbar v-model="viewer.toolbar" :pdf="viewer.content.pdf" :height="viewer.toolbar.height"></PDFToolbar>
    <PDFContainer
      v-model="viewer.content"
      :scale="viewer.toolbar.scale"
      :loading="viewer.content.loading"
      ref="pdfContainer"
    ></PDFContainer>
    <PDFSidebar
      v-show="viewer.toolbar.sidebarVisible"
      v-if="viewer.content.pdf && viewer.content.pages.length"
      :pages="viewer.content.pages"
      :visible="viewer.toolbar.sidebarVisible"
      :topOffset="viewer.toolbar.height"
      @jumpTo="$refs.pdfContainer.scrollToPage"
    ></PDFSidebar>
    <div id="dropzone" v-show="dropzoneVisible">Drop PDFs like its hot !</div>
    <PDFNotifications :notifications.sync="pdfNotifications"></PDFNotifications>
  </div>
</template>

<script>
import PDFNotifications from "./Notifications/PDFNotifications";
import PDFContainer from "./PDFContainer";
import PDFToolbar from "./Toolbar/PDFToolbar";
import PDFSidebar from "./Sidebar/PDFSidebar";
import DropzoneDirective from "../directives/vue_dropzone";

export default {
  directives: {
    DropzoneDirective
  },
  props: {
    src: {
      type: [String],
      default: null
    }
  },
  components: {
    PDFToolbar,
    PDFContainer,
    PDFSidebar,
    PDFNotifications
  },
  data() {
    return {
      viewer: {
        toolbar: {
          scale: "1.25",
          visible: true,
          height: 50,
          downloadFeatureVisible: true,
          sidebarFeatureVisible: true,
          sidebarVisible: false
        },
        content: {
          pdf: null,
          loading: false,
          pages: []
        }
      },
      pdfNotifications: [],
      dropzoneVisible: false,
      dropzoneOptions: {
        extensions: ["pdf"],
        onSuccess: this.onDropzoneUpload.bind(this),
        onError: this.onDropzoneUploadError.bind(this),
        onDragEnter: this.onDropzoneDragEnter.bind(this),
        onDragLeave: this.onDropzoneDragLeave.bind(this)
      }
    };
  },
  async mounted() {
    if (this.src) {
      try {
        this.viewer.content.pdf = await this.getPDF(this.normalizedSource);
      } catch (e) {
        console.log(e);
      }
    }
  },
  watch: {
    async normalizedSource(newval) {
      if (newval) {
        try {
          this.viewer.content.pdf = await this.getPDF(newval);
        } catch (e) {
          console.error(e);
          this.viewer.content.pdf = null;
        }
      }
    }
  },
  methods: {
    onDropzoneDragEnter() {
      this.dropzoneVisible = true;
    },
    onDropzoneDragLeave() {
      this.dropzoneVisible = false;
    },
    async onDropzoneUpload(file) {
      this.viewer.content.pdf = null;
      this.viewer.content.pages = [];

      try {
        this.viewer.content.pdf = await this.getPDF(new Uint8Array(file));
      } catch (e) {
        console.error(e);
        this.viewer.content.pdf = null;
      }
    },
    onDropzoneUploadError(msg) {
      this.pdfNotifications.push({
        text: msg,
        type: "error"
      });
    },
    async getPDF(val) {
      try {
        this.viewer.content.loading = true;
        let pdf = await PDFJS.getDocument(val);

        return pdf;
      } catch (e) {
        this.viewer.content.loading = false;
        throw new Error(e);
      }
    },
    convertDataURIToBinary: function(dataURI) {
      var BASE64_MARKER = ";base64,",
        base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length,
        base64 = dataURI.substring(base64Index),
        raw = window.atob(base64),
        rawLength = raw.length,
        array = new Uint8Array(new ArrayBuffer(rawLength));

      for (var i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
      }
      return array;
    }
  },
  computed: {
    normalizedSource() {
      let src = this.src;
      let data = null;
      if (!src) return data;
      if (
        (typeof src === "string", src.includes("data:application/pdf;base64,"))
      ) {
        data = src.substring("data:application/pdf;base64,");
      } else if (typeof src === "string") data = src;

      return data;
    }
  }
};
</script>