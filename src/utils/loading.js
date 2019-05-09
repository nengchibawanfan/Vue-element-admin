import Vuex from 'vuex'
export default () => {
  return new Vuex.Store({
    state: {
      count: 0, // 应用初始化的数据
      vueElementLoading: false
    },
    mutations: { // 修改state的方法
      updateCount(state, num) {
        state.count = num
      },
      updateLoading(state, num) {
        state.vueElementLoading = num
      }
    }
  })
}
