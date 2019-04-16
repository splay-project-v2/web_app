<template>
  <div class="container">
    <b-table striped hover :items="splayds" :fields="fields">
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button size="sm" @click.stop="detail(row.index)" class="mr-1">Details</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "ListSplayd",
  data() {
    return {
      fields: ["status", "ip", "name", "lua_version", "actions"]
    };
  },
  methods: {
    detail(index) {
      this.$emit("showSplaydDetails", index);
    },
  },
  props: {
    splayds: Array,
    auth: Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
