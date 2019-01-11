<template>
  <div class="container">
    <h1 class="text-center">Login</h1>
    <Alerts
      v-bind:errorMsg="alerts.error"
      v-bind:warningMsg="alerts.warning"
      v-bind:successMsg="alerts.success"
    />
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
import Alerts from "./Alerts.vue";

export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: ""
      },
      alerts: {
        error: null,
        success: null,
        warning: null
      }
    };
  },
  methods: {
    login() {
      if (this.input.username == "" || this.input.password == "") {
        this.alerts.error = "Can't be <b>empty</b> username or password";
      } else {
        this.$router.replace("home");
      }
    }
  },
  components: {
    Alerts
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
