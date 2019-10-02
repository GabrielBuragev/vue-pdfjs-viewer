<template>
  <a id="sidebar-toggle" @click.stop.prevent="$emit('click')">
    <span class="pdf-sidebar-toggle-icon">
      <img :src="sidebarToggleImg" width="20px" height="20px" />
      <br />
    </span>
    <span slot="label"></span>
  </a>
</template>
<script>
import sidebarToggleImg from "../../assets/images/icons/sidebar.svg";

export default {
  data() {
    return {
      sidebarToggleImg
    };
  }
};
</script>