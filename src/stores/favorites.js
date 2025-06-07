import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('favorites')) || []
  }),

  getters: {
    totalItems: (state) => state.items.length,
    isFavorite: (state) => (productId) => state.items.some(item => item.id === productId)
  },

  actions: {
    addItem(product) {
      if (!this.isFavorite(product.id)) {
        this.items.push(product)
        this.saveToLocalStorage()
      }
    },

    removeItem(productId) {
      const index = this.items.findIndex(item => item.id === productId)
      if (index > -1) {
        this.items.splice(index, 1)
        this.saveToLocalStorage()
      }
    },

    toggleItem(product) {
      if (this.isFavorite(product.id)) {
        this.removeItem(product.id)
      } else {
        this.addItem(product)
      }
    },

    clearFavorites() {
      this.items = []
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      localStorage.setItem('favorites', JSON.stringify(this.items))
    }
  }
})
