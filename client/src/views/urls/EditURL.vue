<template>
  <div class="list-utls">
    <h1>Edit Url</h1>

    <form :class="[$style.formEditUrl]">
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

      <vue-button :class="urlSubmitButton" type="submit" @click="onSubmitClick">
        Save URL
      </vue-button>
    </form>
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex"
import VueInput from "@/components/VueInput.vue"
import VueButton from "@/components/VueButton.vue"
import isValidUrl from "@/utils/isValidUrl"
import { API_FETCH_URL_ITEM, API_UPDATE_URL_ITEM } from "@/urls/constants.url"

export default {
  name: "Edit Url",
  components: {
    VueInput,
    VueButton,
  },
  mounted() {
    this.$store.dispatch(API_FETCH_URL_ITEM, this.id)
  },
  computed: {
    ...mapGetters(["getUrlItemById"]),
    id() {
      return this.$route.params.id
    },
  },

  methods: {
    validate() {
      if (isValidUrl(this.form.url.value)) {
        this.form.url.isValid = true
        return this.form.url.isValid
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
          id: this.id,
          url: this.form.url.value,
        }

        this.$store.dispatch(API_UPDATE_URL_ITEM, data)
      }
    },
  },
  data() {
    const currentItem = this.$store.getters.getUrlItemById(
      this.$route.params.id
    )

    return {
      form: {
        url: {
          name: "url",
          label: "URL",
          value: currentItem.url,
          isValid: true,
          placeholder: "Enter URL",
          errorMessage: "URL is invalid",
        },
      },
    }
  },
}
</script>

<style module>
.formEditUrl {
}

.formUrlInput input {
  display: block;
}
</style>
