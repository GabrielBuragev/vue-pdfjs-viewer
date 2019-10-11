<template>
  <div class="pdf-toolbar" :style="{'min-height': height + 'px'}">
    <div class="left-toolbox">
      <PDFSidebarToggle v-if="pdf && value.sidebarFeatureVisible" @click="toggleSidebar"></PDFSidebarToggle>
      <slot name="left-toolbox"></slot>
    </div>
    <div class="center-toolbox">
      <div id="pdf-sizer" tag="div">
        <select
          id="select-scale"
          class="mx-auto form-control"
          style="width:auto;"
          v-model="scaleSelection"
        >
          <option
            v-for="(scale, i) in selectOptions"
            :key="i"
            :value="scale"
            :selected="(scaleSelection == scale)"
          >
            {{scale}}
            <span v-if="scale != 'auto'">%</span>
          </option>
        </select>
      </div>
    </div>
    <div class="right-toolbox">
      <slot name="right-toolbox"></slot>
      <PDFDownloadButton v-if="pdf && value.downloadFeatureVisible" :pdf="pdf"></PDFDownloadButton>
    </div>
  </div>
</template>
<script>
import PDFDownloadButton from "./PDFDownloadButton.vue";
import PDFSidebarToggle from "./PDFSidebarToggle.vue";
export default {
  components: {
    PDFDownloadButton,
    PDFSidebarToggle
  },
  props: {
    value: {
      type: Object,
      default: function() {
        return {
          scale: "1.25",
          visible: true,
          height: 50,
          downloadFeatureVisible: true,
          sidebarFeatureVisible: true,
          sidebarVisible: false
        };
      }
    },
    height: {
      type: Number,
      default: 50
    },
    pdf: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      selectOptions: ["auto", "75", "100", "125", "150"],
      scaleSelection: "125"
    };
  },
  mounted() {
    this.selectScale(this.value.scale);
  },
  watch: {
    "value.scale"(nv) {
      this.selectScale(nv);
    },
    scaleSelection(newval) {
      if (newval !== "auto") newval = (parseInt(newval) / 100).toString();
      this.$emit("input", Object.assign({}, this.value, { scale: newval }));
    }
  },
  methods: {
    toggleSidebar: function() {
      this.value.sidebarVisible = !this.value.sidebarVisible;
    },
    selectScale: function(scale) {
      if (scale !== "auto") scale = (scale * 100).toString();

      if (this.selectOptions.includes(scale)) this.scaleSelection = scale;
    }
  }
};
</script>
