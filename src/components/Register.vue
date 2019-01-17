<template>
  <div class="container">
    <h1>Register</h1>
    <b-alert variant="danger" fade :show="alerts.errors != null" @dismissed="alerts.errors=null">
      <ul v-if="Array.isArray(alerts.errors)">
        <li v-for="(msgE, index) in alerts.errors" v-bind:key="'regErr' + index">
          <span v-html="msgE"></span>
        </li>
      </ul>
      <span v-else v-html="alerts.errors"></span>
    </b-alert>

    <b-form>
      <b-form-group label="Username :" label-for="usernameRegister" description="Allow to login">
        <b-form-input
          id="usernameRegister"
          type="text"
          v-model="input.username"
          required
          placeholder="username"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Email :" label-for="emailRegister">
        <b-form-input
          id="emailRegister"
          type="email"
          v-model="input.email"
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Password :" label-for="passwordRegister1">
        <b-form-input
          id="passwordRegister1"
          type="password"
          v-model="input.password1"
          placeholder="Password"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Password confirmation :" label-for="passwordRegister2">
        <b-form-input
          id="passwordRegister2"
          type="password"
          v-model="input.password2"
          placeholder="Password confirmation"
        ></b-form-input>
      </b-form-group>
      <b-button variant="primary" v-on:click="register">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import { registerAPI } from "./services/api";

export default {
  name: "Register",
  data() {
    return {
      input: {
        username: "",
        password1: "",
        password2: "",
        email: ""
      },
      alerts: {
        errors: null
      }
    };
  },
  props: {},
  methods: {
    register() {
      if (this.checkInputs()) {
        const username = this.input.username;
        this.alerts.errors = null;
        registerAPI(
          username,
          this.input.email,
          this.input.password1,
          this.input.password2
        )
          .then(res => {
            this.$emit("login", username, res.data.token);
            this.$router.replace("home");
          })
          .catch(error => {
            // eslint-disable-next-line
            console.error(error);
            if (error.response) {
              this.alerts.errors = "Server response : " + error.response.data.errors;
            } else {
              this.alerts.errors = "Error : " + error.message;
            }
          });
      }
    },
    checkInputs() {
      const alerts = [];

      if (this.input.username.length < 4) {
        alerts.push(
          "The <b>Username</b> need to have more than <b>4 caracters!</b>"
        );
      }
      if (this.input.password1.length < 4) {
        alerts.push(
          "The <b>Password</b> need to have more than <b>4 caracters!</b> "
        );
      }
      if (this.input.password1 !== this.input.password2) {
        alerts.push("The <b>second password</b> isn't the same than other!");
      }

      if (alerts.length > 0) {
        this.alerts.errors = alerts;
        return false;
      }
      return true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
