const router = require('express').Router()
const {softDeleteRecord, getAllusersinfo, singleUser} = require("../controllers/user")

router.get("/users", getAllusersinfo)
router.post("/users/:id", softDeleteRecord)
router.get("/users/:id", singleUser)


module.exports = router