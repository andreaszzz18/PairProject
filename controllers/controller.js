const {Comment, Post, Profile, User} = require("../models");

class Controller{

  static renderHome(request, response){
    const id = request.session.userId;

    User.findByPk(id, {
      include: {
        all: true,
        nested: true
      }
    })
    .then(userData => {
      response.render('home', {userData});
    })
    .catch(err => {
      console.log(err);
      response.render(err);
    })

  }

}

module.exports = Controller;