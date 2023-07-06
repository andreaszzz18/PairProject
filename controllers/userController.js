const {User, Profile} = require("../models")
const bcrypt = require('bcryptjs');
const { validationCategory, showError } = require('../helpers/helper')

class UserController{
    static redirectLogin(request,response){
        response.redirect("/login");
    }

    static registerRender(request, response){
    
        
        let errors = request.query
        
        let errorCategory = {}
        if(errors.errorValidation){
            errorCategory = validationCategory(errors.errorValidation.split(","))
        }

        console.log(errorCategory)

        response.render("register", {errorCategory, showError});
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
            if(err.name === "SequelizeValidationError"){
                let message = err.errors.map(el =>{
                    return el.message
                })

                response.redirect(`/register?errorValidation=${message}`)

            }else{
                response.send(err);
            }

            
        });
    }

    static profileRegisterRender(request, response){
        const id = request.params.id;

        let errors = request.query
        let errorCategory = {}
        if(errors.errorValidation){
            errorCategory = validationCategory(errors.errorValidation.split(","))
        }

        response.render("registerProfile", {id, errorCategory, showError})
    }

    static profileCreate(request, response){
        const id = request.params.id;
        const {name, dateOfBirth, gender} = request.body;

        let imageURL = ""
        if(request.file){
            imageURL = `http://localhost:3000/images/${request.file.filename}`
        }
        
        

        Profile.create({name, dateOfBirth, gender, imageURL, UserId:id})
        .then(() => response.redirect("/login"))
        .catch(err => {
            if(err.name === "SequelizeValidationError"){
                let message = err.errors.map(el =>{
                    return el.message
                })
                response.redirect(`/register/${id}?errorValidation=${message}`)
                // response.send(message)

            }else{
                response.send(err);
            }
            
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