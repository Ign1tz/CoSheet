function login_function () {
    console.log('login function')
    let xhr = new XMLHttpRequest();
    xhr.onload = async function () {
        if (xhr.status === 200) {

        }
    }
    xhr.open("GET", "profile/login", true);
    xhr.send();
}