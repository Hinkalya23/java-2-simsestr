<template>
  <div class="products-container">
    <h2>Наши товары</h2>
    <div class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name" class="product-image">
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>
          <p class="product-price">{{ product.price }} ₽</p>
          <div class="product-actions">
            <button @click="addToCart(product)" class="btn btn-primary">В корзину</button>
            <button @click="toggleFavorite(product)" class="btn btn-secondary">
              {{ isFavorite(product) ? '❤️' : '🤍' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useCartStore } from '@/stores/cart'
import { useFavoritesStore } from '@/stores/favorites'

export default {
  name: 'ProductsView',
  setup() {
    const products = ref([])
    const cartStore = useCartStore()
    const favoritesStore = useFavoritesStore()

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products')
        products.value = response.data
      } catch (error) {
        console.error('Ошибка при загрузке продуктов:', error)
      }
    }

    const addToCart = (product) => {
      cartStore.addItem(product)
    }

    const toggleFavorite = (product) => {
      favoritesStore.toggleItem(product)
    }

    const isFavorite = (product) => {
      return favoritesStore.isFavorite(product.id)
    }

    onMounted(() => {
      fetchProducts()
    })

    return {
      products,
      addToCart,
      toggleFavorite,
      isFavorite
    }
  }
}
</script>

<style scoped>
.products-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 1rem;
}

.product-description {
  color: #666;
  margin: 0.5rem 0;
}

.product-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #4CAF50;
  margin: 0.5rem 0;
}

.product-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
}

.btn-primary:hover {
  background-color: #45a049;
}

.btn-secondary {
  background-color: #f5f5f5;
  color: #333;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}
</style>
