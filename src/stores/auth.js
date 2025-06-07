import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user
  },

  actions: {
    async register(userData) {
      try {
        const response = await axios.post('http://localhost:8081/api/auth/register', userData)
        this.setAuthData(response.data)
        return response.data
      } catch (error) {
        console.error('Ошибка регистрации:', error)
        throw error
      }
    },

    async login(credentials) {
      try {
        const response = await axios.post('http://localhost:8081/api/auth/login', credentials)
        this.setAuthData(response.data)
        return response.data
      } catch (error) {
        console.error('Ошибка входа:', error)
        throw error
      }
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    setAuthData(data) {
      this.token = data.token
      this.user = data.user
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      // Устанавливаем токен для всех последующих запросов
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    }
  }
})
