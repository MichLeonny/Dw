import oltFunction from './oltFunctions.js'
import Status from './states.js'

async function main(ip){
    const OLTS = await checkOLTsDB(ip)

    for (const olt of OLTS) {
        const status = Status.checkStatus(olt.status);
        //console.log(olt)  // Duvida: Porque a tabela está preenchendo em ordem diferente
        oltFunction.add_olt(ip, olt);

    }
    
    window.deleteOlt = oltFunction.remove_olt;
}

async function checkOLTsDB(ipDB){
    const url = `${ipDB}` + '/OLTs';
    const data = await fetch(url);
    return await data.json();
    

}

const ipDB = 'http://192.168.249.254:3000' //Duvida: Como criar variaveis ambiente para o projeto
await main(ipDB)