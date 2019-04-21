<template lang="html">
  <b-form @submit.prevent="sendSpec">
    <div class="row">
      <div class="form-group col-xs-4">
        <b-form-select v-model="specname">
          <option v-for="(type, index) in specTypes" :key="index">
            {{ type }}
          </option>
        </b-form-select>
      </div>
      <div class="form-group col-xs-6">
        <b-form-input type="text" v-model="plr" placeholder="Packet Loss rate"/>
      </div>
      <div class="form-group col-xs-6">
        <b-form-input type="text" v-model="kbps" placeholder="Kbps"/>
      </div>
      <div class="form-group col-xs-6">
        <b-form-input type="text" v-model="delay" placeholder="Delays(ms)"/>
      </div>
      <div class="form-group col-xs-6">
        <b-form-input type="text" v-model="qlen" placeholder="Qlen"/>
      </div>
      <div class="form-group col-xs-6">
        <b-button variant="primary" type="submit">Add Spec</b-button>
      </div>
    </div>
  </b-form>
</template>

<script>
export default {
  props: ['specTypes', 'specs'],
  data () {
    return {
      specname: this.specTypes[0],
      plr: null,
      kbps: null,
      delay: null,
      qlen: null
    }
  },
  methods: {
    sendSpec () {
      if(this.validateSpec()){
        this.$emit('addSpec', {specname: this.specname, plr: this.plr, kbps: this.kbps, delay: this.delay, qlen: this.qlen})
        this.$emit('triggerErrors', null)
        this.specname = this.specTypes[0]
        this.plr = null
        this.kbps = null
        this.delay = null
        this.qlen = null
      }
    },
    validateSpec() {
      if(this.specname == null || this.plr == null || this.kbps == null || this.delay == null || this.qlen == null){
        this.$emit('triggerErrors', 'Spec: Please fill in all the fields')
        return false
      }
      if (this.specs.some(el => el.name === this.specname)){
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
