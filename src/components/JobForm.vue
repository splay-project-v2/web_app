<template>
  <div class="container">
    <b-form @submit="submitJob">
      <!-- NAME FIELD -->
      <div class="form-row">
        <div class="col">
          <b-form-group label="Name :" label-for="nameJobForm" label-cols-md="4">
            <b-form-input
              id="nameJobForm"
              type="text"
              v-model="form.name"
              aria-describedby="nameFeedback"
              placeholder="Name"
              name="Job Name"
              v-validate="{required:false, max:20}"
              :state="validateState('Job Name')"
            ></b-form-input>
            <b-form-invalid-feedback id="nameFeedback">{{ errors.first("Job Name") }}</b-form-invalid-feedback>
          </b-form-group>
        </div>
        <!-- Scheduler FIELD -->
        <div class="col">
          <b-form-group label="Scheduler :" label-for="schedulerJobForm"  label-cols-md="4">
            <b-form-select
              id="schedulerJobForm"
              :options="options.scheduler"
              v-model="form.scheduler"
              placeholder="Scheduler"
            ></b-form-select>
          </b-form-group>
        </div>
      </div>
      <!-- NUMBER SPLAYD FIELD -->
      <b-form-group label="Number of Splay deamon :" label-for="nbSplaydJobForm"  label-cols-md="4">
        <b-form-input
          id="nbSplaydJobForm"
          type="number"
          v-model="form.nb_splayds"
          aria-describedby="nbSplaydFeedback"
          name="Number of Splayd"
          v-validate="{numeric:true, min_value:1, max_value:250}"
          :state="validateState('Number of Splayd')"
        ></b-form-input>
        <b-form-invalid-feedback id="nbSplaydFeedback">{{ errors.first('Number of Splayd') }}</b-form-invalid-feedback>
      </b-form-group>
      <!-- DESCRIPTION FIELD -->
      <b-form-group label="Descripion :" label-for="descriptionJobForm"  label-cols-md="4">
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
     
      <!-- TOPOLOGY FIELD -->
      <b-form-group label="Topology (XML)" label-for="topologyJobForm" label-class="control-label">
        <b-form-textarea
          id="topologyJobForm"
          type="text"
          v-model="form.topology"
          placeholder="Topo XML"
          aria-describedby="topologyFeedback"
          name="Topology"
          v-validate="{required:false}"
          :state="validateState('Topology')"
          :rows="5"
        ></b-form-textarea>
        <b-form-invalid-feedback id="topologyFeedback">{{ errors.first('Topology') }}</b-form-invalid-feedback>
      </b-form-group>
      <!-- CODE FIELD -->
      <b-form-group label="Code (Lua 5.3)" label-for="aceEditor" label-class="control-label">
        <!-- ACE EDITOR -->
        <div id="aceEditor"></div>
        <b-form-textarea
          id="codeJobForm"
          class="sr-only"
          type="text"
          v-model="form.code"
          aria-describedby="codeFeedback"
          name="Job Code"
          v-validate="{required:true}"
          :state="validateState('Job Code')"
        ></b-form-textarea>
        <b-form-invalid-feedback id="codeFeedback">{{ errors.first('Job Code') }}</b-form-invalid-feedback>
      </b-form-group>
      <!-- SUBMIT BUTTON -->
      <div class="text-center mb-2">
        <b-button variant="primary" type="submit" :disabled="disableSubmit()">Submit this new Job</b-button>
      </div>
      <b-alert variant="danger" fade :show="alerts.error != null" @dismissed="alerts.error=null">
        <span v-html="alerts.error"></span>
      </b-alert>
      <b-alert variant="success" fade :show="alerts.success != null" @dismissed="alerts.success=null">
        <span v-html="alerts.success"></span>
      </b-alert>
    </b-form>
  </div>
</template>

<script>
import { createJobAPI } from "@/services/api";

var ace = require("brace");
require("brace/mode/lua");
require("brace/theme/monokai");

const codeDefault = `--[[

Small script to test splay, just log the different neighbours during 1 minutes

--]]

require("splay.base")
print("Discovering Job - launch during 1 minute - v1")

neighbours = job.nodes
print("I am link to :")
for _, n in pairs(neighbours) do print(" - "..n.ip..":"..n.port) end

print("Exit Discovering Job")`;

export default {
  name: "JobForm",
  data() {
    return {
      currentRefresh: {
        submit: false
      },
      alerts: {
        error: null,
        success: null
      },
      options: {
        scheduler: [
          { value: "standard", text: "Standard Job" },
          { value: "trace", text: "Trace Job" },
          { value: "tracealt", text: "Trace Alt Job" }
        ]
      },
      form: {
        name: null,
        code: codeDefault,
        description: null,
        nb_splayds: 5,
        topology: null,
        scheduler: "standard"
      }
    };
  },
  mounted() {
    var me = this;
    var editor = ace.edit("aceEditor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/lua");
    editor.getSession().setValue(codeDefault);
    editor.getSession().on("change", function() {
      var code = editor.getSession().getValue();
      me.form.code = code;
    });
  },
  methods: {
    disableSubmit() {
      return (
        this.errors.any() ||  this.currentRefresh.submit ||
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
      this.currentRefresh.submit = true

      createJobAPI(this.auth.token, this.form)
        .then(res => {
          this.alerts.success = "New job created : " + res;
          this.$emit("newJob");
        })
        .catch(error => {
          this.alerts.error = error.msg;
        }).finally(()=> {
          setTimeout(() => {this.currentRefresh.submit = false}, 500) 
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
#aceEditor {
  height: 400px;
}
</style>
