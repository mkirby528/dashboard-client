<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" dense fixed app>
      <div v-if="this.isLoggedIn">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-toolbar-title v-on="on"> {{ greetingString }}</v-toolbar-title>
          </template>
          <span>{{ greetingLanguage }}</span>
        </v-tooltip>
      </div>
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
      <v-container class="content">
        <Nuxt v-if="this.isLoggedIn" />
        <div v-if="!this.isLoggedIn">Please log in!</div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      greeting: '',
      greetingLanguage: '',
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn;
    },
    user() {
      return this.$store.state.user.user;
    },
    greetingString() {
      return `${this.greeting} ${this.user.firstName}!`;
    },
  },
  async created() {
    const token = this.$cookies.get('jwt');
    if (token) {
      const config = {
        headers: {
          authorization: token,
        },
      };
      try {
        const greetingResponse = await this.$axios.get(
          'https://www.greetingsapi.com/random'
        );
        this.greeting = greetingResponse.data.greeting;
        this.greetingLanguage = greetingResponse.data.language;

        const profileResponse = await this.$axios.get('/api/profile', config);
        let userData = profileResponse.data.user;
        delete userData.password;
        delete userData.tokens;
        this.login(userData);
      } catch (err) {
        console.log(err);
      }
    }
  },
  methods: {
    ...mapMutations({
      login: 'user/login',
      logout: 'user/logout',
    }),
    async logoutClicked() {
      const token = this.$cookies.get('jwt');
      try {
        const config = {
          headers: {
            authorization: token,
          },
        };
        await this.$axios.post('/api/logout', {}, config);
        this.logout();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style scoped>
.content {
  overflow: auto;
  max-height: 100%;
  height: 100%;
  align-items: start;
  width: 100%;
  max-width: 100%;
  /* border: 2px solid lime; */
}
</style>
