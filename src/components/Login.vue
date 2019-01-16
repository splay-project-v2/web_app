<template>
  <div class="container">
    <h1 class="text-center">Login</h1>
    <b-alert variant="danger" fade :show="alerts.error != null" @dismissed="alerts.error=null">
      <span v-html="alerts.error"></span>
    </b-alert>
    <form>
      <div class="form-group">
        <label for="usernameLogin">Username</label>
        <input
          v-model="input.username"
          id="usernameLogin"
          class="form-control"
          type="text"
          name="username"
          placeholder="Username"
        >
      </div>
      <div class="form-group">
        <label for="passwordLogin">Password</label>
        <input
          v-model="input.password"
          id="passwordLogin"
          class="form-control"
          type="password"
          name="password"
          placeholder="Password"
        >
      </div>
      <button type="button" class="btn btn-primary" v-on:click="login()">Login</button>
    </form>
  </div>
</template>

<script>
import { loginAPI } from "./services/api";

export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: ""
      },
      alerts: {
        error: null
      }
    };
  },
  methods: {
    login() {
      if (this.checkInputs()) {
        const username = this.input.username;
        loginAPI(username, this.input.password)
          .then(res => {
            this.$emit("login", username, res.data.token);
            this.$router.replace("home");
          })
          .catch(error => {
            // eslint-disable-next-line
            console.error(error);
            if (error.response) {
              this.alerts.error = "Response : " + error.response;
            } else {
              this.alerts.error = "Error : " + error.message;
            }
          });
      }
    },
    checkInputs() {
      if (this.input.username == "" || this.input.password == "") {
        this.alerts.error = "Username or Password can't be <b>empty</b>";
        return false;
      }
      return true;
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
