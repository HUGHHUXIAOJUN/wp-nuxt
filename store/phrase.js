import { SET_PHRASE_LIST } from './mutations-types'

export const state = () => ({
  list: []
})

export const mutations = {
  [SET_PHRASE_LIST] (state, data) {
    state.list = data
  }
}

export const actions = {
  async getPhraseList ({ commit }) {
    try {
      const { data } = await this.$axios.$get(`/wp-json/xm-blog/v1/get-phrase`)
      commit(SET_PHRASE_LIST, data.data)
      return Promise.resolve(data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
