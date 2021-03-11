
<template>
  
    <v-card color="grey lighten-5" flat tile>
      <v-toolbar dense>
        <v-toolbar-title>Reserva de Sala</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu bottom min-width="200px" rounded offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon x-large v-on="on" size="30">
              <v-avatar>
                <v-icon> mdi-account-circle </v-icon>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar>
                  <v-icon size="50"> mdi-account-circle </v-icon>
                </v-avatar>
                <h3>{{ user.name }}</h3>
                <p class="caption mt-1">
                  {{ user.email }}
                </p>

                <v-divider class="my-3"></v-divider>
                <v-btn  @click="close()" depressed rounded text> Sair </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </v-toolbar>
    </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    computed: {
        ...mapState("auth", ["user"]),    
    },
    methods: {
      ...mapActions("auth", ["ActionSignOut"]),


      async close() {

        try {

          await this.ActionSignOut();
          this.$router.push({ name: "login" });
           
        } catch (error) {
          alert('Erro ao sair')
        }
      
      }
    },

    
}
</script>