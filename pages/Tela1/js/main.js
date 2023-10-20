import oltFunction from './oltFunctions.js'

async function main(){
    const OLTS = await viewData()

    for (const pon of OLTS) {
        oltFunction.add_olt(pon);
    }
    
    window.deleteOlt = oltFunction.remove_olt;
}

async function viewData(){
    const data = await fetch('http://143.208.202.11:3000/OLTs');
    return await data.json();
    

}

await main()