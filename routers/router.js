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
router.post("/commend/add/:id", Controller.addCommend)

router.get("/edit/:id/profile", UserController.editProfileRender);
router.post("/edit/:id/profile/", UserController.editProfileProcess);

router.get('/post/add/', Controller.addPostRender)
router.post('/post/add/', Controller.addPostProcess)

router.get("/post/edit/:id", Controller.postEditRender)
router.post("/post/edit/:id", Controller.postEdit)

router.get("/post/delete/:id", Controller.postDestroy)

router.get("/post/likes/:id", Controller.likePlus)

router.get("/logout", UserController.logout)

module.exports = router;