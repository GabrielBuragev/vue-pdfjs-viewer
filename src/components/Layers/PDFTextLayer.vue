<template>
  <div
    class="textLayer"
    ref="textLayerDiv"
    :style="{'width': viewport.width + 'px','height': viewport.height+ 'px'}"
  ></div>
</template>

<script>
export default {
  props: ["page", "viewport", "textContent"],
  data() {
    return {};
  },
  watch: {
    textContent() {
      this.$refs.textLayerDiv.innerHTML = "";
      this.renderText();
    },
    viewport() {
      this.$refs.textLayerDiv.innerHTML = "";
      this.renderText();
    }
  },
  methods: {
    renderText() {
      // Create new instance of TextLayerBuilder class
      var textLayer = new TextLayerBuilder({
        textLayerDiv: this.$refs.textLayerDiv,
        pageIndex: this.page.pageIndex,
        viewport: this.viewport
      });

      // Set text-fragments
      textLayer.setTextContent(this.textContent);

      // Render text-fragments
      return textLayer.render();
    }
  }
};
</script>
