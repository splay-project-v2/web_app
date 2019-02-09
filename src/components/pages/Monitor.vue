<template>
  <div class="container">
    <b-alert
      variant="success"
      dismissible
      fade
      :show="alerts.success != null"
      @dismissed="alerts.success=null"
    >
      <span v-html="alerts.success"></span>
    </b-alert>

    <h1 class="text-center">List of your Jobs</h1>
    <hr class="my-4">
    <ListJobs
      v-bind:auth="auth"
      v-bind:jobs="jobs"
      @refreshJobs="fetchJobs"
      @showJobDetails="detail"    />

    <div class="text-center">
      <b-btn v-b-modal.modalCreateJob variant="primary">Create new job</b-btn>
    </div>
    <b-modal ref="modalCreateJobRef" id="modalCreateJob" size="lg" hide-footer title="Create a Job">
      <JobForm v-bind:auth="auth" @newJob="fetchJobs(); $refs.modalCreateJobRef.hide();"/>
    </b-modal>  

    <b-modal ref="modalDetailJobRef" id="modalDetailJob" size="lg" title="Detail of a job">
      <JobDetail v-if="jobDetailId!=null" v-bind:job="jobs[jobDetailId]" @newJob="fetchJobs"/>
    </b-modal>
  </div>
</template>

<script>
import JobForm from "../partials/JobForm";
import ListJobs from "../partials/ListJobs";
import JobDetail from "../partials/JobDetail";

import { listJobsAPI } from "@/services/api";

export default {
  name: "Jobs",
  data() {
    return {
      alerts: {
        success: null
      },
      jobs: [],
      jobDetailId: null
    };
  },
  methods: {
    detail(index) {
      this.jobDetailId = index;
      this.$refs.modalDetailJobRef.show();
    },
    fetchJobs() {
      listJobsAPI(this.auth.token).then(res => {
        this.jobs = res.data.jobs;
      });
    }
  },
  mounted() {
    this.fetchJobs();
  },
  props: {
    auth: Object
  },
  components: {
    JobForm,
    ListJobs,
    JobDetail
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
