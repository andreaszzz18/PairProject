const {User} = require("../models")
const bcrypt = require('bcryptjs');

class UserController{
    static redirectRegister(request,response){
        response.redirect("/register");
    }

    static registerRender(request, response){
        response.render("register");
    }

    static registerCreate(request, response){
        const {userName, email, password, dateOfBirth} = request.body;

        User.create({userName, email, password, dateOfBirth})
        .then(() => response.redirect("/login"))
        .catch(err => {
            console.log(err);
            response.send(err);
        });
    }
    
    static loginRender(request, response){
        response.render('login'); 
    }

    static loginProcess(request, response){
        const {email, password} = request.body

        User.findOne({where: {email}})
        .then(user => {
            if(user){
                const validationPass = bcrypt.compareSync(password, user.password);
                if(validationPass){
                    request.session.userId = user.id; //set session di usercontroller login
                    request.session.isAdmin = user.isAdmin;

                    return response.redirect('/home')
                }
                else{
                    const error = "Invalid Username or Password"
                    response.redirect(`/login/?errors/${error}`)
                }
            }
            else{
                const error = "Invalid Username or Password"
                response.redirect(`/login/?errors/${error}`)
            }
        })
        .catch(err => {
            console.log(err);
            response.send(err);
        });
    }
}

module.exports = UserController;