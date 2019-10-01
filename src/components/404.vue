<template>
  <div id="error-page">
    <h2 class="error-status-code" style slot="status-code">
      <span class="text">{{statusCode}}</span>
      <img :src="warningIcon" />
    </h2>
    <h3 class="error-status-message">{{statusMessage}}</h3>
  </div>
</template>

<script>
import warningIcon from "../assets/images/icons/warning.svg";

export default {
  props: ["statusCode", "statusMessage"],
  data() {
    return {
      warningIcon
    };
  }
};
</script>