<template>
  <div>
      <div>{{ this.isLoggedIn }}
      </div>
      <div>
          {{this.user}}
      </div>
  </div>

</template>

<script>
export default {

   computed: {
    isLoggedIn () {
      return this.$store.state.user.isLoggedIn
    },
    user(){
        return this.$store.state.user.user
    }
   }
}
</script>

<style>
</style>