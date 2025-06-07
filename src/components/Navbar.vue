<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">Магазин плюшевых мишек</router-link>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">Главная</router-link>
        <router-link to="/tovar" class="navbar-item">Товары</router-link>
        <router-link to="/oplata" class="navbar-item">Доставка и оплата</router-link>
        <router-link to="/contact" class="navbar-item">Контакты</router-link>
      </div>

      <div class="navbar-end">
        <router-link to="/favorites" class="navbar-item">
          Избранное ({{ favoritesStore.totalItems }})
        </router-link>
        <router-link to="/cart" class="navbar-item">
          Корзина ({{ cartStore.totalItems }})
        </router-link>
        <template v-if="authStore.isAuthenticated">
          <span class="navbar-item">Привет, {{ authStore.getUser?.username }}</span>
          <a @click="handleLogout" class="navbar-item">Выйти</a>
        </template>
        <template v-else>
          <router-link to="/login" class="navbar-item">Войти</router-link>
          <router-link to="/register" class="navbar-item">Регистрация</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useFavoritesStore } from '@/stores/favorites'
import { useRouter } from 'vue-router'

export default {
  name: 'NavbarComponent',
  setup() {
    const authStore = useAuthStore()
    const cartStore = useCartStore()
    const favoritesStore = useFavoritesStore()
    const router = useRouter()

    const handleLogout = () => {
      authStore.logout()
      router.push('/login')
    }

    return {
      authStore,
      cartStore,
      favoritesStore,
      handleLogout
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  margin-left: 2rem;
}

.navbar-start, .navbar-end {
  display: flex;
  gap: 1rem;
}

.navbar-item {
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.navbar-item:hover {
  background-color: #f5f5f5;
}

.navbar-end .navbar-item {
  cursor: pointer;
}
</style>
