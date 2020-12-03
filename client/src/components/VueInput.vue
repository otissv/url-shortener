<template>
  <div :class="[$style.vueInput, classNames]">
    <label :class="[$style.vueInputLable]" :for="name" v-if="label"
      >{{ label }}<sup v-if="required">*</sup></label
    >
    <div>
      <input
        :class="[$style.vueInputControl]"
        :name="name"
        :id="name"
        :required="required"
        :value="value"
        :type="type"
        :autocomplete="type"
        :disabled="disabled"
        :placeholder="placeholder"
        :readonly="readonly"
        @input="onInput"
        @blur="onBlur"
        :aria-label="name"
      />

      <p :class="[$style.vueInputError]" v-if="invalid">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "VueInput",
  props: {
    name: {
      type: String,
      required: true,
    },
    classNames: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    value: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "text",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: "",
    },
  },
  computed: {
    invalid() {
      return !this.isValid
    },
  },
  methods: {
    onInput(e: { target: { value: string } }): void {
      this.$emit("input", e)
    },
    onBlur(e: { target: { value: string } }): void {
      this.$emit("blur", e)
    },
  },
}
</script>

<style module scoped>
.vueInput {
  display: flex;
  flex-direction: column;
}

.vueInputLable,
.vueInputControl {
  margin-bottom: var(--spacing-4);
}

.vueInputControl {
  -webkit-appearance: none;
  display: inline-block;
  background: var(--grey-100);
  border: 2px solid var(--grey-100);
  color: var(--text-color);
  font-size: var(--font-size-default);
  line-height: var(--font-line-height-default);
  overflow: visible;
  padding: var(--spacing-1) var(--spacing-3);
  transition: all var(--ease-slow);
  vertical-align: bottom;
  height: var(--spacing-6);
  outline: var(--outline);
  flex: 1;
  width: 100%;
}

.vueInputControl:hover {
  background-color: var(--grey-300);
}
.vueInputControl:active {
  background-color: var(--grey-200);
  border: var(--outline-border);
}

.vueInputControl:focus {
  background-color: var(--grey-200);
  border: var(--outline-border);
}

.vueInputError {
  color: var(--error-600);
  margin-top: var(--spacing-1);
  margin-bottom: var(--spacing-1);
}

input[type="text"]:disabled {
  background-color: transparent;
  border: 2px solid transparent;
}

@media (min-width: 768px) {
  .vueInput {
    flex-direction: row;
  }

  .vueInputLable {
    margin-right: var(--spacing-3);
  }
}
</style>
