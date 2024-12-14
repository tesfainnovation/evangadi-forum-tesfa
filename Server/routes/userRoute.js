const express = require("express");
const router = express.Router();
const {
  rejester,
  login,
  checkuser,
  userInfo,
} = require("../controller/userController");
const middleware = require("../middleware/auth");

router.post("/rejester", rejester);
router.post("/login", login);
router.get("/check", middleware, checkuser);
router.get("/info", userInfo);

module.exports = router;
