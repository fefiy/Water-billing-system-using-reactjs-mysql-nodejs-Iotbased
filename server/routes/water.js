const router = require("express").Router()
const {getAmount, temp, watertracking,  waterttracking } = require("../controllers/water")

router.get('/waterusage', getAmount)
router.post("/temperature", temp)
router.post("/waterTrack", waterttracking)


module.exports = router