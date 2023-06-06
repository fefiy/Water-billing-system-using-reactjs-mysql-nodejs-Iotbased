const router = require("express").Router()
const {getAmount, temp, watertracking,  waterttracking, sendEmail, waterRate } = require("../controllers/water")

router.get('/waterusage', getAmount)
router.post("/temperature", temp)
router.post("/waterTrack", waterttracking)
router.post("/waterbill", waterRate)


module.exports = router