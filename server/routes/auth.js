const {register, login, allUser, logout, accessToken} = require('../controllers/auth')
const router = require('express').Router()

router.post('/register', register)
router.get('/allUser', allUser)
router.post('/login', login)
router.post('/logout', logout)
router.get('/autenticate', accessToken)

module.exports = router