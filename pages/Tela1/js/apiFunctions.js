import oltFunction from './oltFunctions.js';
import states from './states.js';

function addOltConfigForm(event){
    event.preventDefault();

    const OltName = document.getElementById('modal-olt-name').value;
    const ipAddress = document.getElementById('modal-olt-ip').value;
    const Armario = document.getElementById('modal-olt-armario').value;
    const PowerdB = document.getElementById('modal-olt-powerdb').value;
    const maxClients = document.getElementById('selected-maxclients-value').value;
    const status = states.checkStatus(document.getElementById('flexSwitchCheckChecked').checked)

    const olt = { status, OltName, ipAddress, Armario, PowerdB, maxClients };
    const addressDB = 'http://192.168.249.254:3000';

    oltFunction.add_olt(addressDB, olt);
    const configsform = document.getElementById('formConfigModal');
    configsform.reset();

}

function changeOltConfigForm(event){
    event.preventDefault();
    const configsform = document.getElementById('formConfigModal');
    configsform.reset();
    configsform.setAttribute("onsubmit","addConfigsOLT(event)");
}

export default { addOltConfigForm, changeOltConfigForm };