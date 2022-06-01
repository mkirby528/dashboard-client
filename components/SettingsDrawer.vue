<template>
  <v-navigation-drawer
    v-bind:value="value"
    v-on:input="$emit('input', $event)"
    absolute
    temporary
    right
  >
    <v-col>
      <SpotifyLogin class="m-4" />
      <br />
      <YNABLogin class="m-4" />
    </v-col>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style>
</style>