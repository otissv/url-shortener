<template>
  <button
    :class="[$style.vueButton, classNames]"
    @click="onClick"
    :disabled="disabled"
  >
    <span v-if="isLoading">Loading</span>
    <slot v-else />
  </button>
</template>

<script lang="ts">
export default {
  name: "VueButton",
  props: {
    classNames: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    isLoading: {
      type: Boolean,
      required: false,
    },
  },

  methods: {
    onClick(e: Event) {
      e.stopPropagation()
      if (this.disabled === false && this.isLoading === false) {
        this.$emit("click", e)
      }
    },
  },
}
</script>

<style module scoped>
.vueButton {
  display: inline-block;
  background-color: var(--action-600);
  border: 2px solid var(--action-600);
  color: white;
  cursor: pointer;
  font-size: inherit;
  line-height: var(--font-line-height-default);
  outline: var(--outline);
  overflow: visible;
  padding: var(--spacing-1) var(--spacing-3);
  position: relative;
  text-align: center;
  transition: all var(--ease-slow);
  vertical-align: middle;
  height: var(--spacing-6);
}
.vueButton:hover {
  background-color: var(--action-500);
}
.vueButton:active {
  background-color: var(--action-700);
  border: var(--outline-border);
}

.vueButton:focus {
  background-color: var(--action-700);
  border: var(--outline-border);
}
</style>
