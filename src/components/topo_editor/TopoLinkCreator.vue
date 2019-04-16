<template lang="html">
  <b-form @submit.prevent="submitLink">
    <div class="row">
      <div class="form-group col-xs-4">
        <b-form-select v-model="source">
          <option disabled value=null>source</option>
          <option v-for="node in nodes">
            {{ node.name }}
          </option>
        </b-form-select>
      </div>
      <div class="form-group col-xs-4">
        <b-form-select v-model="target">
          <option disabled value=null>target</option>
          <option v-for="node in nodes">
            {{ node.name }}
          </option>
        </b-form-select>
      </div>
      <div class="form-group col-xs-4">
        <b-form-input type="text" placeholder="Link Delay (ms)" v-model="linkDelay"/>
      </div>
      <div class="form-group col-xs-4">
        <b-form-select v-model="linkSpec">
          <option disabled value=null>Spec</option>
          <option v-for="spec in specs">
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
  props: ['specs', 'nodes'],
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
      this.$emit('addLink', {source: this.source, target: this.target, linkSpec: this.linkSpec, linkDelay: this.linkDelay})
    }
  }
}
</script>

<style lang="css" scoped>
</style>
