<template lang="html">
  <b-form @submit.prevent="submitNode">
    <div class="row">

      <div class="form-group col-xs-4">
        <b-form-input type="text"  placeholder="Node name" v-model="nodeName"/>
      </div>

      <div class="form-group col-xs-4">
        <b-form-select v-model="nodeType">
          <option v-for="(type, index) in types" :value="type" :key="index">
            {{ type }}
          </option>
        </b-form-select>
        <span class="error-msg">{{ errors.first('nodeType') }}</span>
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
      if(this.validateNode()) {
        this.$emit('addNode', {id: this.nodeName, type: this.nodeType})
        this.nodeName = null
        this.nodeType = this.types[0]
        this.$emit('triggerErrors', null)
      } else {
        this.$emit('triggerErrors', 'Node : Make sure that all fields are present and no node exist with the same name')
      }
    },
    validateNode() {
      return this.errors.items.length == 0 && this.nodeName != null && this.nodeType != null && !this.nodes.some(el => el.name === this.nodeName)
    }
  }
}
</script>

<style lang="css" scoped>
  .error-msg {
    color: red;
  }
</style>
