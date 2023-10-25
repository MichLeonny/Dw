const dBServer = 'http://localhost:3000'

var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");


btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
})

function login(event){
    event.preventDefault();
    const email = document.getElementById('loginEmail').value
    const pass = document.getElementById('loginPass').value
    
    data = { "email":email, "pass":pass };
    users(data);

}

async function buscarnoBanco(){
    const url = `${dBServer}/users`
    const usuarios = await fetch(url);
    return await usuarios.json()


}

async function users(dataform) {
    const dbusers = await buscarnoBanco();
    if (validateLogin(dataform, dbusers)){
        logado()
    } else {
        erroLogin();
    }
}

function validateLogin(dataform, dbusers){

    for (const user of dbusers){
        if ((dataform.email === user.userEmail) && (dataform.pass === user.userPassword)){
            return true;
        }
    }
    return false;
}

function logado(){
    window.location.href= "./pages/Tela1/index.html"
}

function erroLogin(){
    const tagError = document.getElementById('loginError');

    const form = document.getElementById('loginForm');
    const loginField = document.getElementById('loginEmail');
    const passwField = document.getElementById('loginPass');
    tagError.innerHTML = "Acesso Negado";
}
function clearError(){
    const form = document.getElementById('loginError').innerText = '';

}

async function regUser(event){
    event.preventDefault()
    const userName = document.getElementById('nameRegForm').value;
    const userEmail = document.getElementById('emailRegForm').value;
    const userPassword = document.getElementById('passRegForm').value;

    let newUser = { userName, userEmail, userPassword };

    const teste = await newUserDB(newUser);
}

async function newUserDB(userData){

    const url = `${dBServer}/Users`;
    const config = {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(userData),
      };
    
    const response = await fetch(url, config);
    const test = await response.json();
    console.log(test);
    
}