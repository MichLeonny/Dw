async function buscarnoBanco(){
    const usuarios = await fetch('http://143.208.202.11:3000/users');
    return await usuarios.json()


}

async function users(dataform) {
    const dbusers = await buscarnoBanco();
    for (const user of dbusers){
        console.log("Teste")
        //validateLogin(dataform, user)
    }
}

function validateLogin(dataform, dbusers){

    if ((dataform.email === dbusers.login) && (dataform.pass === dbusers.passwd)){
            console.log("logged");    
        } else {
            console.log("Not Logged")
    }
}

export default { users };