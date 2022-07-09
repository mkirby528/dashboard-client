<template >
  <v-card class="spotify-settings">
    <v-container>
      <v-row class="grey darken-2 pa-4" align="center" justify="center">
        <h2 class="mx-2">Spotify</h2>
        <v-icon x-large color="white"> fa-brands fa-spotify</v-icon>
      </v-row>
      <v-row class="green accent-4">
        <v-col class="text-center">
          <!-- <h4 class="text-left my-4"
          >Status:
          <strong>{{
            this.isSpotifyLoggedIn ? 'linked' : 'unlinked'
          }}</strong></h4
        > -->
          <div>
            <v-btn v-if="!this.isSpotifyLinked" @click="redirectToSpotifyLogin">
              Link Spotify</v-btn
            >
            <v-btn
              color="grey darken-4"
              v-if="this.isSpotifyLinked"
              @click="unlinkSpotify"
              >Unlink Spotify</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
  computed: {
    isSpotifyLinked() {
      return this.$store.state.user.user.spotifyTokenData != undefined;
    },
  },
  methods: {
    ...mapMutations({
      logoutSpotify: 'user/logoutSpotify',
    }),
    async redirectToSpotifyLogin() {
      window.location.href = `${
        process.env.baseURL
      }/spotify/login/${encodeURIComponent(btoa(this.$cookies.get('jwt')))}`;
    },
    async unlinkSpotify() {
      const token = this.$cookies.get('jwt');

      const config = {
        withCredentials: true,

        headers: {
          authorization: token,
        },
      };
      try {
        const response = await axios.post('/api/spotify/logout', {}, config);
        if (response.status === 200) {
          this.logoutSpotify();
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.card-top {
  border: 1px solid red !important;
}
</style>