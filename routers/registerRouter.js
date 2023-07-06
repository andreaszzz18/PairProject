const express = require('express');
const router = express.Router();
const UserController = require("../controllers/userController")
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
          cb(null, './public')
        
    }, 
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname))
      
    }
  })

router.get("/", UserController.registerRender);
router.post("/", UserController.userCreate);
router.get("/:id", UserController.profileRegisterRender)
router.post("/:id", UserController.profileCreate)

module.exports = router;