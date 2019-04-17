<template lang="html">
  <b-form @submit.prevent="submitNode">
    <div class="row">

      <div class="form-group col-xs-4">
        <b-form-input type="text" placeholder="Node name" v-model="nodeName"/>
      </div>

      <div class="form-group col-xs-4">
        <b-form-select v-model="nodeType">
          <option v-for="(type, index) in types" :value="type" :key="index">
            {{ type }}
          </option>
        </b-form-select>
      </div>

      <div class="form-group col-xs-4">
        <b-button variant="primary" type="submit">Add node</b-button>
      </div>

    </div>
  </b-form>
</template>

<script>
export default {
  props: ['types', 'nodes'],
  data () {
    return {
      nodeName: null,
      nodeType: this.types[0]
    }
  },
  methods: {
    submitNode() {
      this.$emit('addNode', {id: this.nodeName, type: this.nodeType})
    }
  }
}
</script>

<style lang="css" scoped>
</style>
