const {register, login, getAllusersinfo, accessToken, getAmount, temp , registeruser, registeradmin} = require('../controllers/auth')
const router = require('express').Router()


router.post('/register', register)
router.post('/login', login)    
router.get("/users", getAllusersinfo)
router.get('/autenticate', accessToken)
router.get("/users/amount", getAmount)
router.post("/temperature", temp)
router.post("/register/user" , registeruser)
router.post("/register/admin" , registeradmin)
module.exports = router 
