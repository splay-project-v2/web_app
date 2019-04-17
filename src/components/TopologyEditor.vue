<template>
  <div class="topology-editor">
    <h2>Topology Editor</h2>

    <div class="topology-form">
      <app-topo-node-creator @addNode="addNode" :types="nodeTypes" :nodes="nodes"/>
      <app-topo-link-creator @addLink="addLink" :specs="specs" :nodes="nodes"/>
      <app-topo-spec-creator @addSpec="addSpec" :specTypes="specTypes"/>
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
              {{ edge.id }} | [delay({{edge.delay}}) - spec({{edge.spec}})] <font-awesome-icon icon="times" />
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
    generateXML () {
      var result = '<?xml version="1.0" encoding="ISO-8859-1"?>\n'
      result += '<topology>\n'

      if(this.nodes.length > 0) {
        result += '\t<vertices>\n'
        let counter = 1
        this.nodes.forEach((node) => {
          result += '\t\t<vertex int_idx="' + counter + '" role="' + node.nodeType + '" '
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
        let counter = 1
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
    width: 700px;
    height: 500px;
    border: solid grey 1px;
    border-radius: 3px;
  }
</style>
