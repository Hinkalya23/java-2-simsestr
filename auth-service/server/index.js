import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const app = express()
const PORT = 3001
const JWT_SECRET = 'your-secret-key' // В продакшене используйте безопасный секретный ключ

app.use(cors())
app.use(express.json())

// Имитация базы данных
const users = []

// Middleware для проверки JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Требуется авторизация' })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Недействительный токен' })
    }
    req.user = user
    next()
  })
}

// Регистрация
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Проверка существования пользователя
    if (users.find(user => user.email === email)) {
      return res.status(400).json({ message: 'Пользователь уже существует' })
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10)

    // Создание нового пользователя
    const user = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword
    }

    users.push(user)

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

// Авторизация
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Поиск пользователя
    const user = users.find(u => u.email === email)
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }

    // Проверка пароля
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(400).json({ message: 'Неверный пароль' })
    }

    // Создание JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

// Получение информации о пользователе
app.get('/api/auth/user', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id)
  if (!user) {
    return res.status(404).json({ message: 'Пользователь не найден' })
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email
  })
})

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`)
})
