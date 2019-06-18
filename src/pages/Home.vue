<template>
  <div class="container">
    <h1 class="text-center" v-if="auth.isAuth">Welcome {{ auth.username }} to Splay</h1>
    <h1 class="text-center" v-else>Welcome to Splay</h1>
    <hr class="my-4">
    <h3>Overview</h3>
    <div>
      Splay simplifies the prototyping and development of large-scale distributed applications and overlay networks.
      Splay covers the complete chain of distributed system design, development and testing: from coding and local runs
      to controlled deployment, experiment control and monitoring. Splay allows developers to specify their distributed
      applications in a concise way using a specialized language based on Lua, a highly-efficient embeddable scripting
      language. Splay applications execute in a safe environment with restricted access to local resources (file system, network, memory)
      and can be instantiated on a large variety of testbeds composed a large set of nodes with a single command.
    </div>
    <h3>Getting started</h3>
    <div>
      The main research paper, which describes Splay evaluates its performances and presents several
      typical experiments, has been published in the proceedings of the 6th USENIX Symposium on Networked
      Systems Design and Implementation (NSDI'09).

      SplayNet implements topology emulation features for Splay.
      It has been published in the Proceedings of the 14th ACM/IFIP/USENIX International Middleware Conference (MIDDLEWARE'13).

      The SPLAY NSDI'09 paper is available as a
      <a target="_blank" href="https://www.usenix.org/legacy/event/nsdi09/tech/full_papers/leonini/leonini_html/">web page</a>.

      The SplayNet MIDDLEWARE'13 is available as
      <a target="_blank" href="http://members.unine.ch/valerio.schiavoni/publications/splaynet_middleware13.pdf">PDF</a>.

      A more recent version of SPLAY (Version 2) has been written with new technologies or more recent version.
      Also, the structure has been simplified and improved. Check the new
      <a href="https://github.com/splay-project-v2" target="_blank">Github Organisation</a>.
    </div>
    <h3>More information</h3>
    <div>
      You can find more information about Splay :
      <a
          href="https://github.com/splay-project-v2"
          target="_blank"
          class="font-weight-bold"
        >Github Organisation</a>
        -
      <a
        href="http://www.splay-project.org/"
        target="_blank"
        class="font-weight-bold"
      >Official Website</a>
    </div>
    <h3>Start</h3>
    <div>
      <router-link
        v-if="!auth.isAuth"
        tag="button"
        to="/register"
        class="btn btn-secondary mr-2"
        type="button"
      >Register</router-link>

      <router-link
        v-if="!auth.isAuth"
        tag="button"
        to="/login"
        id="btn-header-login"
        class="btn btn-success"
        type="button"
      >Login</router-link>

      <router-link
        v-if="auth.isAuth"
        tag="button"
        to="/monitor"
        class="btn btn-primary mr-2"
        type="button"
      >Monitor Splay</router-link>
    </div>
   </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    auth: Object
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
