<template>
    <v-container>
     <v-row>
<v-col>
1
</v-col>
<v-col>
2
</v-col>
 <v-col>
3
</v-col>
</v-row>
  </v-container>
 

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