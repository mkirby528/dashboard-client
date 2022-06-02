<template>
  <v-container class="pa-1">
    <div v-if="isLoading" class="text-center">
      <v-skeleton-loader
        class="mx-auto"
        max-width="300"
        type="paragraph@10"
      ></v-skeleton-loader>
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
      </v-row>
      <v-row no-gutters class="title-row d-flex justify-center">
        <v-chip-group
          active-class="font-weight-black light-blue darken-4
 "
          v-model="time_range"
          mandatory
        >
          <v-chip value="short_term">Short</v-chip>
          <v-chip value="medium_term">Medium</v-chip>
          <v-chip value="long_term">Long</v-chip>
        </v-chip-group>
      </v-row>
      <v-divider dark />

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
      time_range: 'short_term',
    }
  },
  computed: {
    isLoading() {
      return this.topTracks.length === 0
    },
  },
  watch: {
    async time_range(newRange, oldRange) {
      const token = this.$cookies.get('jwt')

      if (newRange != oldRange) {
        this.topTracks = []
        try {
          const config = {
            headers: {
              authorization: token,
            },
            params: { time_range: this.time_range },
            withCredentials: true,
          }
          let topTracksResponse = await this.$axios.get(
            'spotify/topTracks',
            config
          )
          this.topTracks = topTracksResponse.data
          console.log(this.topTracks)
        } catch (err) {
          console.log(err)
        }
      } else {
        return
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