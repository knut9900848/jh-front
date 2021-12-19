import { api, axios } from 'src/boot/axios'

const state = {
  user: {
    id: '',
    email: '',
    name: ''
  }
}

const getters = {
}

const mutations = {
  SET_USER: (state, payload) => {
    state.user.id = payload.id
    state.user.email = payload.email
    state.user.name = payload.name
  },

  RESET_USER: (state) => {
    state.user.id = ''
    state.user.email = ''
    state.user.name = ''
  }
}

const actions = {
  LOGIN: ({ commit }, payload) => {
    axios.get('http://localhost/sanctum/csrf-cookie').then(response => {
      api.post('/login', { email: payload.email, password: payload.password })
        .then(response => {
          commit('SET_USER', response.data.user)
          window.location.href = '/'
        })
    })
  },

  LOG_OUT: ({ commit }) => {
    api.post('/logout')
      .then(response => {
        commit('RESET_USER')
        window.location.href = '/login'
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
