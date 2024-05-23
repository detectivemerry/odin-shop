import error from "../Products/error";

function isValidQuantity(value){
    let isWholeNumberAndPositive = /^\d+$/.test(value);
    let isWithinRange = value >= 0 && value <= 20
    return isWholeNumberAndPositive && isWithinRange
}

function isValidEmail(email){
    return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

function isValidUsername(username){
   /* 
    Usernames can only have: 
    - Alphanumeric characters
    - Dots (.)
    - Underscores (_)
    - Must have 6 to 50 characters
  */
    return /^[a-zA-Z0-9_\.]{6,50}$/.test(username);
}

function isValidPassword(password){
    /*
    Passwords needs to have
    - One special character
    - One upper case letter
    - One lower case letter
    - One number
    - At least 4 Characters
    */
    return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{4,}$/.test(password);
}

function isValidRegisterForm(data){ //{username : .., password: .., email: ..}

    let errorMessages = []
    
    if(!isValidEmail(data.email)){
        errorMessages.push("Please enter a valid email!")
    }
    if(!isValidPassword(data.password)){
        errorMessages.push("Please enter a valid password. A passwords requires at least 4 characters and one special character, lower case letter, upper case letter and number!")
    }
    if(!isValidUsername(data.username)){
        errorMessages.push("Please enter a valid username. A username can only have alphanumeric numbers, dots, underscores and 6 to 50 characters!")
    }

    return errorMessages;
}

export { isValidQuantity, isValidEmail, isValidUsername, isValidPassword, isValidRegisterForm }