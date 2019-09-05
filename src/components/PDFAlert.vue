<template>
  <b-row class="alert-wrapper" no-gutters>
    <b-col
      v-if="alert != null && typeof alert != 'undefined' && alert != ''"
      cols="12"
      class="alert alert-danger alert-text"
      v-html="alert"
    ></b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    alert: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  }
};
</script>
