<template >
  <v-card class="spotify-settings">
    <v-card-title class="grey darken-2">
      <h2>Spotify</h2>
      <v-icon class="mx-2" x-large color="white"> fa-brands fa-spotify</v-icon>
    </v-card-title>
    <v-card-actions class="green accent-4">
      <v-col>
        <h4 class="text-left my-4"
          >Status:
          <strong>{{
            this.isSpotifyLoggedIn ? 'linked' : 'unlinked'
          }}</strong></h4
        >
        <div>
          <v-btn v-if="!isSpotifyLoggedIn" @click="redirectToSpotifyLogin">
            Link Spotify</v-btn
          >
          <v-btn color="grey darken-4" v-if="isSpotifyLoggedIn" @click="unlinkSpotify"
            >Unlink Spotify</v-btn
          >
        </div>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    isSpotifyLoggedIn() {
      return this.$store.state.user.spotifyTokenData
    },
    async redirectToSpotifyLogin() {
      const token = this.$cookies.get('jwt')

      try {
        const config = {
          headers: {
            authorization: token,
          },
        }

        window.location.href = 'http://localhost:3000/spotify/login'
      } catch (err) {
        console.log(err)
      }
    },
    async unlinkSpotify() {
      /* Todo: implement unlink:
          1) create backend api route
          2) call api here and update store 
        */
    },
  },
}
</script>

<style scoped>
.spotify-settings {
  border: 2px solid magenta !important;
}
</style>