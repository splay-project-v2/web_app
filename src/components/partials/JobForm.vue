<template>
  <div class="container">
    <b-alert variant="danger" fade :show="alerts.error != null" @dismissed="alerts.error=null">
      <span v-html="alerts.error"></span>
    </b-alert>
    <b-alert
      variant="success"
      dismissible
      fade
      :show="alerts.success != null"
      @dismissed="alerts.success=null"
    >
      <span v-html="alerts.success"></span>
    </b-alert>
    <!-- NAME FIELD -->
    <b-form @submit="submitJob">
      <b-form-group label="Name :" label-for="nameJobForm">
        <b-form-input
          id="nameJobForm"
          type="text"
          v-model="form.name"
          aria-describedby="nameFeedback"
          placeholder="Name"
          name="Job Name"
          v-validate="{required:false, max:20, alpha_num:true}"
          :state="validateState('Job Name')"
        ></b-form-input>
        <b-form-invalid-feedback id="nameFeedback">{{ errors.first("Job Name") }}</b-form-invalid-feedback>
      </b-form-group>
      <!-- DESCRIPTION FIELD -->
      <b-form-group label="Descripion :" label-for="descriptionJobForm">
        <b-form-input
          id="descriptionJobForm"
          type="text"
          v-model="form.description"
          placeholder="Description of the job"
          aria-describedby="descriptionFeedback"
          name="Job Descrition"
          v-validate="{required:false}"
          :state="validateState('Job Descrition')"
        ></b-form-input>
        <b-form-invalid-feedback id="descriptionFeedback">{{ errors.first('Job Descrition') }}</b-form-invalid-feedback>
      </b-form-group>
      <!-- NUMBER SPLAYD FIELD -->
      <b-form-group label="Number of Splay deamon :" label-for="nbSplaydJobForm">
        <b-form-input
          id="nbSplaydJobForm"
          type="number"
          v-model="form.nb_splayds"
          aria-describedby="nbSplaydFeedback"
          name="Number of Splayd"
          v-validate="{required:false}"
          :state="validateState('Number of Splayd')"
        ></b-form-input>
        <b-form-invalid-feedback id="nbSplaydFeedback">{{ errors.first('Number of Splayd') }}</b-form-invalid-feedback>
      </b-form-group>
      <!-- CODE FIELD -->
      <b-form-group label="Code :" label-for="codeJobForm">
        <b-form-textarea
          id="codeJobForm"
          type="text"
          v-model="form.code"
          placeholder="Code"
          aria-describedby="codeFeedback"
          name="Job Code"
          v-validate="{required:true}"
          :state="validateState('Job Code')"
          :rows="5"
        ></b-form-textarea>
        <b-form-invalid-feedback id="codeFeedback">{{ errors.first('Job Code') }}</b-form-invalid-feedback>
      </b-form-group>
      <!-- SUBMIT BUTTON -->
      <div class="text-center">
        <b-button variant="primary" type="submit" :disabled="disableSubmit()">Submit this new Job</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { createJobAPI } from "@/services/api";

export default {
  name: "JobForm",
  data() {
    return {
      alerts: {
        success: null,
        error: null
      },
      form: {
        name: null,
        code: null,
        description: null,
        nb_splayds: 5
      }
    };
  },
  mounted() {},
  methods: {
    disableSubmit() {
      return (
        this.errors.any() ||
        Object.keys(this.veeFields).some(key => !this.veeFields[key].valid)
      );
    },
    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.errors.has(ref);
      }
      return null;
    },
    submitJob(evt) {
      evt.preventDefault();
      this.alerts.error = null;
      this.alerts.success = null;

      createJobAPI(
        this.auth.token,
        this.form.name,
        this.form.description,
        this.form.nb_splayds,
        this.form.code
      )
        .then(res => {
          this.alerts.success = "New job created : " + res;
          this.$emit("newJob");
        })
        .catch(error => {
          // eslint-disable-next-line
          console.error(error);
          if (error.response) {
            this.alerts.error =
              "Server response : " + error.response.data.errors;
          } else {
            this.alerts.error = "Error : " + error.message;
          }
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
