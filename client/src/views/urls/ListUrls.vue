<template>
  <div class="list-utls">
    <table>
      <thead>
        <tr>
          <th>Short Url</th>
          <th>Url</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in urls" :key="item.shortUrlId">
          <td>{{ item.host }}/{{ item.shortUrlId }}</td>
          <td>{{ item.url }}</td>
          <td>
            <router-link :to="{ path: `/urls/${item._id}` }">Edit</router-link>
            <vue-button @click="() => deleteUrl(item._id)">Delete</vue-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex"
import VueButton from "@/components/VueButton.vue"
import { API_DELETE_URL_ITEM, API_FETCH_URLS } from "@/urls/constants.url"

export default {
  name: "ListUrls",

  components: {
    VueButton,
  },
  mounted() {
    this.$store.dispatch(API_FETCH_URLS)
  },
  computed: {
    ...mapGetters(["urls"]),
  },
  methods: {
    deleteUrl(id) {
      this.$store.dispatch(API_DELETE_URL_ITEM, id)
    },
  },
}
</script>
