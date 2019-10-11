<template>
  <div class="pdf_notification" :class="notification.type">
    <span class="text">{{notification.text}}</span>
    <span class="close">x</span>
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      default: function() {
        return {
          type: "info",
          text: ""
        };
      }
    }
  },
  data() {
    return {
      lifespan: 5000
    };
  },
  mounted() {
    setTimeout(function() {
      this.$emit("dieOut");
    }, 5000);
  }
};
</script>
