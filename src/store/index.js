import { createStore } from 'vuex'
import auth from './modules/auth'

export default createStore({
  state: {
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
  },
  mutations: {
    ADD_TO_FAVORITES(state, item) {
      if (!state.favorites.some((fav) => fav.id === item.id)) {
        state.favorites.push(item)
        localStorage.setItem('favorites', JSON.stringify(state.favorites))
      }
    },
    REMOVE_FROM_FAVORITES(state, itemId) {
      state.favorites = state.favorites.filter((fav) => fav.id !== itemId)
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
    ADD_TO_CART(state, item) {
      const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        existingItem.quantity += item.quantity || 1
      } else {
        state.cartItems.push({ ...item, quantity: item.quantity || 1 })
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    REMOVE_FROM_CART(state, itemId) {
      state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== itemId)
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    DECREASE_QUANTITY(state, itemId) {
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId)
      if (item && item.quantity > 1) {
        item.quantity -= 1
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
      }
    },
    INCREASE_QUANTITY(state, itemId) {
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId)
      if (item) {
        item.quantity += 1
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
      }
    },
    CLEAR_CART(state) {
      state.cartItems = []
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
  },
  actions: {
    toggleFavorite({ commit, state }, item) {
      if (state.favorites.some((fav) => fav.id === item.id)) {
        commit('REMOVE_FROM_FAVORITES', item.id)
      } else {
        commit('ADD_TO_FAVORITES', item)
      }
    },
    addToCart({ commit }, item) {
      commit('ADD_TO_CART', item)
    },
    removeFromCart({ commit }, itemId) {
      commit('REMOVE_FROM_CART', itemId)
    },
    decreaseQuantity({ commit }, itemId) {
      commit('DECREASE_QUANTITY', itemId)
    },
    increaseQuantity({ commit }, itemId) {
      commit('INCREASE_QUANTITY', itemId)
    },
    clearCart({ commit }) {
      commit('CLEAR_CART')
    },
  },
  getters: {
    isFavorite: (state) => (id) => state.favorites.some((fav) => fav.id === id),
    getFavorites: (state) => state.favorites,
    getCartItems: (state) => state.cartItems,
    getCartTotal: (state) => {
      return state.cartItems.reduce((total, item) => {
        return total + parseFloat(item.price) * item.quantity
      }, 0)
    },
  },
  modules: {
    auth
  }
})
