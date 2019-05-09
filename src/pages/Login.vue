<template>
  <div class="container">
    <h1 class="text-center">Login</h1>
    <hr class="my-4">
    <b-alert variant="danger" fade :show="alerts.error != null" @dismissed="alerts.error=null">
      <span v-html="alerts.error"></span>
    </b-alert>
    <b-form @submit="submitLogin">
      <b-form-group label="Your Username : " label-for="usernameLogin">
        <b-form-input
          id="usernameLogin"
          type="text"
          v-model="input.username"
          required
          placeholder="Username"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Your Password : " label-for="passwordLogin">
        <b-form-input
          id="passwordLogin"
          type="password"
          v-model="input.password"
          required
          placeholder="Password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>

<script>
import { loginAPI } from '@/services/api'

export default {
  name: 'Login',
  data () {
    return {
      input: {
        username: '',
        password: ''
      },
      alerts: {
        error: null
      }
    }
  },
  methods: {
    submitLogin (evt) {
      evt.preventDefault()
      if (this.checkInputs()) {
        const username = this.input.username
        loginAPI(username, this.input.password)
          .then(res => {
            this.$emit('login', username, res.data.token)
            this.$router.replace('home')
          })
          .catch(error => {
            this.alerts.error = error.msg
          })
      }
    },
    checkInputs () {
      if (this.input.username === '' || this.input.password === '') {
        this.alerts.error = "Username or Password can't be <b>empty</b>"
        return false
      }
      return true
    }
  },
  components: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
