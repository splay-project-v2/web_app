import { shallowMount } from '@vue/test-utils'
import Home from '@/pages/Home.vue'

describe('Home', () => {
  it('is a Vue instance', () => {
    const auth = { isAuth: false }
    const wrapper = shallowMount(Home, {
      propsData: { auth }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('welcomes signed in user', () => {
    const auth = { isAuth: true, username: 'John' }
    const wrapper = shallowMount(Home, {
      propsData: { auth }
    })
    expect(wrapper.html()).toContain(`<h1 class="text-center">Welcome John</h1>`)
  })

  it('welcomes unsigned in user', () => {
    const auth = { isAuth: false }
    const wrapper = shallowMount(Home, {
      propsData: { auth }
    })
    expect(wrapper.html()).toContain(`<h1 class="text-center">Welcome to Splay</h1>`)
  })
})
