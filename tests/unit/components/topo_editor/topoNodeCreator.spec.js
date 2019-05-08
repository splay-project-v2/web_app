import { shallowMount } from '@vue/test-utils'
import TopoNodeCreator from '@/components/topo_editor/TopoNodeCreator.vue'
import BootstrapVue from 'bootstrap-vue'
const Vue = require('vue')
Vue.use(BootstrapVue)

describe('TopoNodeCreator', () => {
  const props = { types: [ 'virtualNode' ], nodes: []}
  const wrapper = shallowMount(TopoNodeCreator, { propsData: props })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('cannot save a new node if no info is provided', () => {
    expect(wrapper.vm.validateNode()).toBeFalsy()
  })

  it('cannot save a node if it already exists', () => {
    const props = { types: [ 'virtualNode'], nodes: [ { name: 'A' } ]}
    const wrapper = shallowMount(TopoNodeCreator, { propsData: props })
    wrapper.vm.nodeName = 'A'
    expect(wrapper.vm.validateNode()).toBeFalsy()
  })

  it('saves a node if name available', () => {
    wrapper.vm.nodeName = 'A'
    expect(wrapper.vm.validateNode()).toBeTruthy()
  })
})
