<template>
  <div class="container">
    <b-table striped hover small bordered :items="Object.entries(job)" :fields="fields"></b-table>
  </div>
</template>

<script>
export default {
  name: "JobDetail",
  data() {
    return {
      fields: {
        0:{
          label: 'Attributes',
          sortable: true
        },
        1:{
          label: 'Value',
          sortable: false
        }
      }
    };
  },
  methods: {

  },
  props: {
    job: Object
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
