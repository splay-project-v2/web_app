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
        // TODO API
        // eslint-disable-next-line
        new Promise((resolve, reject) => {
          resolve({ username: this.input.username, token: "TOKEN-TODO" });
        }).then(res => {
          this.$emit("login", res.username, res.token);
          this.$router.replace("home");
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
