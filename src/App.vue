<template>
  <div id="app" style="height:593px">
    <PDFView
      :src.sync="src"
      ref="pdfView"
      :sidebarFeatureVisible="false"
      :downloadFeatureVisible="false"
      :dropzoneFeatureVisible="true"
      initialScale="1.25"
    >
      <template slot="right-toolbox"></template>
      <template slot="left-toolbox"></template>
      <template slot="error"></template>
      <template slot="loading"></template>
    </PDFView>
  </div>
</template>

<script>
import { PDFView } from "../dist/vue-pdfjs-viewer.es";
export default {
  name: "app",
  components: {
    PDFView
  },
  data() {
    return {
      src: null
    };
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
