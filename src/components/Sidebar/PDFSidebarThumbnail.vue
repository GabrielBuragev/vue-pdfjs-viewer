<template>
  <div class="thumbnail" :id="'thumbnail-document-' + page.pageNumber" @click="$emit('click')">
    <div
      class="thumbnailSelectionRing"
      :style="{'width': (scaledWidth + 7) + 'px','box-sizing': 'content-box'}"
    >
      <img :width="scaledWidth" :height="scaledHeight" class="thumbnailImage" :src="thumbnailImage" />
      <div class="thumbnailLabel">{{page.pageNumber}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    page: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      initialWidth: 100,
      initialHeight: 100,
      scaledWidth: 0,
      scaledHeight: 0,
      thumbnailImage: null
    };
  },
  async mounted() {
    let canvas = document.createElement("canvas");
    let viewport = this.dprViewport;
    let ctx = canvas.getContext("2d");

    var ratioH = viewport.height / viewport.width;
    var ratioW = viewport.width / viewport.height;
    if (ratioH > 1) {
      this.scaledWidth = 100;
      this.scaledHeight = this.scaledWidth * ratioH;
    } else {
      this.scaledHeight = 100;
      this.scaledWidth = this.scaledHeight * ratioW;
    }

    canvas.width = this.scaledWidth;
    canvas.height = this.scaledHeight;

    await this.page.render({
      canvasContext: ctx,
      viewport: this.page.getViewport(
        this.scaledWidth / this.page.getViewport(1.0).width
      )
    });
    this.thumbnailImage = canvas.toDataURL();
  },
  computed: {
    dprViewport: function() {
      var page = this.page;
      var normalViewport = page.getViewport(1.0);
      var scaledViewport = page.getViewport(
        this.initialWidth / normalViewport.width
      );
      scaledViewport.width = Math.floor(scaledViewport.width);
      scaledViewport.height = Math.floor(scaledViewport.height);
      return scaledViewport;
    }
  }
};
</script>