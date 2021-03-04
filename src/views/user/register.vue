<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12"></v-card>

            <v-row class="fill-height">
              <v-col cols="12" md="4" class="light-blue darken-1">
                <v-card-text class="white--text mt-12">
                  <h5 class="text-center">
                    To Keep connected with us please login
                  </h5>
                </v-card-text>
                <div class="text-center">
                  <v-btn rounded outlined dark :to="{ name: 'login' }"
                    >SIGN IN</v-btn
                  >
                </div>
              </v-col>
              <v-col cols="12" md="8">
                <v-card-text class="mt-12">
                  <h1
                    class="text-center display-2 light-blue--text text--accent-3"
                  >
                    Create Account
                  </h1>
                  <v-form @submit.prevent="register()">
                    <v-text-field
                      required
                      label="Name"
                      name="Name"
                      type="text"
                      prepend-icon="person"
                      color="light-blue darken-1"
                      v-model="form.name"
                    />

                    <v-text-field
                      required
                      label="Email"
                      name="Email"
                      type="text"
                      prepend-icon="email"
                      color="light-blue darken-1"
                      v-model="form.email"
                    />

                    <v-text-field
                      required
                      id="password"
                      label="Password"
                      name="Password"
                      prepend-icon="lock"
                      type="password"
                      color="light-blue darken-1"
                      v-model="form.password"
                    />
                    <div class="text-center mt-n1">
                      <v-btn
                        type="subimit"
                        rounded
                        color="light-blue darken-1"
                        dark
                        >Create Account</v-btn
                      >
                    </div>
                  </v-form>
                </v-card-text>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    form: {
      email: "levibarbieri@gmail.com",
      password: "q1w2e3r4",
      name: "levi",
    },
  }),

  methods: {
    ...mapActions("user", ["ActionAddUser"]),

    async register() {
      try {
        await this.ActionAddUser(this.form);
        alert('cadastrado com Sucesso')
      } catch (err) {
        alert(err.data.email ? err.data.email : 'Não foi possível fazer login')
      }
    },
  },
};
</script>