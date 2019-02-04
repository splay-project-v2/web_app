<template>
  <div class="container">
    <h1 class="text-center">Register</h1>
    <hr class="my-4">
    <b-alert variant="danger" fade :show="alerts.error != null" @dismissed="alerts.error=null">
      <span v-html="alerts.error"></span>
    </b-alert>
    <!-- USERNAME FIELD -->
    <b-form @submit="submitRegister">
      <b-form-group label="Username :" label-for="usernameRegister">
        <b-form-input
          id="usernameRegister"
          type="text"
          v-model="form.username"
          aria-describedby="usernameFeedback"
          placeholder="Username"
          name="username"
          v-validate="{required:true, min:4, max:20, alpha_num:true}"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback id="usernameFeedback">{{ errors.first('username') }}</b-form-invalid-feedback>
      </b-form-group>
      <!-- EMAIL FIELD -->
      <b-form-group label="Email :" label-for="emailRegister">
        <b-form-input
          id="emailRegister"
          type="email"
          v-model="form.email"
          placeholder="Enter email"
          aria-describedby="emailFeedback"
          name="email"
          v-validate="{email:true}"
          :state="validateState('email')"
        ></b-form-input>
        <b-form-invalid-feedback id="emailFeedback">{{ errors.first('email') }}</b-form-invalid-feedback>
      </b-form-group>
      <!-- PASSWORD FIELD -->
      <b-form-group label="Password :" label-for="passwordRegister1">
        <b-form-input
          id="passwordRegister1"
          type="password"
          v-model="form.password"
          placeholder="Password"
          aria-describedby="passwordFeedback"
          name="password"
          ref="password"
          v-validate="{min:6, required:true}"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback id="passwordFeedback">{{ errors.first('password') }}</b-form-invalid-feedback>
      </b-form-group>
      <!-- PASSWORD CONFIRMATION FIELD -->
      <b-form-group label="Password confirmation :" label-for="passwordConfRegister">
        <b-form-input
          id="passwordConfRegister"
          type="password"
          v-model="form.passwordConfirmation"
          placeholder="Password confirmation"
          aria-describedby="passwordConfFeedback"
          name="Password Confirmation"
          v-validate="{confirmed:'password', required:true}"
          :state="validateState('Password Confirmation')"
        ></b-form-input>
        <b-form-invalid-feedback
          id="passwordConfFeedback"
        >{{ errors.first('Password Confirmation') }}</b-form-invalid-feedback>
      </b-form-group>
      <!-- SUBMIT BUTTON -->
      <b-button variant="primary" type="submit" :disabled="disableSubmit()">Register</b-button>
    </b-form>
  </div>
</template>

<script>
import { registerAPI } from "@/services/api";

export default {
  name: "Register",
  data() {
    return {
      form: {},
      alerts: {
        error: null
      }
    };
  },
  props: {},
  methods: {
    disableSubmit() {
      return (
        this.errors.any() ||
        Object.keys(this.veeFields).some(key => !this.veeFields[key].valid)
      );
    },
    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.errors.has(ref);
      }
      return null;
    },
    submitRegister(evt) {
      evt.preventDefault();
      this.alerts.error = null;
      const username = this.form.username;
      registerAPI(
        username,
        this.form.email,
        this.form.password,
        this.form.passwordConfirmation
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
