<template>
  <AppHeader />
  <div class="product-detail">
    <div class="product-image">
      <img :src="product.image" alt="Product Image" class="item-image" />
    </div>
    <div class="product-info">
      <h1>{{ product.name }}</h1>
      <p class="product-price">{{ product.price }} р.</p>

      <div class="product-description">
        <p v-for="(line, index) in product.description.split('\n')" :key="'desc' + index">
          {{ line }}
        </p>
      </div>

      <div class="product-characteristics">
        <h2>Характеристики:</h2>
        <ul>
          <li v-for="(value, key) in product.characteristics" :key="key">
            <strong>{{ key }}:</strong> {{ value }}
          </li>
        </ul>
      </div>

      <div class="product-actions">
        <div class="quantity-control">
          <button @click="decreaseQuantity">-</button>
          <span>{{ quantity }}</span>
          <button @click="increaseQuantity">+</button>
        </div>
        <button
          class="add-to-favorites"
          @click="toggleFavorite(product)"
          :class="{ favorited: isFavorite(product.id) }"
        >
          {{ isFavorite(product.id) ? 'Удалить из избранного' : 'Добавить в избранное' }}
        </button>
        <button class="add-to-cart" @click="addToCart">В корзину</button>
      </div>
    </div>
  </div>
  <AppFooter />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/header/appHeader.vue'
import AppFooter from '@/components/footer/appFooter.vue'

const store = useStore()
const route = useRoute()
const quantity = ref(1)

const product = ref({
  id: 0,
  name: '',
  price: '',
  size: '',
  color: '',
  material: '',
  image: '',
  description: '',
  characteristics: {},
})

onMounted(() => {
  if (route.query.product) {
    product.value = JSON.parse(route.query.product as string)
  }
})

const isFavorite = (id) => store.getters.isFavorite(id)

const toggleFavorite = (item) => {
  store.dispatch('toggleFavorite', item)
}

const addToCart = () => {
  store.dispatch('addToCart', {
    ...product.value,
    quantity: quantity.value,
    price: parseFloat(product.value.price),
  })
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const increaseQuantity = () => {
  quantity.value++
}
</script>

<style scoped>
.product-detail {
  display: flex;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  gap: 40px;
}

.product-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.product-image img {
  max-width: 100%;
  max-height: 500px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.product-info {
  flex: 1;
  padding: 20px;
}

.product-info h1 {
  font-size: 28px;
  margin-bottom: 15px;
  color: #2c3e50;
}

.product-price {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ff6b6b;
}

.product-description {
  margin-bottom: 30px;
  line-height: 1.6;
  color: #555;
}

.product-characteristics {
  margin-bottom: 30px;
}

.product-characteristics h2 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #2c3e50;
}

.product-characteristics ul {
  list-style: none;
  padding: 0;
}

.product-characteristics li {
  margin-bottom: 10px;
  font-size: 16px;
}

.product-characteristics li strong {
  color: #333;
}

.product-actions {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 5px;
  border: 1px solid #ddd;
  border-radius: 25px;
  padding: 5px 10px;
}

.quantity-control button {
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.quantity-control button:hover {
  background: #f5f5f5;
}

.quantity-control span {
  width: 30px;
  text-align: center;
  font-weight: 500;
}

.add-to-favorites,
.add-to-cart {
  padding: 12px 25px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 25px;
  transition: all 0.3s;
}

.add-to-favorites {
  background: none;
  border: 1px solid #ff6b6b;
  color: #ff6b6b;
}

.add-to-favorites:hover,
.add-to-favorites.favorited {
  background: #ff6b6b;
  color: white;
}

.add-to-cart {
  background-color: #ff6b6b;
  color: white;
  border: none;
}

.add-to-cart:hover {
  background-color: #e05a5a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
}

@media (max-width: 768px) {
  .product-detail {
    flex-direction: column;
    padding: 20px;
  }

  .product-image img {
    max-height: 350px;
  }

  .product-actions {
    justify-content: center;
  }
}
</style>
