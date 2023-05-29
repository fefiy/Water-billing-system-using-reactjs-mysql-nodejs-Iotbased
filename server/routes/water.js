const router = require("express").Router()
const {getAmount, temp, watertracking,  waterttracking, sendEmail } = require("../controllers/water")

router.get('/waterusage', getAmount)
router.post("/temperature", temp)
router.post("/waterTrack", waterttracking)
router.post("/email", sendEmail)


module.exports = router