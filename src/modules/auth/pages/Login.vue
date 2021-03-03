<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12"></v-card>
            <v-window v-model="step">
              <v-window-item :value="1">
                <v-row>
                  <v-col cols=12 md="8">
                    <v-card-text class="mt-12">
                      <h1 class="text-center display-2 light-blue--text text--accent-3">Sign in</h1>
                      
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
                          <v-btn type="submit" rounded color="light-blue darken-1" dark>SIGN IN</v-btn>
                        </div>
                      </v-form>
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" md="4" class="light-blue darken-1">
                    <v-card-text class="white--text mt-12">
                      <h1 class="text-center display-1">
                        Welcome, Friends!
                      </h1>
                      <h5 class="text-center">
                        Register to reserve a room
                      </h5>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn rounded outlined dark @click="step++">SIGN UP</v-btn> 
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
              <v-window-item :value="2">
                <v-row class="fill-height">
                  <v-col cols="12" md="4" class="light-blue darken-1">
                    <v-card-text class="white--text mt-12">  
                      <h5 class="text-center">To Keep connected with us please login</h5>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn rounded outlined dark @click="step--">SIGN IN</v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" md="8" >
                    <v-card-text class="mt-12">
                      <h1 class="text-center display-2 light-blue--text text--accent-3">Create Account</h1>
                      <v-form @submit.prevent="register()">
                        <v-text-field 
                        required
                        label="Name" 
                        name="Name" 
                        type="text" 
                        prepend-icon="person"
                        color="light-blue darken-1" />

                        <v-text-field 
                        required
                        label="Email" 
                        name="Email" 
                        type="text" 
                        prepend-icon="email"
                        color="light-blue darken-1" />

                        <v-text-field 
                        required
                        id="password"
                        label="Password" 
                        name="Password" 
                        prepend-icon="lock"
                        type="password" 
                        color="light-blue darken-1"
                         />
                      </v-form>
                    </v-card-text>
                    <div class="text-center mt-n5">
                      <v-btn rounded color="light-blue darken-1" dark>Create Account</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>

  export default {

    data: () => ({
      step:1,
      form: {
        email:'',
        password: ''
      }
    }),
    methods: {
      login () {
        console.log(this.form)
      }
    },
    props: {
      source: String
    }
  }
</script>