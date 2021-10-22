const express = require('express')
const app = express()
const Route = express.Router()
const passport = require('passport')
const initializeUser = require('../strategy-local')
initializeUser(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

app.use(passport.initialize())

const users = []

Route.get('/', (req, res) => {
    res.render('main.ejs')
})
Route.get('/login', (req, res) => {
    res.render('login.ejs')
})
Route.get('/register', (req, res) => {
    res.render('register.ejs')
})

module.exports = Route