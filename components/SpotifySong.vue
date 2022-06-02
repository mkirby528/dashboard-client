<template>
  <v-card class="rounded-2 pa-0 ma-o" color="purple darken-4" dark>
    <v-row no-gutters class="d-flex justify-center">
      <v-col class="rank-col text-center" cols="12" lg="2" align-self="center">
        <v-avatar class="" color="primary" size="80"
          ><h1>{{ '#' + rank }}</h1></v-avatar
        >
      </v-col>
      <v-col cols="12" lg="8">
        <v-card-title v-text="shortenTitle(song.name)"></v-card-title>
        <v-card-subtitle v-text="song.artists[0].name"></v-card-subtitle>
      </v-col>
      <v-col class="img-col pa-3" cols="12" lg="2">
        <v-img max-height="125" contain :src="song.album.images[0].url"></v-img>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: ['song', 'rank'],
  methods: {
    shortenTitle(title) {
      if (title.length <= 45) {
        return title
      } else {
        return title.slice(0, 25) + '...'
      }
    },
  },
}
</script>

<style scoped>
.rank-col {
  /* border: 1px solid red !important; */
}
</style>