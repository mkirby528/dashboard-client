<template>
  <v-card rounded="xl" class="pa-0 ma-o song-card" color="indigo darken-3" dark>
    <v-row no-gutters justify-center class="fill-height">
      <v-col
        class="d-flex text-center align-center fill-height"
        cols="2"
        align-self="center"
      >
        <v-avatar
          class="rank-avatar"
          color="deep-purple darken-1 ma-2"
          size="64"
          ><h1>{{ '#' + rank }}</h1></v-avatar
        >
        <v-avatar
          class="rank-avatar-mini"
          color="deep-purple darken-1 ma-2"
          size="35"
          ><h1>{{ '#' + rank }}</h1></v-avatar
        >
      </v-col>
      <v-col align-self="center" class="flex-grow-1 text-left" cols="7">
        <v-tooltip class="title-tooltip" top>
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
      <v-col fill-height align-self="center" class="pa-1" cols="3">
        <v-img :src="song.album.images[0].url" class="album-cover"></v-img>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import SpotifyLogin from './SpotifyLogin.vue';
export default {
  components: { SpotifyLogin },
  props: ['song', 'rank'],
  methods: {
    shortenTitle(title) {
      if (title.length <= 45) {
        return title;
      } else {
        return title.slice(0, 25) + '...';
      }
    },
  },
};
</script>

<style scoped>
.title-tooltip {
  z-index: 999;
}
.song-card {
  height: 90%;
  justify-content: center;
}

.rank-avatar-mini {
  display: none;
}
.album-cover {
  border: 2px solid #e7e7e7;
  margin-right: 10px;
}

@media only screen and (max-width: 600px) {
  .rank-avatar {
    display: none;
  }
  .rank-avatar-mini {
    display: flex;
    font-size: 8px;
  }
}
</style>