import { shallowMount } from '@vue/test-utils'
import Home from '@/pages/Home.vue'

describe('Home.vue', () => {
  it('is a Vue instance', () => {
    const auth = { isAuth: false }
    const wrapper = shallowMount(Home, {
      propsData: { auth }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
