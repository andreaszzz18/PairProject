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

  static addPostRender(request, response){
    response.render("addPost");
  }

  static addPostProcess(request, response){
    const id = request.session.userId;
    const {title, imageURL, caption} = request.body
    Post.create({title, imageURL, caption, UserId: id})
    .then(() => {
      response.redirect("/home")
    })
    .catch(err => {
      console.log(err);
      response.render(err);
    })
  }

  static addCommend(request, response){
    const PostId = request.params.id;
    const UserId = request.session.userId;
    const {content} = request.body;

    Comment.create({content, UserId, PostId})
    .then(() => {
      response.redirect("/home")
    })
    .catch(err => {
      console.log(err);
      response.render(err);
    })
  }

}

module.exports = Controller;