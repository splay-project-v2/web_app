<template>
  <div class="container">
    <b-alert variant="danger" dismissible fade :show="alerts.error != null" @dismissed="alerts.error=null">
      <span v-html="alerts.error"></span>
    </b-alert>

    <b-table striped hover :items="jobs" :fields="fields">
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button size="sm" @click.stop="detail(row.index)" class="mr-1">Details</b-button>
        <b-button size="sm" variant="danger" @click.stop="kill(row.item)" class="mr-1">Kill</b-button>
        <b-button size="sm" variant="danger" @click.stop="removeJob(row.item)">Remove</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { removeJobAPI } from "@/services/api";

export default {
  name: "ListJobs",
  data() {
    return {
      alerts: {error: null},
      fields: ["status", "id", "created_at", "nb_splayds", "name", "actions"]
    };
  },
  methods: {
    detail(index) {
      this.$emit("showJobDetails", index);
    },
    kill() {
      this.$emit("refreshJobs");
    },
    removeJob(item) {
      removeJobAPI(this.auth.token, item.id).then(() => {
        this.$emit("refreshJobs");
      }).catch(error => {
        this.alerts.error = error.msg;
      });
    }
  },
  props: {
    jobs: Array,
    auth: Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
