const express = require('express');
const router = express.Router();
const UserController = require("../controllers/userController")

router.get("/", UserController.loginRender);
router.post("/", UserController.loginProcess);

module.exports = router;