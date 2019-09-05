<template>
  <div class="notifications-wrapper">
    <Notification
      v-for="(notification, index) in notifications"
      :key="index"
      :notification="notification"
      @click.native="removeNotification(index)"
      @dieOut="removeNotification(index)"
    ></Notification>
  </div>
</template>

<script>
import Notification from "./Notification";
export default {
  components: {
    Notification
  },
  props: {
    notifications: {
      type: Array,
      default: []
    }
  },
  methods: {
    removeNotification(i) {
      return this.$emit(
        "update:notifications",
        this.notifications.splice(i, 1)
      );
    }
  }
};
</script>

<style>
</style>