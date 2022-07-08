<template>
  <v-card class="ynab-settings">
    <v-container>
      <v-row class="grey darken-2 pa-4" align="center" justify="center">
        <h2 class="mx-2">YNAB</h2>
        <img src="~/assets/ynab.png" height="40" />
      </v-row>
      <v-row class="blue accent-3">
        <v-col class="text-center">
          <div>
            <v-btn v-if="!this.isYNABLinked" @click="redirectToYNABLogin">
              Link YNAB</v-btn
            >
            <v-btn
              color="grey darken-4"
              v-if="this.isYNABLinked"
              @click="unlinkYNAB"
              >Unlink YNAB</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  computed: {
    isYNABLinked() {
      return this.$store.state.user.user.YNABTokenData != undefined;
    },
  },
  methods: {
    async redirectToYNABLogin() {
      window.location.href = `${process.env.baseURL}/ynab/login`;
    },
    async unlinkYNAB() {
      /* Todo: implement unlink:
          1) create backend api route
          2) call api here and update store 
        */
    },
  },
};
</script>

<style>
</style>