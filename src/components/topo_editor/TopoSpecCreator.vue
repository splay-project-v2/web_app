<template lang="html">
  <b-form @submit.prevent="sendSpec">
    <div class="row">
      <div class="form-group col-xs-4">
        <b-form-input type="text" v-model="specname" placeholder="Spec Name"/>
      </div>
      <div v-if="enabledPlr" class="form-group col-xs-6">
        <b-form-input type="number" v-model="plr" placeholder="Packet Loss rate"/>
      </div>
      <div class="form-group col-xs-6">
        <b-form-input type="number" v-model="kbps" placeholder="Kbps"/>
      </div>
      <div v-if="enabledDelay" class="form-group col-xs-6">
        <b-form-input type="number" v-model="delay" placeholder="Delay"/>
      </div>
      <div v-if="enabledQlen" class="form-group col-xs-6">
        <b-form-input type="number" v-model="qlen" placeholder="Qlen"/>
      </div>
      <div class="form-group col-xs-6">
        <b-button variant="primary" type="submit">Add Spec</b-button>
      </div>
    </div>
    <b-form-group label="Enable additional options for specs">
      <b-form-checkbox v-model="enabledPlr" name="Plr" inline>Packet Loss Rate</b-form-checkbox>
      <b-form-checkbox v-model="enabledDelay" name="Delay" inline>Delay in milliseconds</b-form-checkbox>
      <b-form-checkbox v-model="enabledQlen" name="Qlen" inline>Queueing Length</b-form-checkbox>
    </b-form-group>
  </b-form>
</template>

<script>
export default {
  props: ['specs'],
  data () {
    return {
      specname: null,
      plr: null,
      kbps: null,
      delay: null,
      qlen: null,
      enabledPlr: false,
      enabledDelay: false,
      enabledQlen: false
    }
  },
  methods: {
    sendSpec () {
      if (this.validateSpec()) {
        this.$emit('addSpec', { specname: this.specname, plr: this.plr, kbps: this.kbps, delay: this.delay, qlen: this.qlen })
        this.$emit('triggerErrors', null)
        this.specname = null
        this.plr = null
        this.kbps = null
        this.delay = null
        this.qlen = null
      }
    },
    validateSpec () {
      if (this.specname == null || this.kbps == null) {
        this.$emit('triggerErrors', 'Spec: Please fill in all the fields')
        return false
      }
      if (this.specs.some(el => el.name === this.specname)) {
        this.$emit('triggerErrors', 'Spec: This spec already exists')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="css" scoped>
</style>
