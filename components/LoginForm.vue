<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="formData.username"
      counter
      :rules="usernameRules"
      label="Username"
      required
    ></v-text-field>

    <v-text-field
      v-model="formData.password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      name="password-input"
      :rules="passwordRules"
      label="Password"
      counter
      @click:append="showPassword = !showPassword"
      required
    ></v-text-field>

    <v-btn color="error" class="mr-4" @click="reset"> Reset </v-btn>
    <v-btn color="success" class="mr-4" @click="submit"> Submit </v-btn>
  </v-form>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data: () => ({
    formData: {
      username: '',
      password: '',
    },
    valid: true,
    usernameRules: [(v) => !!v || 'Name is required'],

    passwordRules: [(v) => !!v || 'password is required'],

    showPassword: false,
  }),

  methods: {
    ...mapMutations({
      login: 'user/login',
    }),
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    async submit() {
      try {
        const response = await this.$axios.post('/login', this.formData);
        if (response.status < 400) {
          // this.$toast('Logged In!', {
          //   color: 'green',
          //   x: 'center',
          // });

          this.$cookies.set('jwt', response.data.token, { maxAge: 3600 });

          const config = {
            headers: {
              authorization: response.data.token,
            },
          };
          const profileResponse = await this.$axios.get('/profile', config);
          let userData = profileResponse.data.user;
          delete userData.password;
          this.login(userData);
          this.$router.push({ path: '/home' });
        }
      } catch (err) {
        console.log(err);
        const errorResponse = err.response;
        if (errorResponse.status >= 400) {
          this.$toast('Invalid Login Credentials!', {
            color: 'red',
            x: 'center',
          });
        }
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style>
</style>