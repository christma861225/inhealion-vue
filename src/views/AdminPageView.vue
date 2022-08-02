<template>
  <v-layout justify-center align-center>
    <AdminPageForm />
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AdminPageForm from "@/components/AdminPageForm.vue";

@Component({
  components: {
    AdminPageForm
  }
})
export default class AdminPageView extends Vue {}
</script>