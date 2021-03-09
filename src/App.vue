<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer dark padless>
      <v-card class="flex text-center" flat tile>
        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>Reserva de Sala</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  
  components: {},

  data: () => ({
    //
  }),
  mounted() {
    this.ActionShowSchedules();
  },
  
  methods: {
    ...mapActions("schedules", [
      "ActionShowSchedules"]),

  },
};
</script>
