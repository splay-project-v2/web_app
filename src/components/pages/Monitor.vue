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
    <b-alert variant="danger" dismissible fade :show="alerts.error != null" @dismissed="alerts.error=null">
      <span v-html="alerts.error"></span>
    </b-alert>

    <h1 class="text-center">List of your Jobs</h1>
    <hr class="my-4">

    <ListJobs
      v-bind:auth="auth"
      v-bind:jobs="jobs"
      @refreshJobs="fetchJobs"
      @showJobDetails="detailJob"
    />

    <div class="text-center">
      <b-button @click="fetchJobs" :disabled="currentRefresh.jobs" variant="primary mr-1">Refresh &#x21bb;</b-button>
      <b-button v-b-modal.modalCreateJob variant="success">Create new job ✚</b-button>
    </div>

    <h1 class="text-center mt-5">List Splay Daemons</h1>
    <hr class="my-4">
    <ListSplayd v-bind:auth="auth" v-bind:splayds="splayds" @showSplaydDetails="detailSplayd"/>
    
    <div class="text-center">
      <b-button @click="fetchSplayds" :disabled="currentRefresh.splayds" variant="primary mr-1">Refresh &#x21bb;</b-button>
    </div>

    <b-modal ref="modalCreateJobRef" id="modalCreateJob" size="lg" hide-footer title="Create a Job">
      <JobForm v-bind:auth="auth" @newJob="fetchJobs(); $refs.modalCreateJobRef.hide();"/>
    </b-modal>

    <b-modal ref="modalDetailJobRef" id="modalDetailJob" size="lg" title="Detail of a job">
      <JobDetail v-if="jobDetailId!=null" v-bind:job="jobs[jobDetailId]"/>
    </b-modal>

    <b-modal ref="modalDetailSplaydRef" id="modalDetailSplayd" size="lg" title="Detail of a Splayd">
      <JobDetail v-if="splaydDetailId!=null" v-bind:job="splayds[splaydDetailId]"/>
    </b-modal>
  </div>
</template>

<script>
import JobForm from "../partials/JobForm";
import ListJobs from "../partials/ListJobs";
import ListSplayd from "../partials/ListSplayd";

import JobDetail from "../partials/JobDetail";

import { listJobsAPI, listSplaydsAPI } from "@/services/api";

export default {
  name: "Monitor",
  data() {
    return {
      alerts: {
        success: null,
        error: null
      },
      jobs: [],
      splayds: [],
      jobDetailId: null,
      splaydDetailId: null,
      currentRefresh: {
        jobs:false,
        splayds:false
      }
    };
  },
  methods: {
    detailJob(index) {
      this.jobDetailId = index;
      this.$refs.modalDetailJobRef.show();
    },
    detailSplayd(index) {
      this.splaydDetailId = index;
      this.$refs.modalDetailSplaydRef.show();
    },
    fetchJobs() {
      this.currentRefresh.jobs = true
      listJobsAPI(this.auth.token)
        .then(res => {
          this.jobs = res.data.jobs;
        })
        .catch(error => {
          this.alerts.error = error.msg;
        }).finally(() => {
          setTimeout(() => {this.currentRefresh.jobs = false}, 100) 
        });
    },
    fetchSplayds() {
      this.currentRefresh.splayds = true
      listSplaydsAPI(this.auth.token)
        .then(res => {
          this.splayds = res.data.splayds;
        })
        .catch(error => {
          this.alerts.error = error.msg;
        }).finally(()=> {
          setTimeout(() => {this.currentRefresh.splayds = false}, 100) 
        });
      
    }
  },
  mounted() {
    this.fetchJobs();
    this.fetchSplayds();
  },
  props: {
    auth: Object
  },
  components: {
    JobForm,
    ListJobs,
    JobDetail,
    ListSplayd
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
