<template>
  <div class="topology-editor">
    <h2>Topology Editor</h2>

    <b-alert
      variant="danger"
      dismissible
      fade
      :show="formErrors != null"
      @dismissed="formErrors=null"
    >
      {{formErrors}}
    </b-alert>

    <div class="topology-form">
      <app-topo-node-creator @addNode="addNode" :types="nodeTypes" :nodes="nodes" @triggerErrors="triggerErrors"/>
      <app-topo-link-creator @addLink="addLink" :specs="specs" :nodes="nodes" :edges="edges" @triggerErrors="triggerErrors"/>
      <app-topo-spec-creator @addSpec="addSpec" :specTypes="specTypes" :specs="specs" @triggerErrors="triggerErrors"/>
    </div>

    <b-row>

      <b-col>
        <div class="topology-recap">
          <h3>Elements</h3>
          <div>
            <h4>Nodes</h4>
            <b-button variant="outline-primary" size="sm" type="button" v-for="(node, index) in nodes" :key="index" @click="removeNode(node.name)" name="button">
              {{ node.name }} <font-awesome-icon icon="times" />
            </b-button>
          </div>

          <div>
            <h4>Edges</h4>
            <b-button variant="outline-primary" size="sm" type="button" v-for="(edge, index) in edges" :key="index" @click="removeEdge(edge.id)" name="button">
              {{ edge.id }} | [delay({{edge.delay}}ms) - spec({{edge.spec}})] <font-awesome-icon icon="times" />
            </b-button>
          </div>

          <div>
            <h4>Specs</h4>
            <b-button variant="outline-primary" size="sm" type="button" v-for="(spec, index) in specs" :key="index" @click="removeSpec(spec.name)" name="button">
              {{ spec.name }} | [plr({{spec.plr}}) kbps({{spec.kbps}}) delay({{spec.delay}}ms) qlen({{spec.qlen}})] <font-awesome-icon icon="times" />
            </b-button>
          </div>

        </div>
      </b-col>

      <b-col>
        <div class="topology-diagram">
          <cytoscape :config="config"/>
        </div>
      </b-col>

    </b-row>

    <div class="xml-result">
        <h1>XML</h1>
        <button type="button" name="button" @click="generateXML()">Gen XML</button><br>
        {{ xml }}
    </div>

  </div>
</template>

<script>
const XML_BUILDER = require('xmlbuilder');
import TopoNodeCreator from '@/components/topo_editor/TopoNodeCreator'
import TopoLinkCreator from '@/components/topo_editor/TopoLinkCreator'
import TopoSpecCreator from '@/components/topo_editor/TopoSpecCreator'
export default {
  components: {
    'app-topo-node-creator': TopoNodeCreator,
    'app-topo-link-creator': TopoLinkCreator,
    'app-topo-spec-creator': TopoSpecCreator
  },
  data(){
    return {
      xml: null,
      formErrors: null,
      nodes: [],
      edges: [],
      specs: [],
      nodeTypes: ['virtnode', 'gateway'],
      specTypes: ['transit-transit', 'client-stub', 'stub-stub', 'stub-transit'],
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
    removeSpec (specname) {
      this.specs = this.specs.filter((item) => {
        item.name != specname
      })
    },
    addNode (item) {
      this.$cytoscape.instance.then(cy => {
        cy.add([ {data: {id: item.id}, position: this.randomNodePos()} ])
        this.nodes.push({name: item.id, nodeType: item.type})
      })
    },
    addLink (item) {
      this.$cytoscape.instance.then(cy => {
        cy.add([ {data: {id: `link${item.source}${item.target}`, source: item.source, target: item.target}} ])
        this.edges.push({id: `link${item.source}${item.target}`, source: item.source, target: item.target, delay: item.linkDelay, spec: item.linkSpec})
      })
    },
    addSpec (item) {
      this.specs.push({name: item.specname, plr: item.plr, kbps: item.kbps, delay: item.delay, qlen: item.qlen})
    },
    randomNodePos () {
      return {x: (Math.floor(Math.random() * 600) + 30), y: (Math.floor(Math.random() * 450) + 30)}
    },
    triggerErrors (message) {
      this.formErrors = message
    },
    generateXML () {
      var xml = XML_BUILDER.create('topology', {version: '1.0', encoding: 'ISO-8859-1'})
      if(this.nodes.length > 0) {
        var xmlVertices = xml.ele('vertices')
        let counter = 1
        this.nodes.forEach((node) => {
          var item = xmlVertices.ele('vertex')
          item.att('int_idx', counter)
          item.att('role', node.nodeType)
          if(node.nodeType == "virtnode") item.att('int_vn', counter)
          counter++
        })
      }
      if(this.edges.length > 0) {
        var xmlEdges = xml.ele('edges')
        let counter = 1
        this.edges.forEach((edge) => {
          var item = xmlEdges.ele('edge')
          item.att('int_idx', counter); item.att('int_src', edge.source); item.att('int_dst', edge.target);
          if(edge.delay != null) item.att('int_delayms', edge.delay)
          if(edge.spec != null) item.att('specs', edge.spec)
          counter++
        })
      }
      if(this.specs.length > 0) {
        var xmlSpecs = xml.ele('specs')
        this.specs.forEach((spec) => {
          var item = xmlSpecs.ele(spec.name)
          item.att('dbl_plr', spec.plr); item.att('dbl_kbps', spec.kbps); item.att('int_delayms', spec.delay); item.att('int_qlen', spec.qlen);
        })
      }
      this.xml = xml.doc().end()
    }
  }
}
</script>

<style lang="css" scoped>
  .topology-diagram {
    width: 700px;
    height: 500px;
    border: solid grey 1px;
    border-radius: 3px;
  }
</style>
