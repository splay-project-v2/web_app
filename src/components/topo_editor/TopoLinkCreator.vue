<template lang="html">
  <b-form @submit.prevent="submitLink">
    <div class="row">
      <div class="form-group col-xs-4">
        <b-form-select v-model="source">
          <option disabled value=null>Source</option>
          <option v-for="(node, index) in nodes" :key="index">
            {{ node.name }}
          </option>
        </b-form-select>
      </div>
      <div class="form-group col-xs-4">
        <b-form-select v-model="target">
          <option disabled value=null>Destination</option>
          <option v-for="(node, index) in nodes" :key="index">
            {{ node.name }}
          </option>
        </b-form-select>
      </div>
      <div class="form-group col-xs-6">
        <b-form-input type="text" placeholder="Delay(ms) - Optional" v-model="linkDelay"/>
      </div>
      <div class="form-group col-xs-4">
        <b-form-select v-model="linkSpec">
          <option disabled value=null>Spec (Optional)</option>
          <option v-for="(spec, index) in specs" :key="index">
            {{ spec.name }}
          </option>
        </b-form-select>
      </div>
      <div class="form-group col-xs-4">
        <b-button variant="primary" type="submit">Add link</b-button>
      </div>
    </div>
  </b-form>
</template>

<script>
export default {
  props: ['specs', 'nodes', 'edges'],
  data () {
    return {
      source: null,
      target: null,
      linkSpec: null,
      linkDelay: null
    }
  },
  methods: {
    submitLink () {
      if(this.validateLink()){
        this.$emit('addLink', {source: this.source, target: this.target, linkSpec: this.linkSpec, linkDelay: this.linkDelay})
        this.$emit('triggerErrors', null)
        this.source = null
        this.target = null
        this.linkSpec = null
        this.linkDelay = null
      }
    },
    validateLink() {
      if (this.source == null || this.target == null){
        this.$emit('triggerErrors', 'Link: Please set source and target for link')
        return false
      }
      if (this.edges.some(el => el.id === `link${this.source}${this.target}`)){
        this.$emit('triggerErrors', 'Link: This link already exists')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="css" scoped>
</style>
