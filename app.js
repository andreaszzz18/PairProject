const express = require('express');
const app = express();
const port = 3000;
const router = require("./routers/router");
const session = require('express-session');

app.set("view engine", "ejs");
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));
app.use(session({
  secret: 'kuda terbang',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, 
    secure: false, //kalau udah mau deploy true
    sameSite: true //Security cookie, jangan keambil cookie kita
  } 
}))

app.use(router);

app.listen(port, () => {
  console.log(`UWAW ${port}`)
})