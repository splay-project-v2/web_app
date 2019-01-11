<template>
  <div id="app">
    <Header/>
    <div class="container mt-3 mb-3">
      <div class="col"></div>
      <div class="col-12">
        <router-view/>
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
    return {};
  },
  methods: {},
  components: {
    Header,
    Footer
  }
};
</script>

<style>
</style>
