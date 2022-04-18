<template>
  <div id="app" style="height:100vh; width:100vw; position:fixed;">
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
      <!-- Add more buttons/features on the right side of the toolbar -->
      <template slot="left-toolbox"></template>
      <!-- Add more buttons/features on the left side of the toolbar -->
      <template slot="error"></template>
      <!-- Change the error message design -->
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
    PDFView,
  },
  data() {
    return {
      src: "http://localhost:8081/test.pdf",
      scale: "1.25",
    };
  },
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
