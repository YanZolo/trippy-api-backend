const LocalStrategy = require('passport-local').Strategy
// const express = require('express')
// const app = express()
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if (user == null) return done(null, false, { message: 'Not user with this email' })
        try {
            if (bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'password incorrect' })
            }
        } catch (e){
            return done(e)
        }

    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => { return done(null, user.id) })
    passport.deserializeUser((id, done) => { return done(null, getUserById(id))})
}

module.exports = initialize