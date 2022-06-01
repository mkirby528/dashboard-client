<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" dense fixed app>
      <v-toolbar-title v-if="this.isLoggedIn">{{
        this.greetingString
      }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        elevation="2"
        color="primary"
        v-if="this.isLoggedIn"
        @click="this.logoutClicked"
        >Logout</v-btn
      >
      <nuxt-link class="mx-1" to="/login">
        <v-btn elevation="2" color="primary" v-if="!this.isLoggedIn"
          >Login</v-btn
        >
      </nuxt-link>

      <nuxt-link class="mx-1" to="/register">
        <v-btn elevation="2" color="primary" v-if="!this.isLoggedIn"
          >Register</v-btn
        >
      </nuxt-link>
      <v-btn class="ma-2" v-if="this.isLoggedIn" @click="drawer = true">
        <v-icon color="white"> fa-sliders</v-icon>
      </v-btn>
    </v-app-bar>
    <SettingsDrawer v-model="drawer"></SettingsDrawer>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn
    },
    user() {
      return this.$store.state.user.user
    },
    greetingString() {
      return `Hello ${this.user.firstName}!`
    },
  },
  async created() {
    const token = this.$cookies.get('jwt')
    if (token) {
      const config = {
        headers: {
          authorization: token,
        },
      }
      try {
        const profileResponse = await this.$axios.get('/profile', config)
        let userData = profileResponse.data.user
        delete userData.password
        delete userData.tokens
        this.login(userData)
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    ...mapMutations({
      login: 'user/login',
      logout: 'user/logout',
    }),
    async logoutClicked() {
      const token = this.$cookies.get('jwt')
      try {
        const config = {
          headers: {
            authorization: token,
          },
        }
        await this.$axios.post('/logout', {}, config)
        this.logout()
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
