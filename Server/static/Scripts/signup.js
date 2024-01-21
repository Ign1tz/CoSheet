function signup_function() {
    //console.log('signup function')
    let xhr = new XMLHttpRequest();
    xhr.onload = async function() {
        if (xhr.status === 200) {

        }
    }
    xhr.open("GET", "profile/signup", true);
    xhr.send();
}