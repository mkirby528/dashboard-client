<template>
  <v-card class="pa-4">
    <div v-if="this.isLoading" class="text-center">
      <p>Loading...</p>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <v-container v-if="!this.isLoading">
      <v-row>
        <h3>Spotify</h3>
      </v-row>
      <v-row>
        <v-btn color="primary" @click="loadSpotifyData">Load Data...</v-btn>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  computed: {
    isLoading() {
      const user = this.$store.state.user.user
      if (!user) {
        return true
      } else {
        return Object.keys(user).length === 0
      }
    },
  },
  methods: {
    async loadSpotifyData() {
      const token = this.$cookies.get('jwt')
      try {
        const config = {
          headers: {
            authorization: token,
          },
          params: {time_range: 'long_term'},
          withCredentials: true,
        }
        let topTracks = await this.$axios.get('spotify/topTracks', config)
        console.log(topTracks)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style scoped>
</style>