<template>
  <a id="sidebar-toggle" @click.stop.prevent="$emit('click')">
    <span class="pdf-sidebar-toggle-icon">
      <img src="../../assets/images/icons/sidebar-toggle.png" width="20px" height="20px" />
      <br />
    </span>
    <span slot="label"></span>
  </a>
</template>
<script>
export default {};
</script>