const {Comment, Post, Profile, User} = require("../models");

class Controller{

  static renderHome(request, response){
    response.render('home')
  }

}

module.exports = Controller;