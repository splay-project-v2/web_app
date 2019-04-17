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
  props: ['specTypes'],
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
      this.$emit('addSpec', {specname: this.specname, plr: this.plr, kbps: this.kbps, delay: this.delay, qlen: this.qlen})
    }
  }
}
</script>

<style lang="css" scoped>
</style>
