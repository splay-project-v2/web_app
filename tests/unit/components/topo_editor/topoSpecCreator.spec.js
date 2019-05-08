import { shallowMount } from '@vue/test-utils'
import TopoSpecCreator from '@/components/topo_editor/TopoSpecCreator.vue'
import BootstrapVue from 'bootstrap-vue'
const Vue = require('vue')
Vue.use(BootstrapVue)

describe('TopoSpecCreator', () => {
  const props = { specs: [] }
  const wrapper = shallowMount(TopoSpecCreator, { propsData: props })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('cannot save a new spec if no info is provided', () => {
    expect(wrapper.vm.validateSpec()).toBeFalsy()
  })

  it('cannot save a new spec if only name is provided', () => {
    let wrapper = shallowMount(TopoSpecCreator, { propsData: props })
    wrapper.vm.specname = 'foo'
    expect(wrapper.vm.validateSpec()).toBeFalsy()
  })

  it('cannot save a new spec if only rate is provided', () => {
    let wrapper = shallowMount(TopoSpecCreator, { propsData: props })
    wrapper.vm.kbps = 600
    expect(wrapper.vm.validateSpec()).toBeFalsy()
  })

  it('cannot save a spec if it already exists', () => {
    const props = { specs: [ { name: 'mySpec'} ] }
    const wrapper = shallowMount(TopoSpecCreator, { propsData: props })
    wrapper.vm.specname = 'mySpec'
    expect(wrapper.vm.validateSpec()).toBeFalsy()
  })

  it('saves a spec if name available and rate is provided', () => {
    wrapper.vm.kbps = 600
    wrapper.vm.specname = 'foo'
    expect(wrapper.vm.validateSpec()).toBeTruthy()
  })
})
