<template>
  <div class="container">
    <h1 class="text-center">Register</h1>
    <hr class="my-4">
    <b-alert variant="danger" fade :show="alerts.error != null" @dismissed="alerts.error=null">
      <span v-html="alerts.error"></span>
    </b-alert>
    <!-- USERNAME FIELD -->
    <b-form @submit="submitRegister">
      <b-form-group
        label="Username :"
        label-for="usernameRegister"
        :state="inputError.username.state"
        :invalid-feedback="inputError.username.msgE"
      >
        <b-form-input
          id="usernameRegister"
          type="text"
          v-model="input.username"
          required
          placeholder="Username"
          :state="inputError.username.state"
        ></b-form-input>
      </b-form-group>
      <!-- EMAIL FIELD -->
      <b-form-group label="Email :" label-for="emailRegister">
        <b-form-input
          id="emailRegister"
          type="email"
          v-model="input.email"
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <!-- PASSWORD FIELD -->
      <b-form-group
        label="Password :"
        label-for="passwordRegister1"
        :state="inputError.password1.state"
        :invalid-feedback="inputError.password1.msgE"
      >
        <b-form-input
          id="passwordRegister1"
          type="password"
          v-model="input.password1"
          placeholder="Password"
          :state="inputError.password1.state"
        ></b-form-input>
      </b-form-group>
      <!-- PASSWORD CONFIRMATION FIELD -->
      <b-form-group
        label="Password confirmation :"
        label-for="passwordRegister2"
        :state="inputError.password2.state"
        :invalid-feedback="inputError.password2.msgE"
      >
        <b-form-input
          id="passwordRegister2"
          type="password"
          v-model="input.password2"
          placeholder="Password confirmation"
          :state="inputError.password2.state"
        ></b-form-input>
      </b-form-group>
      <!-- SUBMIT BUTTON -->
      <b-button variant="primary" type="submit">Register</b-button>
    </b-form>
  </div>
</template>

<script>
import { registerAPI } from "./services/api";

export default {
  name: "Register",
  data() {
    return {
      inputError: {
        username: {
          state: null,
          msgE: ""
        },
        password1: {
          state: null,
          msgE: ""
        },
        password2: {
          state: null,
          msgE: ""
        }
      },
      input: {
        username: "",
        password1: "",
        password2: "",
        email: ""
      },
      alerts: {
        error: null
      }
    };
  },
  props: {},
  methods: {
    submitRegister(evt) {
      evt.preventDefault();
      Object.keys(this.inputError).forEach((key) => {
        this.inputError[key].state = null
      })
      this.alerts.error = null;
      if (this.checkInputs()) {
        const username = this.input.username;
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
              this.alerts.error =
                "Server response : " + error.response.data.errors;
            } else {
              this.alerts.error = "Error : " + error.message;
            }
          });
      }
    },
    checkInputs() {
      if (this.input.username.length < 4 || this.input.username.length > 20) {
        this.inputError.username.state = false;
        this.inputError.username.msgE =
          "The <b>Username</b> need to have more than <b>4 caracters!</b>";
      }
      if (this.input.password1.length < 6) {
        this.inputError.password1.state = false;
        this.inputError.password1.msgE =
          "The password need to have more than 5 characters";
      }
      if (this.input.password1 !== this.input.password2) {
        this.inputError.password2.state = false;
        this.inputError.password2.msgE = "It is not the same than above";
      }

      if (
        !Object.keys(this.inputError).every(key => {
          return this.inputError[key].state || this.inputError[key].state === null;
        })
      ) {
        this.alerts.error = "Some inputs aren't valid => see details below";
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
