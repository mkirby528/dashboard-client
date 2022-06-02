<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col xs="12" sm="6">
        <SpotifyTopTracksWidget />
      </v-col>
      <v-col xs="12" sm="6"> 1 </v-col>
    </v-row>
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
  },
}
</script>

<style>
</style>