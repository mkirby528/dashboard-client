<template>
  <v-container class="grid">
    <draggable
      tag="v-row"
      :component-data="getComponentData()"
      class="grid-row d-flex"
    >
      <v-col class="grid-slot" cols="12" lg="6">
        <div>
          <SpotifyTopTracksWidget v-if="isSpotifyLinked" />
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            v-if="!isSpotifyLinked"
            type="paragraph@10"
          ></v-skeleton-loader></div
      ></v-col>
      <v-col class="grid-slot" cols="12" lg="6">
        <div>
          <SpotifyTopArtistsWidget v-if="isSpotifyLinked" />
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            v-if="!isSpotifyLinked"
            type="paragraph@10"
          ></v-skeleton-loader>
        </div>
      </v-col>
    </draggable>
  </v-container>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn;
    },
    user() {
      return this.$store.state.user.user;
    },
    isSpotifyLinked() {
      return this.$store.state.user.user.spotifyTokenData != undefined;
    },
  },
  methods: {
    handleChange() {
      console.log('changed');
    },
    inputChanged(value) {
      this.activeNames = value;
    },
    getComponentData() {
      return {
        on: {
          change: this.handleChange,
          input: this.inputChanged,
        },
        attrs: {
          // wrap: true,
        },
        props: {
          'no-gutters': true,
        },
      };
    },
  },
};
</script>

<style scoped>
.grid-slot {
  max-height: 85v;
  height: 100%;
  /* border: 2px solid slateblue; */
  overflow-y: scroll;
  padding: 10px;
}
@media only screen and (max-width: 600px) {
  .grid-slot {
    display: flex;
    flex-direction: column;
    max-width: 80vw;
    margin: auto;
    /* border: 2px solid red; */
  }
}

.grid-row {
  /* border: 2px solid lime; */
  overflow: auto;
  height: 100%;
  max-height: 100%;
  flex: 1;
}
.grid {
  /* border: 2px solid blueviolet; */
  height: 100%;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
}
</style>