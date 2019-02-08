<template>
  <div class="container">
    <h1 v-if="loading" class="text-center">Loading</h1>
    <h1 v-else class="text-center">
      Job
      <i>{{ job.name }}</i>
    </h1>
    <hr class="my-4">
    <b-table striped hover small bordered :items="Object.entries(job)" :fields="fields"></b-table>
  </div>
</template>

<script>
import { getJobAPI } from "@/services/api";

export default {
  name: "JobDetail",
  data() {
    return {
      alerts: {
        success: null
      },
      fields: {
        0:{
          label: 'Attributes',
          sortable: true
        },
        1:{
          label: 'Value',
          sortable: false
        }
      },
      job: {},
      loading: true
    };
  },
  mounted() {
    this.fetchJobDetails();
  },
  methods: {
    fetchJobDetails() {
      const id = this.$route.params.id;
      getJobAPI(this.auth.token, id).then(res => {
        this.loading = false;
        this.job = res.data.job;
      });
    }
  },
  props: {
    auth: Object
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
