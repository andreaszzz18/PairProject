const express = require('express');
const router = express.Router();
const UserController = require("../controllers/userController")

router.get("/", UserController.registerRender);
router.post("/", UserController.userCreate);
router.get("/:id", UserController.profileRegisterRender)
router.post("/:id", UserController.profileCreate)

module.exports = router;