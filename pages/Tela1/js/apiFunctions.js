import oltFunction from './oltFunctions.js';
import states from './states.js';

function configsOLTadd(event){
    event.preventDefault();

    const OltName = document.getElementById('modal-olt-name').value;
    const ipAddress = document.getElementById('modal-olt-ip').value;
    const Armario = document.getElementById('modal-olt-armario').value;
    const PowerdB = document.getElementById('modal-olt-powerdb').value;
    const maxClients = document.getElementById('selected-maxclients-value').value;
    const status = states.checkStatus(document.getElementById('flexSwitchCheckChecked').checked)

    const olt = { status, OltName, ipAddress, Armario, PowerdB, maxClients };
    const addressDB = 'http://143.208.202.11:3000';

    oltFunction.add_olt(addressDB, olt);
    const configsform = document.getElementById('formConfigModal');
    configsform.reset();

}

export default { configsOLTadd };