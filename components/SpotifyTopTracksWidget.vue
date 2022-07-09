<template>
  <v-container class="widget">
    <div v-if="isLoading" class="text-center">
      <v-skeleton-loader
        class="mx-auto"
        max-width="300"
        type="paragraph@10"
      ></v-skeleton-loader>
    </div>
    <v-sheet
      class="widget-container"
      rounded
      raised
      color="purple indigo darken-4"
      v-if="!isLoading"
    >
      <div
        elevation="24"
        class="
          widget-header
          d-flex
          flex-column
          deep-purple
          darken-4
          align-center
        "
      >
        <h1 class="text-center">Top Tracks:</h1>
        <v-chip-group
          active-class="text-center font-weight-black deep-purple accent-4"
          v-model="time_range"
          mandatory
        >
          <v-chip value="short_term">Short</v-chip>
          <v-chip value="medium_term">Medium</v-chip>
          <v-chip value="long_term">Long</v-chip>
        </v-chip-group>
      </div>
      <div class="widget-content">
        <v-row
          no-gutters
          v-for="(s, index) in this.topTracks"
          v-bind:key="s.id"
        >
          <v-col cols="12">
            <SpotifySong class="ma-4" :song="s" :rank="index + 1" />
          </v-col>
        </v-row>
      </div>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      topTracks: [],
      time_range: 'short_term',
    };
  },
  computed: {
    isLoading() {
      return this.topTracks.length === 0;
    },
  },
  watch: {
    async time_range(newRange, oldRange) {
      const token = this.$cookies.get('jwt');

      if (newRange != oldRange) {
        this.topTracks = [];
        try {
          const config = {
            headers: {
              authorization: token,
            },
            params: { time_range: this.time_range },
            withCredentials: true,
          };
          let topTracksResponse = await this.$axios.get(
            '/api/spotify/topTracks',
            config
          );
          this.topTracks = topTracksResponse.data;
        } catch (err) {
          console.log(err);
        }
      } else {
        return;
      }
    },
  },
  async created() {
    const token = this.$cookies.get('jwt');
    try {
      const config = {
        headers: {
          authorization: token,
        },
        params: { time_range: this.time_range },
        withCredentials: true,
      };
      let topTracksResponse = await this.$axios.get(
        '/api/spotify/topTracks',
        config
      );
      this.topTracks = topTracksResponse.data;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style scoped>
.widget {
  padding: 10px;
  width: 100%;
  max-height: 100%;
}
widget-container {
  width: 100%;
  max-width: 100%;
  position: relative;

  max-height: 100%;
  border: 2px solid lime;
}
.widget-header {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
  border: 2px solid pink;
}
.widget-content {
  overflow: auto;
}
</style>