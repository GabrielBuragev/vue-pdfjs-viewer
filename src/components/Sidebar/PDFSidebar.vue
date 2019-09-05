<template>
  <div
    class="pdf-sidebar"
    :class="{'sidebar-visible': visible}"
    ref="pdfSidebar"
    :style="{'height' : 'calc(100% - ' + topOffset + 'px )','top' : topOffset + 'px'}"
  >
    <div class="pdf-sidebar-inside">
      <PDFSidebarThumbnail
        v-for="(page, index) in pages"
        :page="page"
        :key="index"
        @click="$emit('jumpTo', page.pageIndex)"
      ></PDFSidebarThumbnail>
    </div>
  </div>
</template>
<script>
import PDFSidebarThumbnail from "./PDFSidebarThumbnail.vue";
export default {
  props: {
    pages: {
      type: Array,
      default: []
    },
    visible: {
      type: Boolean,
      default: false
    },
    topOffset: {
      type: Number,
      default: 50
    }
  },
  components: {
    PDFSidebarThumbnail
  }
};
</script>