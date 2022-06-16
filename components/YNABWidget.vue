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
      color="blue-grey darken-4 "
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
        Widget Header
      </div>
      <div class="widget-content">Widget Content</div>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      data: [],
    };
  },
  computed: {
    isLoading() {
      return this.data.length === 0;
    },
  },
  watch: {},
  async created() {
    const token = this.$cookies.get('jwt');
    try {
      const config = {
        headers: {
          authorization: token,
        },
        withCredentials: true,
      };
      let ynabResponse = await this.$axios.get('ynab/test', config);
      this.data = ynabResponse.data;
      console.log(this.data);
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
  z-index: 99;
}
.widget-content {
  overflow: auto;
}
</style>