<template>
  <div class="container">
    <h1 class="text-center">Create a Job</h1>
    <hr class="my-4">
    <JobForm v-bind:auth="auth" @newJob="fetchJobs"/>

    <h1 class="text-center">Your Jobs</h1>
    <hr class="my-4">
    <b-alert
      variant="success"
      dismissible
      fade
      :show="alerts.success != null"
      @dismissed="alerts.success=null"
    >
      <span v-html="alerts.success"></span>
    </b-alert>

    <b-table striped hover :items="table.jobs" :fields="table.fields">
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button size="sm" @click.stop="detail(row.item)" class="mr-1">Details</b-button>
        <b-button size="sm" variant="danger" @click.stop="kill(row.item)" class="mr-1">Kill</b-button>
        <b-button size="sm" variant="danger" @click.stop="removeJob(row.item)">Remove</b-button>

      </template>
    </b-table>
  </div>
</template>

<script>
import JobForm from '../partials/JobForm'
import { listJobsAPI, removeJobAPI } from '@/services/api'

export default {
  name: "Jobs",
  data() {
    return {
      alerts: {
        success: null
      },
      table: {
        jobs: [],
        fields: ["status", "id", "created_at", "nb_splayds", "name", "actions"]
      }
    };
  },
  methods: {
    detail(item) {
      this.$router.push({ name: 'jobDetails', params: { id: item.id } })
    },
    kill(item) {
      this.alerts.success = "I kill " + item.id;
    },
    removeJob(item) {
      removeJobAPI(this.auth.token, item.id).then(() => {
        this.fetchJobs()
      })
    },
    fetchJobs() {
      listJobsAPI(this.auth.token).then((res) => {
        this.table.jobs = res.data.jobs
      })
    }
  },
  mounted() {
    this.fetchJobs()
  },
  props: {
    auth: Object
  },
  components: {
    JobForm
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
