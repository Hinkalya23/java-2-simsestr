<template>
  <AppHeader />
  <div class="contacts-page">
    <div class="container">
      <h1 class="page-title">Контакты</h1>

      <div class="contacts-grid">
        <!-- Блок с контактной информацией -->
        <div class="contacts-info">
          <div class="contact-card">
            <h2 class="section-title">Наши контакты</h2>
            <div class="contact-item">
              <svg class="contact-icon" viewBox="0 0 24 24">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                />
              </svg>
              <div>
                <h3>Адрес</h3>
                <p>Россия, Ростов-на-Дону, пл. Гагарина, 1</p>
                <p>Донской государственный технический университет</p>
              </div>
            </div>

            <div class="contact-item">
              <svg class="contact-icon" viewBox="0 0 24 24">
                <path
                  d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                />
              </svg>
              <div>
                <h3>Email</h3>
                <p>info@donstu.ru</p>
              </div>
            </div>

            <div class="contact-item">
              <svg class="contact-icon" viewBox="0 0 24 24">
                <path
                  d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"
                />
              </svg>
              <div>
                <h3>Телефон</h3>
                <p>+7 (111) 111-11-11</p>
                <p>+7 (863) 111-11-11</p>
              </div>
            </div>

            <div class="contact-item">
              <svg class="contact-icon" viewBox="0 0 24 24">
                <path
                  d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"
                />
              </svg>
              <div>
                <h3>Часы работы</h3>
                <p>Пн-Пт: 8:30 - 17:00</p>
                <p>Сб: 9:00 - 14:00</p>
                <p>Вс: выходной</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Форма обратной связи -->
        <div class="feedback-form">
          <h2 class="section-title">Форма обратной связи</h2>
          <form @submit.prevent="submitFeedback">
            <div class="form-group">
              <label for="name">Ваше имя</label>
              <input type="text" id="name" v-model="feedback.name" required />
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="feedback.email" required />
            </div>

            <div class="form-group">
              <label for="phone">Телефон</label>
              <input type="tel" id="phone" v-model="feedback.phone" />
            </div>

            <div class="form-group">
              <label for="message">Сообщение</label>
              <textarea id="message" v-model="feedback.message" required></textarea>
            </div>

            <button type="submit" class="submit-btn">Отправить</button>
          </form>
        </div>
      </div>

      <!-- Карта ДГТУ -->
      <div class="map-section">
        <h2 class="section-title">Мы на карте</h2>
        <div class="map-container">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p&amp;source=constructor"
            width="100%"
            height="400"
            frameborder="0"
          ></iframe>
        </div>
        <div class="map-annotation">
          <p>Главный корпус Донского государственного технического университета</p>
        </div>
      </div>
    </div>
  </div>
  <AppFooter />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/header/appHeader.vue'
import AppFooter from '@/components/footer/appFooter.vue'

const feedback = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const submitFeedback = () => {
  console.log('Форма отправлена:', feedback.value)
  alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.')
  feedback.value = {
    name: '',
    email: '',
    phone: '',
    message: '',
  }
}
</script>

<style scoped>
/* Основные стили остаются без изменений */
.contacts-page {
  padding: 40px 0;
  background-color: #f9f9f9;
  min-height: calc(100vh - 120px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 40px;
  text-align: center;
}

.contacts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 40px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 10px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background-color: #ff6b6b;
}

.contact-card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.contact-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
}

.contact-icon {
  width: 24px;
  height: 24px;
  fill: #ff6b6b;
  margin-right: 15px;
  flex-shrink: 0;
  margin-top: 3px;
}

.contact-item h3 {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 5px;
}

.contact-item p {
  font-size: 16px;
  color: #555;
  line-height: 1.5;
  margin: 0;
}

.feedback-form {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 16px;
  color: #555;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #ff6b6b;
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.submit-btn {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 14px 30px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
}

.submit-btn:hover {
  background-color: #e05a5a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
}

.map-section {
  margin-top: 40px;
}

.map-container {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
}

.map-annotation {
  text-align: center;
  font-size: 14px;
  color: #666;
  font-style: italic;
}

@media (max-width: 768px) {
  .contacts-grid {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: 28px;
  }

  .section-title {
    font-size: 20px;
  }
}
</style>
