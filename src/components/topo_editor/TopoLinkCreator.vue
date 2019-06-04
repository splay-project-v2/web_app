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
        <b-form-input type="number" placeholder="Delay(ms) - Optional" v-model="linkDelay"/>
      </div>
      <div v-if="enabledPlr" class="form-group col-xs-6">
        <b-form-input type="number" v-model="plr" placeholder="Packet Loss rate"/>
      </div>
      <div v-if="enabledKbps" class="form-group col-xs-6">
        <b-form-input type="number" v-model="kbps" placeholder="Kbps"/>
      </div>
      <div class="form-group col-xs-4">
        <b-form-select v-model="linkSpec">
          <option disabled value=null>Spec</option>
          <option v-for="(spec, index) in specs" :key="index">
            {{ spec.name }}
          </option>
        </b-form-select>
      </div>
      <div class="form-group col-xs-4">
        <b-button variant="primary" type="submit">Add link</b-button>
      </div>
    </div>
    <b-form-group label="Enable additional options for links">
      <b-form-checkbox v-model="enabledPlr" name="Plr" inline>Packet Loss Rate</b-form-checkbox>
      <b-form-checkbox v-model="enabledKbps" name="Delay" inline>Speed in Kbps</b-form-checkbox>
    </b-form-group>
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
      linkDelay: null,
      plr: null,
      kbps: null,
      enabledPlr: false,
      enabledKbps: false,
      enabledQlen: false
    }
  },
  methods: {
    submitLink () {
      if (this.validateLink()) {
        this.$emit('addLink', {
          source: this.source,
          target: this.target,
          linkSpec: this.linkSpec,
          linkDelay: this.linkDelay,
          plr: this.plr,
          kbps: this.kbps
        })
        this.$emit('triggerErrors', null)
        this.source = null
        this.target = null
        this.linkSpec = null
        this.linkDelay = null
        this.plr = null
        this.kbps = null
      }
    },
    validateLink () {
      if (this.linkSpec == null) {
        this.$emit('triggerErrors', 'Link: A spec must exist for this link')
        return false
      }
      if (this.source == null || this.target == null) {
        this.$emit('triggerErrors', 'Link: Please set source and target for link')
        return false
      }
      if (this.source === this.target) {
        this.$emit('triggerErrors', 'Link: Source and target cannot be the same !')
        return false
      }
      if (this.edges.some(el => el.id === `link${this.source}${this.target}`)) {
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
