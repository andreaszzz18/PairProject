const express = require('express');
const router = express.Router();
const path = require('path')
const multer = require('multer')
const Controller = require("../controllers/controller");
const UserController = require("../controllers/userController")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
        cb(null, '../public')
      
  }, 
  filename: (req, file, cb) =>{
      cb(null, Date.now() + path.extname(file.originalname))
    
  }
})

const upload = multer({storage: storage})


router.get("/", UserController.redirectRegister);

router.get("/register", UserController.registerRender);
router.post("/register", UserController.registerCreate);
router.get("/login", UserController.loginRender);
router.post("/login", UserController.loginProcess);

router.use((request, response, next) => {
  if(!request.session.userId){
    const error = "Please login fist"

    response.redirect(`/login?errors?${error}`);
  }
  else{
    next()
  }
})

router.get("/home", Controller.renderHome);

module.exports = router;