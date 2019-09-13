<template>
  <div id="app">
    <PDFView
      :src.sync="src"
      ref="pdfView"
      :sidebarFeatureVisible="false"
      :downloadFeatureVisible="false"
    ></PDFView>
  </div>
</template>

<script>
import { PDFView } from "../";
export default {
  name: "app",
  components: {
    PDFView
  },
  data() {
    return {
      src: "http://localhost:8082/example_1.pdf"
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
