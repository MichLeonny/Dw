import oltFunction from './oltFunctions.js'
import Status from './states.js'

async function main(ip){
    const OLTS = await viewData(ip)

    for (const olt of OLTS) {
        const status = Status.checkStatus(olt.status);
        if ( status === 1){
            const slots = await oltFunction.checkSlots(ip, olt);
            oltFunction.add_olt(olt,slots);
        } else {       
        }
    }
    
    window.deleteOlt = oltFunction.remove_olt;
}

async function viewData(ip){
    const url = `${ip}` + '/OLTs';
    const data = await fetch(url);
    return await data.json();
    

}

const ipDB = 'http://143.208.202.11:3000'
await main(ipDB)