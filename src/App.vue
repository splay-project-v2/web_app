<template>
  <div id="app">
    <Header v-bind:auth="auth" @logout="logout"/>
    <div class="container mt-3 mb-3">
      <div class="col"></div>
      <div class="col-12">

        <b-alert
            variant="success"
            dismissible fade
            :show="alerts.success"
            @dismissed="alerts.success=null">
          <span v-html="alerts.success"></span>
        </b-alert>

        <router-view v-bind:auth="auth" @login="login"/>
      </div>
      <div class="col"></div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "app",
  data: function() {
    return {
      alerts: {
        success: null
      },
      auth: {
        isAuth: false,
        username: null,
        token: null
      }
    };
  },
  methods: {
    login(user, token) {
      this.auth.isAuth = true;
      this.auth.username = user;
      this.auth.token = token;
      this.alerts.success = `Welcome into SplayV2 <b>${user}</b>!`
    },
    logout() {
      this.auth.isAuth = false;
      this.auth.username = null;
      this.auth.token = null;
      this.alerts.success = `<b>Logout</b> success!`
    }
  },
  components: {
    Header,
    Footer
  }
};
</script>

<style>
</style>
