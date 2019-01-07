<template>
  <div id="app">
    <Header/>
    <div class="container mt-3 mb-3">
      <div class="col"></div>
      <div class="col-12">
        <Alerts v-bind:arrayMsgError="{}" v-bind:arrayMsgSucces="{}" v-bind:arrayMsgWarning="{}"/>
        <Body/>
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
import Alerts from "./components/Alerts.vue";
import Body from "./components/Body.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "app",
  data: function() {
    return {};
  },
  methods: {},
  components: {
    Header,
    Alerts,
    Body,
    Footer
  }
};
</script>

<style>
</style>
