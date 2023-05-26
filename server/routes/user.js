const router = require('express').Router()
const {softDeleteRecord, getAllusersinfo} = require("../controllers/user")

router.get("/users", getAllusersinfo)
router.post("/users/:id", softDeleteRecord)


module.exports = router