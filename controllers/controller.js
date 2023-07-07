const { response } = require("express");
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

  static postEditRender(request, response){
    const id = request.params.id;

    Post.findByPk(id)
    .then((postDatum) => {
      response.render("editPost", {postDatum})
    })
    .catch(err => {
      console.log(err);
      response.render(err);
    })
  }
  static postEdit(request, response){
    const id = request.params.id;
    const {title, imageURL, caption} = request.body;

    Post.update({title, imageURL, caption},{where:{id:id}})
    .then(() => {
      response.redirect("/home")
    })
    .catch(err => {
      console.log(err);
      response.render(err);
    })
  }

  static postDestroy(request, response){
    const id = request.params.id;

    Post.destroy({
      where: {
        id
      }
    })
    .then(() => {
      response.redirect("/home")
    })
    .catch(err => {
      console.log(err);
      response.render(err);
    })
  }

  static likePlus(request, response){
    const id = request.params.id;

    Post.findByPk(id)
    .then(post => {
      let likes = post.likes;
      likes++;
      return Post.update({likes}, {where:{id}})
    })
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