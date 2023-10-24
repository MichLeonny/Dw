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
    const usuarios = await fetch('http://192.168.249.254:3000/users');
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
    console.log("Não Logado");
}