import states from './states.js'

function add_olt(data){

    let status = data.status;
    const name = data.OltName;
    const ip = data.ipAddress;
    const armario = data.Armario;
    const powerdb = data.PowerdB;
    const maxclients = data.maxClients;
    let config = ''

    const checkStatus = states.checkStatus(status);

    if (checkStatus == 1){
        status = 'statusOnline'
    } else {
        status = 'statusOffline'
    }

    const linha = `<tr id="${status}-${ip}">
                        <th scope="row">
                        <div class="${status}"></div>
                        </th>
                    
                        <td>${name}</td>
                        <td>${armario}</td>
                        <td>${powerdb}</td>
                        <td>${maxclients}</td>
                        <td>${ip}</td>
                        <td>
                            <span id="configIcon" class="clickIcon">
                                <a class="dropdown-item" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#configModal">
                                    <iconify-icon icon="vscode-icons:file-type-light-config" width="27" height="29"></iconify-icon>
                                </a>
                            </span>
                        </td>
                        <td>
                            <span class="clickIcon clickDelete" onclick="deleteOlt('${status}-${name}-${ip}')">
                                <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalRemove">
                                <iconify-icon icon="bx:trash" width="27" height="29"></iconify-icon>
                            </span>
                        </td>
                    </tr>`

    
    const tabela = document.querySelector('table tbody');
    tabela.insertAdjacentHTML('beforeend', linha);

}

function remove_olt(rmdata){
    const oltdata = rmdata.split('-', 3)

    // const modal_remove = `
    //         <div class="modal fade" id="modalRemove" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //             <div class="modal-dialog">
    //                 <div class="modal-content">
    //                     <div class="modal-header">
    //                         <h1 class="modal-title fs-5" id="exampleModalLabel">Remove OLT</h1>
    //                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //                     </div>
    //                     <div class="modal-body">
    //                         <h5 text-center></h5>
    //                     </div>
    //                     <div class="modal-footer">
    //                         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="cancelRemove()">Cancel</button>
    //                         <button type="button" class="btn btn-danger">Confirm</button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>`
    
    // const body = document.querySelector('body');
    // body.insertAdjacentHTML('beforeend', modal_remove);
    
    const modal_remove = document.getElementById('modalRemove');
    const textoModal = modal_remove.querySelector('h5').innerHTML = "Deseja realmente remover a " + oltdata[1] + "?"
    
    const olt = document.getElementById(rmdata);
    //olt.remove();

}

export default { add_olt, remove_olt };