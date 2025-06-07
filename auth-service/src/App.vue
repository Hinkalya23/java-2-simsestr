<template>
  <div id="app">
    <nav class="navbar">
      <div class="container">
        <router-link to="/" class="navbar-brand">Главная</router-link>
        <div class="navbar-nav">
          <template v-if="isAuthenticated">
            <span class="nav-item">Привет, {{ currentUser.name }}</span>
            <button @click="logout" class="btn btn-link">Выйти</button>
          </template>
          <template v-else>
            <router-link to="/login" class="nav-item">Войти</router-link>
            <router-link to="/register" class="nav-item">Регистрация</router-link>
          </template>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    const router = useRouter()

    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
    const currentUser = computed(() => store.getters['auth/currentUser'])

    const logout = async () => {
      await store.dispatch('auth/logout')
      router.push('/login')
    }

    return {
      isAuthenticated,
      currentUser,
      logout
    }
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.navbar {
  background-color: #333;
  padding: 1rem;
  color: white;
}

.navbar-brand {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.navbar-nav {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-item {
  color: white;
  text-decoration: none;
}

.btn-link {
  color: white;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.mt-4 {
  margin-top: 2rem;
}
</style>
