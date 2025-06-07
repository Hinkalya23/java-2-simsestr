<template>
  <div class="register-container">
    <h2>Регистрация</h2>
    <form @submit.prevent="handleSubmit" class="register-form">
      <div class="form-group">
        <label for="username">Имя пользователя:</label>
        <input
          type="text"
          id="username"
          v-model="form.username"
          required
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          required
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="password">Пароль:</label>
        <input
          type="password"
          id="password"
          v-model="form.password"
          required
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="firstName">Имя:</label>
        <input
          type="text"
          id="firstName"
          v-model="form.firstName"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="lastName">Фамилия:</label>
        <input
          type="text"
          id="lastName"
          v-model="form.lastName"
          class="form-control"
        />
      </div>

      <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
    </form>

    <p class="mt-3">
      Уже есть аккаунт?
      <router-link to="/login">Войти</router-link>
    </p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'Register',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const form = ref({
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    })

    const handleSubmit = async () => {
      try {
        await authStore.register(form.value)
        router.push('/')
      } catch (error) {
        console.error('Ошибка регистрации:', error)
      }
    }

    return {
      form,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-control {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn {
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
}

.btn-primary:hover {
  background-color: #45a049;
}

.mt-3 {
  margin-top: 1rem;
}
</style>
