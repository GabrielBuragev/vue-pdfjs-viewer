<template>
  <div id="app" style="height:593px">
    <PDFView
      :src.sync="src"
      ref="pdfView"
      fileName="order"
      :sidebarFeatureVisible="false"
      :downloadFeatureVisible="true"
      :dropzoneFeatureVisible="true"
      :scale.sync="scale"
    >
      <template slot="right-toolbox"></template>
      <template slot="left-toolbox"></template>
      <template slot="error"></template>
      <template slot="loading"></template>
    </PDFView>
  </div>
</template>

<script>
// import PDFView from "./components/PDFView";
import { PDFView } from "../dist/vue-pdfjs-viewer.es";
export default {
  name: "app",
  components: {
    PDFView
  },
  data() {
    return {
      src: "http://127.0.0.1:8082/test.pdf",
      scale: "1.25"
    };
  },
  mounted() {
    var self = this;
    setTimeout(() => {
      self.scale = "auto";
    }, 5000);
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
