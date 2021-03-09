<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12"></v-card>
              <v-row>
                <v-col cols=12 md="8">
                  <v-card-text class="mt-12">
                    <h1 class="text-center display-2 light-blue--text text--accent-3">Login</h1>
                    
                    <v-form class="login" @submit.prevent="login()">
                      <v-text-field 
                      required
                      label="Email" 
                      name="email" 
                      type="text" 
                      prepend-icon="email"
                      color="light-blue darken-1"
                      v-model="form.email" />

                      <v-text-field 
                      required
                      id="password"
                      label="Password" 
                      name="Password" 
                      prepend-icon="lock"
                      type="password" 
                      color="light-blue darken-1"
                      v-model="form.password" />
                      <div class="tex-center mt-3">
                        <v-btn type="submit" rounded color="light-blue darken-1" dark>Login</v-btn>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-col>
                <v-col cols="12" md="4" class="light-blue darken-1">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1">
                      Bem vindo, Amigo!
                    </h1>
                    <h5 class="text-center">
                      Registre-se para reservar uma sala
                    </h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn :to="{ name: 'register' }" rounded outlined dark>Registre-se</v-btn> 
                  </div>
                </v-col>
              </v-row>
            
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
  import { mapActions } from 'vuex'

  export default {

    data: () => ({
      name: 'login',
      step:1,
      form: {
        email:'levibarbieri@gmail.com',
        password: 'q1w2e3r4'
      },
    }),
  
    methods: {
      ...mapActions('auth', ['ActionDoLogin']),

      async login () {

        try {
          await this.ActionDoLogin(this.form)
          this.$router.push({ name: 'schedules' })
        } catch (err) {
          alert('Erro ao fazer login')
        }
       
      },

    },
    props: {
      source: String
    }
  }
</script>