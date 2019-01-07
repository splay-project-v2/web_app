<template>
  <nav class="navbar navbar-expand-md sticky-top navbar-dark bg-dark ">
    <a class="navbar-brand" href="#">
      <img src="icon.png" width="30" height="30" class="d-inline-block align-top" alt="Icon">
      Splay V2
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarCollapsable"
      aria-controls="navbarCollapsable"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarCollapsable">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <button id="btn-login" class="btn btn-success" type="button">Login</button>
        <button class="btn btn-secondary" type="button">Register</button>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  props: {},
  methods: {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#btn-login {
  margin-right: 5px;
}
</style>
