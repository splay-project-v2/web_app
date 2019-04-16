<template>
  <div class="topology-editor">
    <h2>Topology Editor</h2>
    <div class="topology-form">

      <app-topo-node-creator @addNode="addNode" :types="types" :nodes="nodes"/>
      <app-topo-link-creator @addLink="addLink" :specs="specs" :nodes="nodes"/>

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
      <div class="">
        {{ nodes }}
      </div>
      <div class="">
        <b-button type="button" v-for="node in nodes" @click="removeNode(node.name)"name="button">{{ node.name }}</b-button>
      </div>

      <h4>Edges</h4><br>
      <div class="">
        <b-button type="button" v-for="edge in edges" @click="removeEdge(edge.id)"name="button">{{ edge.id }}</b-button>
      </div>
      <div class="">
        {{ edges }}
      </div>

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
</template>

<script>
import TopoNodeCreator from '@/components/topo_editor/TopoNodeCreator'
import TopoLinkCreator from '@/components/topo_editor/TopoLinkCreator'
export default {
  components: {
    'app-topo-node-creator': TopoNodeCreator,
    'app-topo-link-creator': TopoLinkCreator
  },
  data(){
    return {
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
        elements: [],
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
    removeNode (nodename) {
      this.$cytoscape.instance.then(cy => {
        cy.remove(`#${nodename}`)
        this.nodes = this.nodes.filter((item) => {
          return item.name != nodename
        })
        this.edges = this.edges.filter((item) => {
          return item.source != nodename && item.target != nodename
        })
      })
    },
    removeEdge (edgeId) {
      this.$cytoscape.instance.then(cy => {
        cy.remove(`#${edgeId}`)
        this.edges = this.edges.filter((item) => {
          return item.id != edgeId
        })
      })
    },
    addNode (item) {
      this.$cytoscape.instance.then(cy => {
        cy.add([ {data: {id: item.id}} ])
        this.nodes.push({name: item.id, nodeType: item.type})
      })
    },
    addLink (item) {
      this.$cytoscape.instance.then(cy => {
        cy.add([ {data: {id: `link${item.source}${item.target}`, source: item.source, target: item.target}} ])
        this.edges.push({id: `link${item.source}${item.target}`, source: item.source, target: item.target, delay: item.linkDelay, spec: item.linkSpec})
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
