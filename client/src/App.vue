<template>
  <div :class="[$style.nav]">
    <div :class="[$style.navItem]">
      <router-link to="/">Home</router-link>
    </div>
    <div :class="[$style.navItem]">
      <router-link to="/urls">URLs</router-link>
    </div>
  </div>
  <p
    v-if="notification.message"
    :class="[
      $style.notification,
      notification.type === 'ERROR' ? $style.error : $style.success,
    ]"
  >
    {{ notification.message }}
  </p>
  <div :class="[$style.main]">
    <router-view />
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex"

export default {
  name: "App",
  computed: {
    ...mapGetters(["notification"]),
  },
}
</script>

<style module scoped>
@import "./assets/styles/global.css";

.main {
  padding: var(--spacing-5);
}

.nav {
  display: flex;
  flex-direction: column;
}

.navItem {
  display: inline-block;
  padding: var(--spacing-2) var(--spacing-3);
}

p.notification {
  margin: var(--spacing-2) var(--spacing-5);
  padding: var(--spacing-4);
  border-radius: 3px;
}

.error {
  background: var(--error-200);
  color: var(--error-600);
}

.success {
  background: var(--action-200);
  color: var(--action-600);
}

@media (min-width: 768px) {
  .nav {
    flex-direction: row;
  }
}
</style>
