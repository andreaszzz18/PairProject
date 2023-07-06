const express = require('express');
const router = express.Router();
const path = require('path')
const multer = require('multer')
const Controller = require("../controllers/controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
        cb(null, '../public')
      
  }, 
  filename: (req, file, cb) =>{
      cb(null, Date.now() + path.extname(file.originalname))
    
  }
})

const upload = multer({storage: storage})


router.get('/', (req, res) => {
  res.redirect('/upload')
})

router.get('/upload', (req, res) => {
  res.render('view')
})

router.post("/upload", upload.single('image'), (req, res) =>{
  res.send('Image uploaded')
})


module.exports = router;