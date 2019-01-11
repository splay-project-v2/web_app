<template>
  <div>
    <b-alert v-if="errorMsg"
            variant="danger"
            dismissible fade
            show>
      <span v-html="errorMsg"></span>
    </b-alert>

    <b-alert v-if="warningMsg"
            variant="warning"
            dismissible fade
            show>
      <span v-html="warningMsg"></span>
    </b-alert>

    <b-alert v-if="successMsg"
            variant="success"
            dismissible fade
            show>
      <span v-html="successMsg"></span>
    </b-alert>
  </div>
</template>

<script>
export default {
  name: "Alerts",
  props: {
    errorMsg : String,
    warningMsg : String,
    successMsg : String
  },
  methods: {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only
    But add ugly data-v-515155d on 
 -->
<style>
</style>
