function validationCategory(errorData){
  const errors = {
    username: [],
    email: [],
    password: [],
    name: [],
    date: [],
    image: [],
    gender: []
  }

  const listError = errorData.map(el =>{
    let splittedString = el.split(" ")
    
    return splittedString
  })

  for(let i = 0; i < listError.length; i++){
    for(let j = 0; j < listError[i].length; j++){

      if(listError[i][j].toLowerCase() === "username"){
        errors.username.push(listError[i].join(" "))
        break
      }

      if(listError[i][j].toLowerCase() === "email"){
        errors.email.push(listError[i].join(" "))
        break
      }

      if(listError[i][j].toLowerCase() === "password"){
        errors.password.push(listError[i].join(" "))
        break
      }

      if(listError[i][j].toLowerCase() === "name"){
        errors.name.push(listError[i].join(" "))
        break
      }

      if(listError[i][j].toLowerCase() === "date"){
        errors.date.push(listError[i].join(" "))
        break
      }

      if(listError[i][j].toLowerCase() === "image"){
        errors.image.push(listError[i].join(" "))
        break
      }

      if(listError[i][j].toLowerCase() === "gender"){
        errors.gender.push(listError[i].join(" "))
        break
      }
    }
  }

  return errors
}

function showError(errorData){
  const errors = []

  for(let el of errorData){
    let splittedString = el.split(" ")
    
    if(splittedString[splittedString.length-1] === "required"){
      errors.push(el)
      break
    }else{
      
      errors.push(el)
    }
  }

  return errors
}

module.exports = {validationCategory, showError}