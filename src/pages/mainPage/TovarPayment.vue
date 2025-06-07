<template>
  <AppHeader />
  <div class="new-page">
    <div class="catalog-items">
      <div class="catalog-item" v-for="item in items" :key="item.id">
        <img :src="item.image" alt="Item Image" class="item-image" />
        <p>{{ item.name }}</p>
        <p>Размер: {{ item.size }}</p>
        <p>Цвет: {{ item.color }}</p>
        <p>Состав: {{ item.material }}</p>
        <p>{{ item.price }} р.</p>
        <router-link
          :to="{
            name: 'ProductDetail',
            params: { id: item.id },
            query: { product: JSON.stringify(item) },
          }"
          class="learn-more-link"
        >
          <button class="learn-more">Подробнее</button>
        </router-link>
        <button
          class="add-to-favorites"
          @click="toggleFavorite(item)"
          :class="{ favorited: isFavorite(item.id) }"
        >
          {{ isFavorite(item.id) ? 'Удалить из избранного' : 'Добавить в избранное' }}
        </button>
        <button class="add-to-cart" @click="addToCart(item)">Добавить в корзину</button>
      </div>
    </div>
  </div>
  <AppFooter />
</template>

<script setup>
import AppFooter from '@/components/footer/appFooter.vue'
import AppHeader from '@/components/header/appHeader.vue'
import { useCartStore } from '@/stores/cart'
import { useFavoritesStore } from '@/stores/favorites'
import bear1 from '@/assets/img/bear1.jpg'

const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

const items = [
  {
    id: 1,
    name: 'Мишка с шарфом',
    price: '1000',
    size: '7см',
    color: 'Серый',
    material: 'Натуральная гипоаллергенная плюш',
    image: bear1,
    description:
      'Описание: Мишка Адель сшита из искусственного меха и вискозы. Мордочка вязаная из шерсти, тонирована вручную. Платье сшито из ситца, шитьё, декорировано атласным бантом. Единственный экземпляр, размер 7 см.',
    characteristics: {
      Модель: 'Мишка',
      Вес: '0.2 кг',
      Размер: '7 см',
      Цвет: 'Серый',
      Свойства: 'гипоаллергенный, экоматериалы',
      Состав: 'натуральный гипоаллергенный плюш',
      Наполнитель: 'холлофайбер, мягкое волокно',
    },
  },
  {
    id: 2,
    name: 'Мишка с шарфом',
    price: '10050',
    size: '7см',
    color: 'Серый',
    material: 'Натуральная гипоаллергенная плюш',
    image: bear1,
    description:
      'Описание: Мишка Адель сшита из искусственного меха и вискозы. Мордочка вязаная из шерсти, тонирована вручную. Платье сшито из ситца, шитьё, декорировано атласным бантом. Единственный экземпляр, размер 7 см.',
    characteristics: {
      Модель: 'Мишка',
      Вес: '0.2 кг',
      Размер: '7 см',
      Цвет: 'Серый',
      Свойства: 'гипоаллергенный, экоматериалы',
      Состав: 'натуральный гипоаллергенный плюш',
      Наполнитель: 'холлофайбер, мягкое волокно',
    },
  },
  {
    id: 3,
    name: 'Мишка с шарфом',
    price: '5000',
    size: '7см',
    color: 'Серый',
    material: 'Натуральная гипоаллергенная плюш',
    image: bear1,
    description:
      'Описание: Мишка Адель сшита из искусственного меха и вискозы. Мордочка вязаная из шерсти, тонирована вручную. Платье сшито из ситца, шитьё, декорировано атласным бантом. Единственный экземпляр, размер 7 см.',
    characteristics: {
      Модель: 'Мишка',
      Вес: '0.2 кг',
      Размер: '7 см',
      Цвет: 'Серый',
      Свойства: 'гипоаллергенный, экоматериалы',
      Состав: 'натуральный гипоаллергенный плюш',
      Наполнитель: 'холлофайбер, мягкое волокно',
    },
  },
  {
    id: 4,
    name: 'Мишка с шарфом',
    price: '7000',
    size: '7см',
    color: 'Серый',
    material: 'Натуральная гипоаллергенная плюш',
    image: bear1,
    description:
      'Описание: Мишка Адель сшита из искусственного меха и вискозы. Мордочка вязаная из шерсти, тонирована вручную. Платье сшито из ситца, шитьё, декорировано атласным бантом. Единственный экземпляр, размер 7 см.',
    characteristics: {
      Модель: 'Мишка',
      Вес: '0.2 кг',
      Размер: '7 см',
      Цвет: 'Серый',
      Свойства: 'гипоаллергенный, экоматериалы',
      Состав: 'натуральный гипоаллергенный плюш',
      Наполнитель: 'холлофайбер, мягкое волокно',
    },
  },
  {
    id: 5,
    name: 'Мишка с шарфом',
    price: '14000',
    size: '7см',
    color: 'Серый',
    material: 'Натуральная гипоаллергенная плюш',
    image: bear1,
    description:
      'Описание: Мишка Адель сшита из искусственного меха и вискозы. Мордочка вязаная из шерсти, тонирована вручную. Платье сшито из ситца, шитьё, декорировано атласным бантом. Единственный экземпляр, размер 7 см.',
    characteristics: {
      Модель: 'Мишка',
      Вес: '0.2 кг',
      Размер: '7 см',
      Цвет: 'Серый',
      Свойства: 'гипоаллергенный, экоматериалы',
      Состав: 'натуральный гипоаллергенный плюш',
      Наполнитель: 'холлофайбер, мягкое волокно',
    },
  },
  {
    id: 6,
    name: 'Мишка с шарфом',
    price: '10100',
    size: '7см',
    color: 'Серый',
    material: 'Натуральная гипоаллергенная плюш',
    image: bear1,
    description:
      'Описание: Мишка Адель сшита из искусственного меха и вискозы. Мордочка вязаная из шерсти, тонирована вручную. Платье сшито из ситца, шитьё, декорировано атласным бантом. Единственный экземпляр, размер 7 см.',
    characteristics: {
      Модель: 'Мишка',
      Вес: '0.2 кг',
      Размер: '7 см',
      Цвет: 'Серый',
      Свойства: 'гипоаллергенный, экоматериалы',
      Состав: 'натуральный гипоаллергенный плюш',
      Наполнитель: 'холлофайбер, мягкое волокно',
    },
  },
  // ... другие товары
]

const isFavorite = (id) => favoritesStore.isFavorite(id)
const toggleFavorite = (item) => favoritesStore.toggleItem(item)
const addToCart = (item) => cartStore.addItem(item)
</script>

<style scoped>
/* Стили остаются без изменений */
.new-page {
  padding: 20px;
  max-width: 1200px;
  margin: 20px auto;
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
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.catalog-item p {
  font-size: 1em;
  color: #333;
  margin: 5px 0;
}

.learn-more-link {
  text-decoration: none;
  display: inline-block;
  margin-top: 20px;
}

.learn-more {
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}

.learn-more:hover {
  background-color: #e05a5a;
}

.add-to-favorites {
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 20px;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.add-to-favorites:hover,
.add-to-favorites.favorited {
  background-color: #e05a5a;
}

.add-to-cart {
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 20px;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.add-to-cart:hover {
  background-color: #e05a5a;
}

@media (max-width: 768px) {
  .catalog-item {
    width: calc(50% - 20px);
  }
}

@media (max-width: 480px) {
  .catalog-item {
    width: 100%;
  }
}
</style>
