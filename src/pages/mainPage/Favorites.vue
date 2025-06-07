<template>
  <div class="favorites-page">
    <h1>Избранное</h1>
    <div v-if="favorites.length === 0" class="empty-favorites">
      <p>Ваш список избранного пуст.</p>
    </div>
    <div v-else class="catalog-items">
      <div class="catalog-item" v-for="item in favorites" :key="item.id">
        <div class="item-image">
          <img :src="item.image" :alt="item.name" />
        </div>
        <p>{{ item.name }}</p>
        <p>Размер: {{ item.size }}</p>
        <p>Цвет: {{ item.color }}</p>
        <p>Состав: {{ item.material }}</p>
        <p>{{ item.price }} р.</p>
        <button class="remove-from-favorites" @click="removeFromFavorites(item.id)">
          Удалить из избранного
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const favorites = computed(() => store.getters.getFavorites)

const removeFromFavorites = (itemId: number): void => {
  store.commit('REMOVE_FROM_FAVORITES', itemId)
}
</script>

<style scoped>
.favorites-page {
  padding: 20px;
  max-width: 1200px;
  margin: 20px auto;
  text-align: center;
}

.empty-favorites {
  font-size: 1.2em;
  color: #666;
  margin-top: 20px;
}

.catalog-items {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.catalog-item {
  text-align: center;
  width: calc(33.333% - 20px);
  box-sizing: border-box;
  background-color: #ffe6e6;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.item-image {
  width: 100%;
  height: 300px;
  margin-bottom: 15px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.catalog-item p {
  font-size: 1em;
  color: #333;
  margin: 5px 0;
}

.remove-from-favorites {
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 20px;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.remove-from-favorites:hover {
  background-color: #e05a5a;
}
</style>
