import axios from 'axios'

const state = {
  token: localStorage.getItem('token') || '',
  user: JSON.parse(localStorage.getItem('user')) || null,
  status: ''
}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  currentUser: state => state.user
}

const actions = {
  async login({ commit }, user) {
    try {
      const response = await axios.post('/api/auth/login', user)
      const token = response.data.token
      const userData = response.data.user

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))

      commit('AUTH_SUCCESS', { token, user: userData })
      return response
    } catch (error) {
      commit('AUTH_ERROR')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      throw error
    }
  },

  async register({ commit }, user) {
    try {
      const response = await axios.post('/api/auth/register', user)
      return response
    } catch (error) {
      commit('AUTH_ERROR')
      throw error
    }
  },

  logout({ commit }) {
    commit('LOGOUT')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}

const mutations = {
  AUTH_SUCCESS(state, { token, user }) {
    state.status = 'success'
    state.token = token
    state.user = user
  },
  AUTH_ERROR(state) {
    state.status = 'error'
  },
  LOGOUT(state) {
    state.status = ''
    state.token = ''
    state.user = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
