<template>
  <div class="container">
    <a class="d-none" download="log.txt" ref="dynamicDL"></a>
    <div class="text-center">
      <b-button block variant="primary" v-on:click="dynamicDownloadLog">⤓ Download</b-button>
      <b-button block v-on:click="copyToClipboard">📋 Copy to Clipboard</b-button>
    </div>
    <pre class="mt-3">{{ logData }}</pre>
  </div>
</template>

<script>
export default {
  name: 'LogsView',
  data () {
    return {}
  },
  methods: {
    copyToClipboard () {
      const text = this.logData
      const txt = document.createElement('textarea')
      document.body.appendChild(txt)
      txt.value = text
      txt.textContent = text
      var sel = getSelection()
      var range = document.createRange()
      range.selectNode(txt)
      sel.removeAllRanges()
      sel.addRange(range)
      document.execCommand('copy')
      document.body.removeChild(txt)
    },
    dynamicDownloadLog () {
      const text = this.logData
      var blob = new Blob([text], { type: 'text' })
      var a = this.$refs.dynamicDL
      a.href = URL.createObjectURL(blob)
      a.dataset.downloadurl = ['text', a.download, a.href].join(':')
      a.click()
      setTimeout(function () {
        URL.revokeObjectURL(a.href)
      }, 2500)
    }
  },
  props: {
    logData: String
  },
  components: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
