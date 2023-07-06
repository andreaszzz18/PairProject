const {User, Profile} = require("../models")
const bcrypt = require('bcryptjs');

class UserController{
    static redirectLogin(request,response){
        response.redirect("/login");
    }

    static registerRender(request, response){
        response.render("register");
    }

    static userCreate(request, response){
        const {userName, email, password} = request.body;

        console.log(userName, email, password)

        User.create({userName, email, password})
        .then((user) =>{
            response.redirect(`/register/${user.id}`)
            // response.send(user)
        })
        .catch(err => {
            console.log(err);
            response.send(err);
        });
    }

    static profileRegisterRender(request, response){
        const id = request.params.id;
        response.render("registerProfile", {id})
    }

    static profileCreate(request, response){
        const id = request.params.id;
        const {name, dateOfBirth, gender, imageURL} = request.body;

        console.log(id, name, dateOfBirth, gender, imageURL)

        Profile.create({name, dateOfBirth, gender, imageURL, UserId:id})
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