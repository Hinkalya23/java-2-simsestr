<template>
  <AppHeader />
  <div class="order-page">
    <div class="order-container">
      <!-- Левая колонка - Товары -->
      <div class="order-column products-column">
        <h2 class="order-title">Ваш заказ</h2>

        <div class="products-list">
          <div class="product-card" v-for="item in cartItems" :key="item.id">
            <img :src="item.image" :alt="item.name" class="product-image" />

            <div class="product-details">
              <h3 class="product-name">{{ item.name }}</h3>

              <div class="product-controls">
                <div class="quantity-selector">
                  <button @click="decreaseQuantity(item.id)" class="qty-btn minus">-</button>
                  <span class="quantity">{{ item.quantity }}</span>
                  <button @click="increaseQuantity(item.id)" class="qty-btn plus">+</button>
                </div>

                <span class="product-price">{{ (item.price * item.quantity).toFixed(2) }} ₽</span>
              </div>
            </div>

            <button @click="removeFromCart(item.id)" class="remove-btn">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 7H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <path d="M10 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <path d="M14 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <path
                  d="M5 7L6 19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19L19 7"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M9 7V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V7"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="order-summary">
          <div class="summary-row">
            <span>Товары</span>
            <span>{{ baseTotalPrice.toFixed(2) }} ₽</span>
          </div>
          <div class="summary-row">
            <span>Доставка</span>
            <span>{{
              selectedDeliveryPrice > 0 ? selectedDeliveryPrice + ' ₽' : 'Бесплатно'
            }}</span>
          </div>
          <div class="summary-row total">
            <span>Итого</span>
            <span class="total-price">{{ calculatedTotalPrice }} ₽</span>
          </div>
        </div>
      </div>

      <!-- Правая колонка - Форма -->
      <div class="order-column form-column">
        <h2 class="order-title">Оформление заказа</h2>

        <!-- Контактные данные -->
        <div class="form-section">
          <h3 class="section-title">Контактные данные</h3>
          <div class="form-grid">
            <div class="form-group" v-for="field in registrationFields" :key="field.id">
              <label>{{ field.label }}</label>
              <input type="text" v-model="field.value" :placeholder="field.placeholder" />
            </div>
          </div>

          <div class="form-group newsletter-group">
            <label>Подписаться на новости и акции</label>
            <div class="toggle-buttons">
              <button :class="{ active: newsletter === 'yes' }" @click="newsletter = 'yes'">
                Да
              </button>
              <button :class="{ active: newsletter === 'no' }" @click="newsletter = 'no'">
                Нет
              </button>
            </div>
          </div>
        </div>

        <!-- Доставка -->
        <div class="form-section">
          <h3 class="section-title">Способ доставки</h3>
          <div class="delivery-cards">
            <div
              v-for="option in deliveryOptions"
              :key="option.id"
              class="delivery-card"
              :class="{ selected: selectedDelivery === option.id }"
              @click="selectDelivery(option)"
            >
              <div class="delivery-radio">
                <div
                  class="radio-circle"
                  :class="{ checked: selectedDelivery === option.id }"
                ></div>
              </div>
              <div class="delivery-info">
                <span class="delivery-name">{{ option.name }}</span>
                <span class="delivery-price" v-if="option.price > 0">{{ option.price }} ₽</span>
                <span class="delivery-price free" v-else>Бесплатно</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Оплата -->
        <div class="form-section">
          <h3 class="section-title">Способ оплаты</h3>
          <div class="payment-cards">
            <div
              v-for="method in paymentMethods"
              :key="method.id"
              class="payment-card"
              :class="{ selected: selectedPayment === method.id }"
              @click="selectedPayment = method.id"
            >
              <div class="payment-radio">
                <div class="radio-circle" :class="{ checked: selectedPayment === method.id }"></div>
              </div>
              <span class="payment-name">{{ method.name }}</span>
            </div>
          </div>
        </div>

        <!-- Комментарий -->
        <div class="form-section">
          <h3 class="section-title">Комментарий к заказу</h3>
          <textarea
            v-model="comment"
            placeholder="Ваши пожелания..."
            @input="handleCommentInput"
          ></textarea>
        </div>

        <!-- Соглашение -->
        <div class="agreement-section">
          <label class="agreement-checkbox">
            <input type="checkbox" v-model="agreementChecked" />
            <div class="custom-checkbox" :class="{ checked: agreementChecked }"></div>
            <span>Я согласен с <a href="#">условиями обработки</a> персональных данных</span>
          </label>
        </div>

        <!-- Кнопка оформления -->
        <button
          class="submit-btn"
          :disabled="!agreementChecked || !selectedDelivery || !selectedPayment"
          @click="submitOrder"
        >
          <span>Оформить заказ</span>
          <span class="total-price">{{ calculatedTotalPrice }} ₽</span>
        </button>
      </div>
    </div>
  </div>
  <AppFooter />
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import AppHeader from '@/components/header/appHeader.vue'
import AppFooter from '@/components/footer/appFooter.vue'

const store = useStore()

// Данные корзины
const cartItems = computed(() => store.getters.getCartItems || [])
const selectedDeliveryPrice = ref(0)
const selectedDelivery = ref(null)
const selectedPayment = ref(null)
const comment = ref('')

// Функции для работы с корзиной
const decreaseQuantity = (id) => store.dispatch('decreaseQuantity', id)
const increaseQuantity = (id) => store.dispatch('increaseQuantity', id)
const removeFromCart = (id) => store.dispatch('removeFromCart', id)

// Надежная очистка корзины
const clearCart = () => {
  // Создаем копию массива товаров, так как computed свойство нельзя изменять напрямую
  const itemsToRemove = [...cartItems.value]
  // Удаляем каждый товар по отдельности
  itemsToRemove.forEach((item) => {
    store.dispatch('removeFromCart', item.id)
  })
  // Дополнительная очистка на уровне хранилища
  store.dispatch('clearCart')
}

const selectDelivery = (option) => {
  selectedDelivery.value = option.id
  selectedDeliveryPrice.value = option.price
}

// Обработчик ввода комментария
const handleCommentInput = (e) => {
  comment.value = e.target.value
  e.target.style.height = 'auto'
  e.target.style.height = e.target.scrollHeight + 'px'
}

// Функция оформления заказа
const submitOrder = async () => {
  try {
    // Сначала создаем копию товаров
    const orderedItems = [...cartItems.value]

    // Затем очищаем корзину
    clearCart()

    // Формируем заказ после очистки корзины
    const order = {
      items: orderedItems,
      total: calculatedTotalPrice.value,
      delivery: deliveryOptions.value.find((d) => d.id === selectedDelivery.value),
      payment: paymentMethods.value.find((p) => p.id === selectedPayment.value),
      customer: Object.fromEntries(
        registrationFields.value.map((field) => [field.label, field.value]),
      ),
      comment: comment.value,
      newsletter: newsletter.value === 'yes',
      date: new Date().toISOString(),
    }

    console.log('Order submitted:', order)

    // Сбрасываем форму
    resetForm()

    alert(`Ваш заказ №${Math.floor(Math.random() * 10000)} успешно оформлен!`)
  } catch (error) {
    console.error('Ошибка при оформлении заказа:', error)
    alert('Произошла ошибка. Пожалуйста, попробуйте еще раз.')
  }
}

// Сброс формы
const resetForm = () => {
  registrationFields.value.forEach((field) => {
    field.value = ''
  })
  selectedDelivery.value = null
  selectedDeliveryPrice.value = 0
  selectedPayment.value = null
  comment.value = ''
  agreementChecked.value = false
  newsletter.value = 'no'
}

// Вычисляемые свойства
const baseTotalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
})

const calculatedTotalPrice = computed(() => {
  return (baseTotalPrice.value + selectedDeliveryPrice.value).toFixed(2)
})

// Данные формы
const registrationFields = ref([
  { id: 1, label: 'Электронная почта', value: '', placeholder: 'example@mail.com' },
  { id: 2, label: 'Телефон', value: '', placeholder: '+7 (___) ___-__-__' },
  { id: 3, label: 'Имя', value: '', placeholder: 'Как к вам обращаться?' },
  { id: 4, label: 'Фамилия', value: '', placeholder: 'Ваша фамилия' },
  { id: 5, label: 'Город', value: '', placeholder: 'Город доставки' },
  { id: 6, label: 'Индекс', value: '', placeholder: 'Почтовый индекс' },
  { id: 7, label: 'Адрес', value: '', placeholder: 'Улица, дом, квартира' },
])

const newsletter = ref('no')
const agreementChecked = ref(false)

const deliveryOptions = ref([
  { id: 1, name: 'Курьером по Москве (в пределах МКАД)', price: 350 },
  { id: 2, name: 'Доставка по России (СДЭК, Boxberry)', price: 150 },
  { id: 3, name: 'Самовывоз из нашего магазина', price: 0 },
])

const paymentMethods = ref([
  { id: 1, name: 'Онлайн-оплата картой' },
  { id: 2, name: 'При получении (наличные/карта)' },
  { id: 3, name: 'Перевод по реквизитам' },
])
</script>

<style scoped>
.order-page {
  background-color: #f8f8f8;
  min-height: 100vh;
  padding: 30px 0;
}

.order-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 30px;
  padding: 0 20px;
}

.order-column {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.order-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 25px;
  color: #2c3e50;
}

/* Стили для списка товаров */
.products-list {
  margin-bottom: 25px;
}

.product-card {
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}

.product-image {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-details {
  flex: 1;
}

.product-name {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #333;
}

.product-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.quantity-selector {
  display: flex;
  align-items: center;
  background: #f8f8f8;
  border-radius: 50px;
  padding: 5px 12px;
}

.qty-btn {
  width: 30px;
  height: 30px;
  border: none;
  background: #ff6b6b;
  color: white;
  border-radius: 50%;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.qty-btn:hover {
  background: #e05a5a;
}

.quantity {
  min-width: 30px;
  text-align: center;
  font-weight: 500;
  margin: 0 8px;
}

.product-price {
  font-weight: 600;
  font-size: 16px;
  color: #2c3e50;
}

.remove-btn {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  margin-left: 15px;
  transition: color 0.2s;
  padding: 5px;
}

.remove-btn:hover {
  color: #ff6b6b;
}

/* Итоговая сумма */
.order-summary {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 15px;
  color: #555;
}

.summary-row.total {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.total-price {
  font-weight: 700;
  color: #2c3e50;
}

/* Стили для формы */
.form-section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #2c3e50;
  display: flex;
  align-items: center;
}

.section-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #eee;
  margin-left: 15px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #555;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.2s;
  background: #fafafa;
}

.form-group input:focus {
  border-color: #ff6b6b;
  background: white;
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
  outline: none;
}

.newsletter-group label {
  margin-bottom: 12px;
}

.toggle-buttons {
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  width: fit-content;
}

.toggle-buttons button {
  padding: 12px 24px;
  border: none;
  background: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-buttons button.active {
  background: #ff6b6b;
  color: white;
}

/* Стили для доставки */
.delivery-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.delivery-card {
  display: flex;
  align-items: center;
  padding: 18px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.delivery-card.selected {
  border-color: #ff6b6b;
  background: #fff9f9;
}

.delivery-radio {
  margin-right: 15px;
}

.radio-circle {
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 50%;
  position: relative;
  transition: all 0.2s;
}

.radio-circle.checked {
  border-color: #ff6b6b;
}

.radio-circle.checked::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 10px;
  height: 10px;
  background: #ff6b6b;
  border-radius: 50%;
}

.delivery-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delivery-name {
  font-weight: 500;
}

.delivery-price {
  font-weight: 600;
  color: #2c3e50;
  margin-left: 15px;
}

.delivery-price.free {
  color: #4caf50;
}

/* Стили для оплаты */
.payment-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.payment-card {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.payment-card.selected {
  border-color: #ff6b6b;
  background: #fff9f9;
}

.payment-radio {
  margin-right: 15px;
}

.payment-name {
  font-weight: 500;
}

/* Комментарий */
textarea {
  white-space: pre-wrap;
  word-wrap: break-word;
  resize: vertical;
  min-height: 100px;
  width: 100%;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-family: inherit;
  font-size: 15px;
  background: #fafafa;
  transition: all 0.2s;
  line-height: 1.5;
}

textarea:focus {
  border-color: #ff6b6b;
  background: white;
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
  outline: none;
}

/* Соглашение */
.agreement-section {
  margin: 30px 0;
}

.agreement-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #555;
}

.agreement-checkbox input {
  display: none;
}

.custom-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 5px;
  margin-right: 12px;
  position: relative;
  transition: all 0.2s;
  flex-shrink: 0;
}

.custom-checkbox.checked {
  border-color: #ff6b6b;
  background: #ff6b6b;
}

.custom-checkbox.checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
}

.agreement-checkbox a {
  color: #ff6b6b;
  text-decoration: none;
}

.agreement-checkbox a:hover {
  text-decoration: underline;
}

/* Кнопка оформления */
.submit-btn {
  width: 100%;
  padding: 18px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
}

.submit-btn:hover {
  background: #e05a5a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.submit-btn .total-price {
  font-size: 18px;
  color: white;
}

@media (max-width: 768px) {
  .order-container {
    grid-template-columns: 1fr;
    padding: 0 15px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
