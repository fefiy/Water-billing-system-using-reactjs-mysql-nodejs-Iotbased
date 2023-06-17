const router = require("express").Router();
const {
  getAmount,
  temp,
  waterttracking,
  waterRate,
  getWaterRate,
  allPaymentStatus,
  waterTotalAmount,
  updateWaterState,
  getWaterState,
} = require("../controllers/water");

router.get("/waterusage", getAmount);
router.post("/temperature", temp);
router.post("/waterTrack", waterttracking);
router.post("/waterbill", waterRate);
router.get("/billrate", getWaterRate);
router.get("/totalwater", waterTotalAmount);
router.get("/totalpayment", allPaymentStatus);
router.post("/updatewaterstate/:id", updateWaterState)
router.get("/waterState/:macAddress", getWaterState)

module.exports = router;
