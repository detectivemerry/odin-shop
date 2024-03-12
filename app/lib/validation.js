
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
export { isValidQuantity, isValidEmail }