<template>
  <div>
    <b-alert v-for="(msg, keyO) in arrayMsgError" v-bind:key="'error' + keyO" v-bind:msg="msg"
            variant="danger"
            dismissible fade
            show>
    {{ msg }} - {{ keyO }}
    </b-alert>

    <b-alert v-for="(msg, keyO) in arrayMsgWarning" v-bind:key="'warning' + keyO" v-bind:msg="msg"
            variant="warning"
            dismissible fade
            show>
    {{ msg }} - {{ keyO }}
    </b-alert>

    <b-alert v-for="(msg, keyO) in arrayMsgSucces" v-bind:key="'success' + keyO" v-bind:msg="msg"
            variant="success"
            dismissible fade
            show>
    {{ msg }} - {{ keyO }}
    </b-alert>
  </div>
</template>

<script>
export default {
  name: "Alerts",
  props: {
    arrayMsgError : Object,
    arrayMsgWarning : Object,
    arrayMsgSucces : Object
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
