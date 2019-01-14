<template>
  <div class="container">
    <h1>Your Jobs</h1>
    <b-alert
            variant="success"
            dismissible fade
            :show="alerts.success != null"
            @dismissed="alerts.success=null">
          <span v-html="alerts.success"></span>
        </b-alert>

    <b-table striped hover :items="table.jobs" :fields="table.fields">
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button
          size="sm"
          @click.stop="detail(row.item)"
          class="mr-1"
        >Show details</b-button>
        <b-button
          size="sm"
          @click.stop="kill(row.item)"
        >Kill</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "Jobs",
  data() {
    return {
      alerts: {
        success: null
      },
      table: {
        jobs: [
          {
            status: "On",
            id: 1,
            created_at: "12/12",
            nb_splayds: 10,
            name: "Hello world"
          }
        ],
        fields: ["status", "id", "created_at", "nb_splayds", "name", "actions"]
      }
    };
  },
  methods: {
    detail(item){
      this.alerts.success = "I show detail of "+item.id
    },
    kill(item){
      this.alerts.success = "I kill "+item.id
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
