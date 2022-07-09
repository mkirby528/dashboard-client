<template>
  <v-container class="widget">
    <div v-if="isLoading" class="text-center">
      <v-skeleton-loader
        class="mx-auto"
        max-width="300"
        type="paragraph@10"
      ></v-skeleton-loader>
    </div>
    <div class="widget-container" v-if="!isLoading">
      <div class="widget-header">
        <h1 class="text-center">Now Playing</h1>
      </div>
      <div class="widget-content">
        <v-row class="top-row no-gutters pa-4" v-if="isPlaying">
          <v-col cols="3">
            <v-img
              :src="nowPlayingData.item.album.images[0].url"
              class="album-cover"
            ></v-img>
          </v-col>
          <v-col align-self="center" class="flex-grow-1 text-left" cols="9">
            <v-tooltip class="title-tooltip" top>
              <template v-slot:activator="{ on, attrs }">
                <v-card-title
                  v-bind="attrs"
                  v-on="on"
                  class="d-block text-truncate"
                  v-text="nowPlayingData.item.name"
                ></v-card-title
              ></template>
              <span>{{ nowPlayingData.item.name }}</span>
            </v-tooltip>
            <v-card-subtitle
              class="mt-n8"
              v-text="nowPlayingData.item.artists[0].name"
            ></v-card-subtitle>
          </v-col>
        </v-row>
        <v-row class="bot-row no-gutters">
          <v-col cols="10" class="ma-0 pa-0 now-playing-col">
            <div class="wave-container" v-if="this.isPlaying">
              <span :key="i" v-for="i in 75"></span>
            </div>
          </v-col>
          <v-col cols="2" class="now-playing-col">
            <v-icon
              x-large
              class="pause-button"
              v-if="this.isPlaying"
              @click="pauseButtonClicked"
              >fa-solid fa-circle-pause</v-icon
            >
            <v-icon
              x-large
              class="play-button"
              v-if="!this.isPlaying"
              @click="playButtonClicked"
              >fa-solid fa-circle-play</v-icon
            >
          </v-col>
        </v-row>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      nowPlayingData: {},
      isPlaying: false,
    };
  },
  computed: {
    isLoading() {
      return JSON.stringify(this.nowPlayingData) === '{}';
    },
  },
  methods: {
    async loadNowPlayingData() {
      const token = this.$cookies.get('jwt');
      try {
        const config = {
          headers: {
            authorization: token,
          },
          params: { time_range: this.time_range },
          withCredentials: true,
        };
        const nowPlayingResponse = await this.$axios.get(
          '/apispotify/nowPlaying',
          config
        );
        this.nowPlayingData = nowPlayingResponse.data;
        this.isPlaying = this.nowPlayingData?.is_playing;
        console.log(this.nowPlayingResponse);
      } catch (err) {
        console.log(err);
      }
    },

    pauseButtonClicked() {
      const token = this.$cookies.get('jwt');
      try {
        const config = {
          headers: {
            authorization: token,
          },
          withCredentials: true,
        };
        this.$axios.put('/api/spotify/pause', {}, config);
        this.isPlaying = false;
      } catch (err) {
        console.log(err);
      }
    },
    playButtonClicked() {
      const token = this.$cookies.get('jwt');
      try {
        const config = {
          headers: {
            authorization: token,
          },
          withCredentials: true,
        };
        this.$axios.put('/api/spotify/play', {}, config);
        this.isPlaying = true;
        this.loadNowPlayingData();
      } catch (err) {
        console.log(err);
      }
    },
  },

  async created() {
    this.loadNowPlayingData();
    setInterval(this.loadNowPlayingData, 1000);
  },
};
</script>

<style scoped>
.widget {
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  height: 100%;
  max-height: 100%;
}
.widget-container {
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
}
.widget-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background-color: #311b92;
  padding-left: 5px;
  height: 20%;
  max-height: 20%;
}
.widget-content {
  min-height: 50%;
  height: 80%;
  max-height: 80%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  background-color: #1a237e;
  /* border: 2px solid yellow; */
}
.top-row {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  max-width: 100%;
  min-height: 50%;
  height: 60%;
  max-height: 80%;
  /* border: 2px solid red;  */
  overflow: hidden;
  background-color: #283593;
  margin-bottom: 20px;
  padding-left: 5px;
  border-radius: 5px;
}
.album-cover {
  border: 2px solid #e7e7e7;
}
.bot-row {
  width: 100%;
  min-height: 30%;
  height: 30%;
  max-width: 100%;
  max-height: 30%;
  justify-content: flex-start;
  align-content: flex-start;
  margin-top: auto;
  /* border: 2px solid red; */
  background-color: #283593;
}
.now-playing-col {
  height: 100%;
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  /* border: 2px solid magenta; */
}
.pause-button > *:focus,
.play-button > *:focus {
  background-color: transparent;
  opacity: 50%;
}
.wave-container {
  position: relative;
  height: 80%;
  max-height: 100%;
  overflow-x: hidden;
  max-width: 100%;
  width: 100%;
  /* border: 2px solid red; */
}
.wave-container span {
  display: block;
  bottom: 10%;
  width: 5px;
  height: 10px;
  background: #8c9eff;
  position: absolute;
  -webkit-animation: audio-wave 2s infinite ease-in-out;
  animation: audio-wave 2s infinite ease-in-out;
}
.wave-container span:nth-child(1) {
  left: 6px;
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.wave-container span:nth-child(2) {
  left: 12px;
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
}
.wave-container span:nth-child(3) {
  left: 18px;
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
}
.wave-container span:nth-child(4) {
  left: 24px;
  -webkit-animation-delay: 1.2s;
  animation-delay: 1.2s;
}
.wave-container span:nth-child(5) {
  left: 30px;
  -webkit-animation-delay: 1.5s;
  animation-delay: 1.5s;
}
.wave-container span:nth-child(6) {
  left: 36px;
  -webkit-animation-delay: 1.8s;
  animation-delay: 1.8s;
}
.wave-container span:nth-child(7) {
  left: 42px;
  -webkit-animation-delay: 2.1s;
  animation-delay: 2.1s;
}
.wave-container span:nth-child(8) {
  left: 48px;
  -webkit-animation-delay: 2.4s;
  animation-delay: 2.4s;
}
.wave-container span:nth-child(9) {
  left: 54px;
  -webkit-animation-delay: 2.7s;
  animation-delay: 2.7s;
}
.wave-container span:nth-child(10) {
  left: 60px;
  -webkit-animation-delay: 3s;
  animation-delay: 3s;
}
.wave-container span:nth-child(11) {
  left: 66px;
  -webkit-animation-delay: 3.3s;
  animation-delay: 3.3s;
}
.wave-container span:nth-child(12) {
  left: 72px;
  -webkit-animation-delay: 3.6s;
  animation-delay: 3.6s;
}
.wave-container span:nth-child(13) {
  left: 78px;
  -webkit-animation-delay: 3.9s;
  animation-delay: 3.9s;
}
.wave-container span:nth-child(14) {
  left: 84px;
  -webkit-animation-delay: 4.2s;
  animation-delay: 4.2s;
}
.wave-container span:nth-child(15) {
  left: 90px;
  -webkit-animation-delay: 4.5s;
  animation-delay: 4.5s;
}
.wave-container span:nth-child(16) {
  left: 96px;
  -webkit-animation-delay: 4.8s;
  animation-delay: 4.8s;
}
.wave-container span:nth-child(17) {
  left: 102px;
  -webkit-animation-delay: 5.1s;
  animation-delay: 5.1s;
}
.wave-container span:nth-child(18) {
  left: 108px;
  -webkit-animation-delay: 5.399999999999999s;
  animation-delay: 5.399999999999999s;
}
.wave-container span:nth-child(19) {
  left: 114px;
  -webkit-animation-delay: 5.7s;
  animation-delay: 5.7s;
}
.wave-container span:nth-child(20) {
  left: 120px;
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
.wave-container span:nth-child(21) {
  left: 126px;
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.wave-container span:nth-child(22) {
  left: 132px;
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
}
.wave-container span:nth-child(23) {
  left: 138px;
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
}
.wave-container span:nth-child(24) {
  left: 144px;
  -webkit-animation-delay: 1.2s;
  animation-delay: 1.2s;
}
.wave-container span:nth-child(25) {
  left: 150px;
  -webkit-animation-delay: 1.5s;
  animation-delay: 1.5s;
}
.wave-container span:nth-child(26) {
  left: 156px;
  -webkit-animation-delay: 1.8s;
  animation-delay: 1.8s;
}
.wave-container span:nth-child(27) {
  left: 162px;
  -webkit-animation-delay: 2.1s;
  animation-delay: 2.1s;
}
.wave-container span:nth-child(28) {
  left: 168px;
  -webkit-animation-delay: 2.4s;
  animation-delay: 2.4s;
}
.wave-container span:nth-child(29) {
  left: 174px;
  -webkit-animation-delay: 2.7s;
  animation-delay: 2.7s;
}
.wave-container span:nth-child(30) {
  left: 180px;
  -webkit-animation-delay: 3s;
  animation-delay: 3s;
}
.wave-container span:nth-child(31) {
  left: 186px;
  -webkit-animation-delay: 3.3s;
  animation-delay: 3.3s;
}
.wave-container span:nth-child(32) {
  left: 192px;
  -webkit-animation-delay: 3.6s;
  animation-delay: 3.6s;
}
.wave-container span:nth-child(33) {
  left: 198px;
  -webkit-animation-delay: 3.9s;
  animation-delay: 3.9s;
}
.wave-container span:nth-child(34) {
  left: 204px;
  -webkit-animation-delay: 4.2s;
  animation-delay: 4.2s;
}
.wave-container span:nth-child(35) {
  left: 210px;
  -webkit-animation-delay: 4.5s;
  animation-delay: 4.5s;
}
.wave-container span:nth-child(36) {
  left: 216px;
  -webkit-animation-delay: 4.8s;
  animation-delay: 4.8s;
}
.wave-container span:nth-child(37) {
  left: 222px;
  -webkit-animation-delay: 5.1s;
  animation-delay: 5.1s;
}
.wave-container span:nth-child(38) {
  left: 228px;
  -webkit-animation-delay: 5.399999999999999s;
  animation-delay: 5.399999999999999s;
}
.wave-container span:nth-child(39) {
  left: 234px;
  -webkit-animation-delay: 5.7s;
  animation-delay: 5.7s;
}
.wave-container span:nth-child(40) {
  left: 240px;
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
.wave-container span:nth-child(41) {
  left: 246px;
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.wave-container span:nth-child(42) {
  left: 252px;
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
}
.wave-container span:nth-child(43) {
  left: 258px;
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
}
.wave-container span:nth-child(44) {
  left: 264px;
  -webkit-animation-delay: 1.2s;
  animation-delay: 1.2s;
}
.wave-container span:nth-child(45) {
  left: 270px;
  -webkit-animation-delay: 1.5s;
  animation-delay: 1.5s;
}
.wave-container span:nth-child(46) {
  left: 276px;
  -webkit-animation-delay: 1.8s;
  animation-delay: 1.8s;
}
.wave-container span:nth-child(47) {
  left: 282px;
  -webkit-animation-delay: 2.1s;
  animation-delay: 2.1s;
}
.wave-container span:nth-child(48) {
  left: 288px;
  -webkit-animation-delay: 2.4s;
  animation-delay: 2.4s;
}
.wave-container span:nth-child(49) {
  left: 294px;
  -webkit-animation-delay: 2.7s;
  animation-delay: 2.7s;
}
.wave-container span:nth-child(50) {
  left: 300px;
  -webkit-animation-delay: 3s;
  animation-delay: 3s;
}
.wave-container span:nth-child(51) {
  left: 306px;
  -webkit-animation-delay: 3.3s;
  animation-delay: 3.3s;
}
.wave-container span:nth-child(52) {
  left: 312px;
  -webkit-animation-delay: 3.6s;
  animation-delay: 3.6s;
}
.wave-container span:nth-child(53) {
  left: 318px;
  -webkit-animation-delay: 3.9s;
  animation-delay: 3.9s;
}
.wave-container span:nth-child(54) {
  left: 324px;
  -webkit-animation-delay: 4.2s;
  animation-delay: 4.2s;
}
.wave-container span:nth-child(55) {
  left: 330px;
  -webkit-animation-delay: 4.5s;
  animation-delay: 4.5s;
}
.wave-container span:nth-child(56) {
  left: 336px;
  -webkit-animation-delay: 4.8s;
  animation-delay: 4.8s;
}
.wave-container span:nth-child(57) {
  left: 342px;
  -webkit-animation-delay: 5.1s;
  animation-delay: 5.1s;
}
.wave-container span:nth-child(58) {
  left: 348px;
  -webkit-animation-delay: 5.399999999999999s;
  animation-delay: 5.399999999999999s;
}
.wave-container span:nth-child(59) {
  left: 354px;
  -webkit-animation-delay: 5.7s;
  animation-delay: 5.7s;
}
.wave-container span:nth-child(60) {
  left: 360px;
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
.wave-container span:nth-child(61) {
  left: 366px;
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.wave-container span:nth-child(62) {
  left: 372px;
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
}
.wave-container span:nth-child(63) {
  left: 378px;
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
}
.wave-container span:nth-child(64) {
  left: 384px;
  -webkit-animation-delay: 1.2s;
  animation-delay: 1.2s;
}
.wave-container span:nth-child(65) {
  left: 390px;
  -webkit-animation-delay: 1.5s;
  animation-delay: 1.5s;
}
.wave-container span:nth-child(66) {
  left: 396px;
  -webkit-animation-delay: 1.8s;
  animation-delay: 1.8s;
}
.wave-container span:nth-child(67) {
  left: 402px;
  -webkit-animation-delay: 2.1s;
  animation-delay: 2.1s;
}
.wave-container span:nth-child(68) {
  left: 408px;
  -webkit-animation-delay: 2.4s;
  animation-delay: 2.4s;
}
.wave-container span:nth-child(69) {
  left: 414px;
  -webkit-animation-delay: 2.7s;
  animation-delay: 2.7s;
}
.wave-container span:nth-child(70) {
  left: 420px;
  -webkit-animation-delay: 3s;
  animation-delay: 3s;
}
.wave-container span:nth-child(71) {
  left: 426px;
  -webkit-animation-delay: 3.3s;
  animation-delay: 3.3s;
}
.wave-container span:nth-child(72) {
  left: 432px;
  -webkit-animation-delay: 3.6s;
  animation-delay: 3.6s;
}
.wave-container span:nth-child(73) {
  left: 438px;
  -webkit-animation-delay: 3.9s;
  animation-delay: 3.9s;
}
.wave-container span:nth-child(74) {
  left: 444px;
  -webkit-animation-delay: 4.2s;
  animation-delay: 4.2s;
}
.wave-container span:nth-child(75) {
  left: 450px;
  -webkit-animation-delay: 4.5s;
  animation-delay: 4.5s;
}
@-webkit-keyframes audio-wave {
  0% {
    height: 15px;
    transform: translateY(0px);
  }
  25% {
    height: 60px;
    transform: translateY(20px);
  }
  50% {
    height: 15px;
    transform: translateY(0px);
  }
  100% {
    height: 10px;
    transform: translateY(0px);
  }
}
@keyframes audio-wave {
  0% {
    height: 15px;
    transform: translateY(0px);
  }
  25% {
    height: 60px;
    transform: translateY(20px);
  }
  50% {
    height: 15px;
    transform: translateY(0px);
  }
  100% {
    height: 10px;
    transform: translateY(0px);
  }
}
</style>