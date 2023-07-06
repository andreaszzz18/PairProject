const {Comment, Post, Profile, User} = require("../models");

class Controller{

  static renderHome(request, response){
    const id = request.session.userId;

    const result = {};
    User.findByPk(id, {
      include: Profile
    })
    .then(userData => {
      result.userData = userData;

      return Post.findAllWithAllAssosiate()
    })
    .then((postData) => {
      result.postData = postData;

      response.render('home', result);
      // response.send(result)
    })
    .catch(err => {
      console.log(err);
      response.render(err);
    })

  }

}

module.exports = Controller;