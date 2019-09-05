<template>
  <div id="error-page">
    <h2 class="error-status-code" style slot="status-code">
      <span class="text">{{statusCode}}</span>
      <img src="../assets/images/icons/warning.svg" />
    </h2>
    <h3 class="error-status-message">{{statusMessage}}</h3>
  </div>
</template>

<script>
export default {
  props: ["statusCode", "statusMessage"],
  data() {
    return {};
  }
};
</script>