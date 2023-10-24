async function buscarnoBanco(){
    const usuarios = await fetch('http://143.208.202.11:3000/users');
    return await usuarios.json()


}

async function users(trylogin) {
    const dbusers = await buscarnoBanco();
    for (const user of dbusers){
        validateLogin(trylogin, user)
    }
}

function validateLogin(trylogin, dbusers){
    if (trylogin.user === dbusers.login) {
        if (trylogin.password === dbusers.passwd) {
            console.log("logged");    
        } else {
            console.log("Not Logged")
        }
    } else {
        console.log("Not Logged")
    }
}


tryLogin = {
        "user": "icaro",
        "password": "1234"
    }

console.log(tryLogin);
users(tryLogin);

