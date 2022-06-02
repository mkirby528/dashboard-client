<template>
  <v-container class="pa-1">
    <div v-if="isLoading" class="text-center">
      <p>Loading...</p>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <v-sheet
      rounded
      raided
      color="blue-grey darken-4"
      fill-height
      fluid
      v-if="!isLoading"
    >
      <v-row no-gutters class="title-row d-flex flex-column justify-center">
        <h1 class="text-center">Top Tracks:</h1>
        <v-divider />
      </v-row>
      <v-row no-gutters v-for="(s, index) in this.topTracks" v-bind:key="s.id">
        <v-col cols="12">
          <SpotifySong class="ma-4" :song="s" :rank="index + 1" />
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      topTracks: [],
      time_range: 'long_term',
    }
  },
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
  async created() {
    const token = this.$cookies.get('jwt')
    try {
      const config = {
        headers: {
          authorization: token,
        },
        params: { time_range: this.time_range },
        withCredentials: true,
      }
      let topTracksResponse = await this.$axios.get('spotify/topTracks', config)
      this.topTracks = topTracksResponse.data
      console.log(this.topTracks)
    } catch (err) {
      console.log(err)
    }
  },
}
</script>

<style scoped>
.title-row {
  /* border: 2px solid red; */
}
</style>