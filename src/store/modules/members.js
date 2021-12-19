import { api } from 'src/boot/axios'

const state = {
  users: []
}

const getters = {
}

const mutations = {
  SET_USERS: (state, payload) => {
    state.users = payload
  }
}

const actions = {
  GET_USERS: ({ state, commit }, payload) => {
    api.get('/admin/members')
      .then(response => {
        commit('SET_USERS', response.data.users)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
