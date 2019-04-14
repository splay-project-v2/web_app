<template>
  <div class="container">
    <div class="topology-editor">
      <h2>Topology Editor</h2>
      <div class="topology-form">

        <b-form @submit.prevent="addNode">
          <div class="row">
            <div class="form-group col-xs-4">
              <b-form-input type="text" placeholder="Node name" v-model="nodename"/>
            </div>
            <div class="form-group col-xs-4">
              <b-form-select v-model="nodeType">
                <option disabled value=null>Node Type</option>
                <option v-for="type in types">
                  {{ type }}
                </option>
              </b-form-select>
            </div>
            <div class="form-group col-xs-4">
              <b-button variant="primary" type="submit">Add node</b-button>
            </div>
          </div>
        </b-form>

        <b-form @submit.prevent="addLink">
          <div class="row">
            <div class="form-group col-xs-4">
              <b-form-input type="text" placeholder="Link name" v-model="linkname"/>
            </div>
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
              <b-form-input type="text" placeholder="Link Delay (ms)" v-model="linkdelay"/>
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

        <b-form @submit.prevent="addSpec">
          <div class="row">
            <div class="form-group col-xs-6">
              <b-form-input type="text" v-model="specname" placeholder="Name"/>
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



      </div>

      <div class="topology-recap">
        Recap <br>
        <h4>Nodes</h4><br>
        {{ nodes }} <br><br>
        <h4>Edges</h4><br>
        {{ edges }} <br><br>
        <h4>Specs</h4><br>
        {{ specs }} <br><br>

      </div>

      <div class="topology-diagram">
        <cytoscape :config="config"/>
      </div>

      <div class="xml-result">
          <h1>XML</h1>
          <button type="button" name="button" @click="generateXML()">Gen XML</button><br>
          {{ xml }}
      </div>

    </div>
  </div>


</template>

<script>

export default {
  data(){
    return {
      nodename: null,
      nodeType: null,

      source: null,
      target: null,
      linkname: null,
      linkSpec: null,
      linkdelay: null,

      specname: null,
      plr: null,
      kbps: null,
      delay: null,
      qlen: null,

      xml: null,

      nodes: [],
      edges: [],
      specs: [],
      types: ['virtnode', 'gateway'],
      config: {
        elements: [
        //   { // node a
        //     data: { id: 'a' }
        //   }, { // node b
        //     data: { id: 'b' }
        //   }, { // edge ab
        //     data: { id: 'ab', source: 'a', target: 'b' }
        //   }
        ],
        style: [
          {
            selector: 'node',
            style: {
              'background-color': '#666',
              'label': 'data(id)'
            }
          }, {
            selector: 'edge',
            style: {
              'width': 1,
              'curve-style': 'bezier',
              'line-color': '#ccc',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle'
            }
          }
        ],
        zoom: 1/1.5,
        pan: { x: 50, y: 50 },

         // interaction options:
        minZoom: 1/2,
        maxZoom: 5,
        zoomingEnabled: false,
        userZoomingEnabled: false
      }
    }
  },
  methods: {
    addNode () {
      this.$cytoscape.instance.then(cy => {
        cy.add([ {data: {id: this.nodename}} ])
        this.nodes.push({name: this.nodename, nodeType: this.nodeType})
      })
    },
    addLink () {
      this.$cytoscape.instance.then(cy => {
        cy.add([ {data: {id: this.linkname, source: this.source, target: this.target}} ])
        this.edges.push({id: this.linkname, source: this.source, target: this.target, delay: this.linkdelay, spec: this.linkSpec})
      })
    },
    addSpec () {
      this.specs.push({name: this.specname, plr: this.plr, kbps: this.kbps, delay: this.delay, qlen: this.qlen})
    },
    generateXML () {
      var result = '<?xml version="1.0" encoding="ISO-8859-1"?>\n'
      result += '<topology>\n'

      if(this.nodes.length > 0) {
        result += '\t<vertices>\n'
        var counter = 1
        this.nodes.forEach((node) => {
          result += '\t\t<vertex int_idx="' + counter + '" int_src="' + node.nodeType + '" '
          if(node.nodeType == "virtnode"){
            result += 'int_vn="' + counter + '" '
          }
          result += '/>\n'
          counter++
        })
        result += '\t</vertices>\n'
      }

      if(this.edges.length > 0) {
        result += '\t<edges>\n'
        var counter = 1
        this.edges.forEach((edge) => {
          result += '\t\t<vertex int_idx="' + counter + '" int_src="' + edge.source + '" int_dst="' + edge.target + '" specs="' + edge.spec + '" '
          if(edge.delay != null){
            result += 'int_delayms="' + edge.delay + '" '
          }
          result += '/>\n'
          counter++
        })
        result += '\t</edges>\n'
      }

      if(this.specs.length > 0) {
        result += '\t<specs>\n'
        this.specs.forEach((spec) => {
          result += '\t\t<' + spec.name + ' dbl_plr="' + spec.plr + '" dbl_kbps="' + spec.kbps + '" int_delayms="' + spec.delay + '" int_qlen="' + spec.qlen + '" />\n'
        })
        result += '\t</specs>\n'
      }

      result += '</topology>'
      this.xml = result
    }
  }
}
</script>

<style lang="css" scoped>
  .topology-diagram {
    width: 900px;
    height: 500px;
    border: solid grey 1px;
    border-radius: 3px;
  }
</style>
