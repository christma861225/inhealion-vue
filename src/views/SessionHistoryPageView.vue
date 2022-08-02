<template>
  <div style="width: 100%">
    <top-form :user-id="userId" />
    <v-tabs v-model="model" centered slider-color="primary">
      <v-tab :href="`#tab-1`">
        Sessions
      </v-tab>
      <v-tab :href="`#tab-2`">
        Scans
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="model">
      <v-tab-item :value="`tab-1`">
        <v-card flat>
          <history-form :user-id="userId" />
        </v-card>
      </v-tab-item>
      <v-tab-item :value="`tab-2`">
        <v-card flat>
          <scans-form :user-id="userId" />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserProfileTable from "@/components/UserProfileTable.vue";
import UserModule from "@/store/modules/user";
// import Tab from "@/components/Tab.vue";
import HistoryForm from "@/components/HistoryForm.vue";
import ScansForm from "@/components/ScansForm.vue";
import TopForm from "@/components/TopForm.vue";

@Component({
  components: { HistoryForm, UserProfileTable, TopForm, ScansForm }
})
export default class SessionHistoryPageView extends Vue {
  get canManageProfiles() {
    return UserModule.canManageProfiles;
  }

  get userId() {
    console.log(UserModule.user?.id);
    return UserModule.user?.id || null;
  }
  data() {
    return {
      model: "tab-2"
      // text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    };
  }
}
</script>
