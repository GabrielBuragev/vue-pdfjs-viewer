<template>
  <div id="pdf-viewer-wrapper" v-dropzone:[dropzoneOptions.active]="dropzoneOptions">
    <PDFToolbar
      v-model="viewer.toolbar"
      :pdf="viewer.content.pdf"
      :height="viewer.toolbar.height"
      v-if="toolbarVisible"
    >
      <template slot="right-toolbox">
        <slot name="right-toolbox"></slot>
      </template>
      <template slot="left-toolbox">
        <slot name="left-toolbox"></slot>
      </template>
    </PDFToolbar>
    <PDFContainer
      v-model="viewer.content"
      :scale="viewer.toolbar.scale"
      :loading="viewer.content.loading"
      ref="pdfContainer"
    >
      <template slot="error">
        <slot name="error"></slot>
      </template>
      <template slot="loading">
        <slot name="loading"></slot>
      </template>
    </PDFContainer>
    <PDFSidebar
      v-show="viewer.toolbar.sidebarVisible"
      v-if="viewer.content.pdf && viewer.content.pages.length && toolbarVisible"
      :pages="viewer.content.pages"
      :visible="viewer.toolbar.sidebarVisible"
      :topOffset="viewer.toolbar.height"
      @jumpTo="$refs.pdfContainer.scrollToPage"
    ></PDFSidebar>
    <div id="dropzone" v-show="dropzoneVisible" v-if="dropzoneOptions.active">Drop PDFs here !</div>
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
      default: null
    },
    toolbarVisible: {
      type: Boolean,
      default: true
    },
    downloadFeatureVisible: {
      type: Boolean,
      default: true
    },
    sidebarFeatureVisible: {
      type: Boolean,
      default: true
    },
    dropzoneFeatureVisible: {
      type: Boolean,
      default: true
    },
    initialScale: {
      type: String,
      default: "1.25"
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
        active: true,
        extensions: ["pdf"],
        onSuccess: this.onDropzoneUpload.bind(this),
        onError: this.onDropzoneUploadError.bind(this),
        onDragEnter: this.onDropzoneDragEnter.bind(this),
        onDragLeave: this.onDropzoneDragLeave.bind(this)
      }
    };
  },
  async beforeMount() {
    Object.assign(this.viewer.toolbar, {
      downloadFeatureVisible: this.downloadFeatureVisible,
      sidebarFeatureVisible: this.sidebarFeatureVisible,
      visible: this.toolbarVisible,
      scale: this.initialScale,
      height: this.toolbarVisible ? this.viewer.toolbar.height : 0
    });

    this.dropzoneOptions.active = this.dropzoneFeatureVisible;

    if (this.src) {
      try {
        this.viewer.content.pdf = await this.getPDF(this.normalizedSource);
      } catch (e) {
        console.error(e);
      }
    }
  },
  watch: {
    "viewer.content.loading"(newval) {
      this.$emit(newval ? "loadingBegin" : "loadingEnd");
    },
    async normalizedSource(newval) {
      if (newval) {
        try {
          this.viewer.content.pdf = null;
          this.viewer.content.pages = [];
          this.viewer.content.pdf = await this.getPDF(newval);
        } catch (e) {
          this.viewer.content.pdf = null;
          this.viewer.content.pages = [];
          console.error(e);
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
    async getDataAsBuffer() {
      if (this.viewer.content.pdf)
        return await this.viewer.content.pdf.getData();
      return null;
    },
    async onDropzoneUpload(file) {
      try {
        let binarySrc = new Uint8Array(file);
        this.$emit("update:src", binarySrc);
      } catch (e) {
        console.error(e);
        this.src = null;
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
        this.viewer.content.loading = false;
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

      if (!src) return null;
      if (
        (typeof src === "string", src.includes("data:application/pdf;base64,"))
      ) {
        src = src.substring("data:application/pdf;base64,");
      }

      return src;
    }
  }
};
</script>