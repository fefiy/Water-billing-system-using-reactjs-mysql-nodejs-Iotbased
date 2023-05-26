const {register, login, getAllusersinfo, accessToken, temp , registeruser, registeradmin} = require('../controllers/auth')
const router = require('express').Router()


router.post('/register', register)
router.post('/login', login)    
router.get('/autenticate', accessToken)

module.exports = router 
