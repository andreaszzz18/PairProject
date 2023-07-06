const express = require('express');
const router = express.Router();
const path = require('path')
const multer = require('multer')
const registerRouter = require('./registerRouter')
const loginRouter = require('./loginRouter');
const Controller = require("../controllers/controller");
const UserController = require("../controllers/userController")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
        cb(null, './public')
      
  }, 
  filename: (req, file, cb) =>{
      cb(null, Date.now() + path.extname(file.originalname))
    
  }
})
const upload = multer({storage: storage})

router.use(express.static('views'))

router.get("/", UserController.redirectLogin);
router.use("/login", loginRouter)
router.use("/register", registerRouter)

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
router.get("/edit/profile/:id", UserController.editProfileRender);
router.post("/edit/profile/:id", UserController.editProfileProcess);

module.exports = router;