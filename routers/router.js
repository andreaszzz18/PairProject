const express = require('express');
const router = express.Router();
const path = require("path")
const multer = require('multer')
const Controller = require("../controllers/controller");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      if(err){
        cb(err)
      }else{
        cb(null, './public')
      }
  }, 
  filename: (req, file, cb) =>{
    if(err){
      cb(err)
    }else{
      cb(null, Date.now() + path.extname(file.originalname))
    }
  }
})
const upload = multer({storage: storage})






module.exports = router;