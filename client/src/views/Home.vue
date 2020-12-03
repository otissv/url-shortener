<template>
  <div class="home">
    <h1>Welcome to URL Shortener</h1>
    <form :class="[$style.formUrl]">
      <vue-input
        classNames="flex-1"
        required
        :name="form.url.name"
        :label="form.url.label"
        :placeholder="form.url.placeholder"
        :value="form.url.value"
        :isValid="form.url.isValid"
        :errorMessage="form.url.errorMessage"
        @input="onUrlInput"
        @blur="onUrlBlur"
      />
      <vue-button classNames="flex-1" type="submit" @click="onSubmitClick">
        Get Short URL
      </vue-button>
    </form>
  </div>
</template>

<script lang="ts">
import VueInput from "@/components/VueInput.vue"
import VueButton from "@/components/VueButton.vue"
import isValidUrl from "@/utils/isValidUrl"
import { API_ADD_URL_ITEM } from "@/urls/constants.url"

export default {
  name: "Home",
  components: {
    VueInput,
    VueButton,
  },
  data() {
    return {
      form: {
        url: {
          name: "url",
          label: "URL",
          value: "",
          isValid: true,
          placeholder: "Enter URL",
          errorMessage: "URL is invalid",
        },
      },
    }
  },
  methods: {
    validate() {
      if (isValidUrl(this.form.url.value)) {
        return true
      } else {
        this.form.url.isValid = false
      }
    },
    onUrlInput(e: { target: { value: string } }) {
      this.form.url.value = e.target.value
      this.form.url.isValid = true
    },
    onUrlBlur() {
      this.validate()
    },
    onSubmitClick(e: Event) {
      e.preventDefault()

      if (this.validate()) {
        const data = {
          url: this.form.url.value,
        }

        this.$store.dispatch(API_ADD_URL_ITEM, data)
      }
    },
  },
}
</script>

<style module scoped>
.formUrl {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .formUrl {
    flex-direction: row;
  }
}
</style>
