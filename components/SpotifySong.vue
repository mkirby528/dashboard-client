<template>
  <v-card rounded="xl" class="pa-0 ma-o" color="blue-grey darken-3" dark>
    <v-row no-gutters justify-center>
      <v-col
        class="flex-grow-0 flex-shrink-0 text-center"
        cols="12"
        lg="2"
        align-self="center"
      >
        <v-avatar
          class=""
          color="blue-grey darken-1
"
          size="80"
          ><h1>{{ '#' + rank }}</h1></v-avatar
        >
      </v-col>
      <v-col align-self="center" class="text-left" cols="12" lg="7">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-card-title
              v-bind="attrs"
              v-on="on"
              class="d-block text-truncate"
              v-text="song.name"
            ></v-card-title
          ></template>
          <span>{{ song.name }}</span>
        </v-tooltip>
        <v-card-subtitle
          class="mt-n8"
          v-text="song.artists[0].name"
        ></v-card-subtitle>
      </v-col>
      <v-col align-self="center" class="pa-1" cols="12" lg="3">
        <v-avatar right tile class="rounded-lg album-avatar" size="100">
          <v-img :src="song.album.images[0].url"></v-img>
        </v-avatar>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import SpotifyLogin from './SpotifyLogin.vue'
export default {
  components: { SpotifyLogin },
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
/* div[class^='col-'],
div[class*=' col-'] {
  border: 2px solid black;
} */
.album-avatar {
  border: 2px solid black;
}
</style>