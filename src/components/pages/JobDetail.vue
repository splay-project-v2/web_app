<template>
  <div class="container">
    <h1 v-if="!job.name" class="text-center">Loading</h1>
    <h1 v-else class="text-center">Job
      <i>{{ job.name }}</i>
    </h1>
    <hr class="my-4">
  </div>
</template>

<script>
export default {
  name: "JobDetail",
  data() {
    return {
      alerts: {
        success: null
      },
      job: {
        name: ""
      }
    };
  },
  mounted() {
    new Promise((resolve) => {
      const id = this.$route.params.id
      setTimeout(function() {
        resolve({
            name: "Test " + id
        })
      }, 1000);
      
    }).then((res) => {
      this.job = res
    });
  },
  methods: {},
  props: {
    auth: Object
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
