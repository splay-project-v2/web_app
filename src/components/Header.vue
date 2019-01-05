<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">
      <img src="icon.png" width="30" height="30" class="d-inline-block align-top" alt="Icon">
      Splay V2
    </a>

    <form class="form-inline">
      <button id="btn-login" class="btn btn-success" type="button">Login</button>
      <button class="btn btn-secondary" type="button">Register</button>
    </form>
  </nav>

</template>

<script>
export default {
  name: 'Header',
  props: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #btn-login{
    margin-right: 5px;
  }
</style>
