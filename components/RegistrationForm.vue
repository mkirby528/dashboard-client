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
      v-model="formData.email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      v-model="formData.firstName"
      counter
      :rules="usernameRules"
      label="First Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="formData.lastName"
      counter
      :rules="usernameRules"
      label="Last Name"
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
import { mapMutations } from 'vuex'

export default {
  data: () => ({
    formData: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
    valid: true,
    usernameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 30) || 'Name must be less than 30 characters',
    ],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],

    passwordRules: [(v) => !!v || 'password is required'],

    showPassword: false,
    checkbox: false,
  }),

  methods: { ...mapMutations({
      login: 'user/login'
    }),
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    async submit() {
      try {
        const response = await this.$axios.post('/register', this.formData)
        if (response.status === 201) {
          this.$toast('User Created!', {
            color: 'green',
            x: 'center',
          })
this.$cookies.set('jwt',response.data.user.tokens[0].token,1)
this.login(response.data.user)
this.$router.push({ path: '/home' })
        }
      } catch (err) {
        const errorResponse = err.response
        if (errorResponse.status === 409) {
          this.$toast('A user already exists with that username.', {
            color: 'red',
            x: 'center',
          })
        }
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>

<style>
</style>