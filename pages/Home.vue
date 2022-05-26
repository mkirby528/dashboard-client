<template>
  <div><div>{{ this.isloggedIn }}
      </div>
      <div>
          {{this.user}}
      </div>
  </div>

</template>

<script>
export default {
//   asyncComputed: {
//      async loggedIn() {
//       const token = this.$cookies.get('jwt')
//       if (!token) {
//         return false
//       } else {
//         const config = {
//           headers: {
//             authorization: token,
//           },
//         }
//         try{
//         const response = await this.$axios.get('/profile',config)
//             return response.status === 200;
//         }
//         catch(err){
//             return false
//         }
//       }
//     },
//   },
   computed: {
    isloggedIn () {
      return this.$store.state.user.loggedIn
    },
    user(){
        return this.$store.state.user.user
    }
   }
}
</script>

<style>
</style>