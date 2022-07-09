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
      color="purple indigo darken-4 "
      v-if="!isLoading"
    >
      <div
        elevation="24"
        class="
          widget-header
          d-flex
          flex-column
          align-center
          justify-end
          deep-purple
          darken-4
        "
      >
        <h1 class="text-center">Top Artists:</h1>
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
          v-for="(artist, index) in this.topArtists"
          v-bind:key="artist.id"
        >
          <v-col cols="12">
            <SpotifyArtist class="ma-4" :artist="artist" :rank="index + 1" />
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
      topArtists: [],
      time_range: 'short_term',
    };
  },
  computed: {
    isLoading() {
      return this.topArtists.length === 0;
    },
  },
  watch: {
    async time_range(newRange, oldRange) {
      const token = this.$cookies.get('jwt');

      if (newRange != oldRange) {
        this.topArtists = [];
        try {
          const config = {
            withCredentials: true,
            headers: {
              authorization: token,
            },
            params: { time_range: this.time_range },
          };
          let topTracksResponse = await this.$axios.get(
            '/api/spotify/topArtists',
            config
          );
          this.topArtists = topTracksResponse.data;
          console.log(this.topArtists);
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
        withCredentials: true,

        headers: {
          authorization: token,
        },
        params: { time_range: this.time_range },
      };
      let topArtistsReponse = await this.$axios.get(
        '/api/spotify/topArtists',
        config
      );
      this.topArtists = topArtistsReponse.data;
      console.log(this.topArtists);
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
}
.widget-header {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
}
.widget-content {
  overflow: auto;
}
</style>