<template>
  <a id="pdf-download" @click.stop.prevent="download">
    <span class="pdf-download-icon">
      <img :src="downloadSvg" width="20px" height="20px" />
      <br />
    </span>
    <span slot="label"></span>
  </a>
</template>
<script>
import downloadSvg from "../../assets/images/icons/download.svg";

export default {
  props: {
    pdf: {
      type: Object,
      default: () => ({})
    },
    name: {
      type: String,
      default: Date.now().toString()
    }
  },
  data() {
    return {
      downloadSvg
    };
  },
  methods: {
    async download() {
      let binaryPDF = await this.pdf.getData();
      this.downloadBlob(binaryPDF, this.name, "application/pdf");
    },
    downloadBlob(data, fileName, mimeType) {
      var blob, url;
      blob = new Blob([data], {
        type: mimeType
      });
      url = window.URL.createObjectURL(blob);
      this.downloadURL(url, fileName);
      this.$nextTick(() => {
        window.URL.revokeObjectURL(url);
      });
    },
    downloadURL(data, fileName) {
      var a;
      a = document.createElement("a");
      a.href = data;
      a.download = fileName;
      document.body.appendChild(a);
      a.style = "display: none";
      a.click();
      a.remove();
    }
  }
};
</script>