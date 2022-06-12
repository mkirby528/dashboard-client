<template>
  <v-container class="grid">
    <draggable
      tag="v-row"
      :component-data="getComponentData()"
      class="grid-row d-flex flex-column align-content-space-between"
    >
      <v-col class="grid-slot" cols="4">
        <div>
          <SpotifyTopTracksWidget v-if="isSpotifyLinked" />
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="paragraph@10"
          ></v-skeleton-loader></div
      ></v-col>
      <v-col class="grid-slot" cols="4">
        <div>
          <SpotifyTopTracksWidget v-if="isSpotifyLinked" />
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="paragraph@10"
          ></v-skeleton-loader>
        </div>
      </v-col>
      <v-col class="grid-slot" cols="4"><div>Howdy</div></v-col>
      <v-col class="grid-slot" cols="4"><div>Howdy</div></v-col>
      <v-col class="grid-slot" cols="4"><div>Howdy</div></v-col>
      <v-col class="grid-slot" cols="4"><div>Howdy</div></v-col>
      <v-col class="grid-slot" cols="4"><div>Howdy</div></v-col>
      <v-col class="grid-slot" cols="4"><div>Howdy</div></v-col>
      <v-col class="grid-slot" cols="4"><div>Howdy</div></v-col>
      <v-col class="grid-slot" cols="4"><div>Howdy</div></v-col>
      <v-col class="grid-slot" cols="4"><div>Howdy</div></v-col>
      <v-col class="grid-slot" cols="4"><div>Howdy</div></v-col>
    </draggable>
  </v-container>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn
    },
    user() {
      return this.$store.state.user.user
    },
    isSpotifyLinked() {
      return this.$store.state.user.user.spotifyTokenData != undefined
    },
  },
  methods: {
    handleChange() {
      console.log('changed')
    },
    inputChanged(value) {
      this.activeNames = value
    },
    getComponentData() {
      return {
        on: {
          change: this.handleChange,
          input: this.inputChanged,
        },
        attrs: {
          wrap: true,
        },
        props: {
          'no-gutters': true,
        },
      }
    },
  },
}
</script>

<style scoped>
.grid-slot {
  max-height: 40vh;
  /* border: 2px solid red; */
  overflow-y: auto;
  padding: 0px;
}
.grid-row {
  /* border: 2px solid purple; */
  overflow: auto;
  height: 100%;
  max-height: 100%;
}
.grid {
  /* border: 2px solid blueviolet; */
  height: 100%;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
}
</style>