import { shallowMount } from '@vue/test-utils'
import TopoLinkCreator from '@/components/topo_editor/TopoLinkCreator.vue'
import BootstrapVue from 'bootstrap-vue'
const Vue = require('vue')
Vue.use(BootstrapVue)

describe('TopoLinkCreator', () => {
  const props = { specs: [ 'mySpec' ], nodes: [], edges: [] }
  const wrapper = shallowMount(TopoLinkCreator, { propsData: props })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('cannot save a new link if no info is provided', () => {
    expect(wrapper.vm.validateLink()).toBeFalsy()
  })

  it('cannot save a link if it already exists', () => {
    const props = { specs: [ 'mySpec' ], nodes: ['A', 'B'], edges: [ { id: 'linkAB' } ] }
    const wrapper = shallowMount(TopoLinkCreator, { propsData: props })
    wrapper.vm.source = 'A'
    wrapper.vm.target = 'B'
    wrapper.vm.linkSpec = 'mySpec'
    expect(wrapper.vm.validateLink()).toBeFalsy()
  })

  it('cannot save a link if same node as target and source', () => {
    wrapper.vm.source = 'A'
    wrapper.vm.target = 'A'
    wrapper.vm.linkSpec = 'mySpec'
    expect(wrapper.vm.validateLink()).toBeFalsy()
  })

  it('can save a new link if info are provided', () => {
    wrapper.vm.source = 'A'
    wrapper.vm.target = 'B'
    wrapper.vm.linkSpec = 'mySpec'
    wrapper.vm.linkDelay = 3000
    expect(wrapper.vm.validateLink()).toBeTruthy()
  })
})
