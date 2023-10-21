import states from './states.js'

async function checkSlots(ip, oltID){
    const url = `${ip}` + `/${oltID.OltID}`
    console.log(url)
    const response = await fetch(url)
    return await response.json();
   
}


async function add_olt(olt){

    let status = olt.status;
    const name = olt.OltName;
    const ip = olt.ipAddress;
    const armario = olt.Armario;
    const powerdb = olt.PowerdB;
    const maxclients = olt.maxClients;
    let config = ''
    const id = olt.OltID;

    const checkStatus = states.checkStatus(status);

    if (checkStatus == 1){
        status = 'statusOnline';
    } else {
        status = 'statusOffline';
    }

    const linha = `<tr id="${status}-${ip}">
                        <th scope="row">
                        <div class="${status}" data-bs-toggle="collapse" href="#${id}" role="button" aria-expanded="false" aria-controls="${status}-${ip}" ></div>
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
                        <tr>
                      <td colspan="10" class="hiddenRow">
                        <div class="collapse multi-collapse" id="${id}">
                          <table class="table table-bordered table-sm table-hover text-center">
                            <thead>
                              <tr>
                                <th>Status</th>
                                <th>Slot/Pons</th>
                                <th>ONU Discovery</th>
                                <th>ONU's Provisioned</th>
                                <th>ONU's Online</th>
                                <th>Options</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr data-toggle="collapse"  class="accordion-toggle" data-target="#demo10">
                                <td>Online </td>
                                <td>0/19</td>
                                <td>1 </td>
                                <td>78</td>
                                <td>24</td>
                                <td>
                                  <span id="configIcon" class="clickIcon">
                                    <a>
                                      <iconify-icon icon="vscode-icons:file-type-light-config" width="15" height="15"></iconify-icon>
                                    </a>
                                </span>
                                </td>
                              </tr>
                              <tr data-toggle="collapse"  class="accordion-toggle" data-target="#demo10">
                                <td>Online </td>
                                <td>0/18</td>
                                <td>0</td>
                                <td>102</td>
                                <td>94</td>
                                <td>
                                  <span id="configIcon" class="clickIcon">
                                    <a>
                                      <iconify-icon icon="vscode-icons:file-type-light-config" width="15" height="15"></iconify-icon>
                                    </a>
                                </span>
                                </td>
                              </tr>
                              <tr data-toggle="collapse"  class="accordion-toggle" data-target="#demo10">
                                <td>Online </td>
                                <td>0/17</td>
                                <td>0 </td>
                                <td>85</td>
                                <td>32</td>
                                <td>
                                  <span id="configIcon" class="clickIcon">
                                    <a>
                                      <iconify-icon icon="vscode-icons:file-type-light-config" width="15" height="15"></iconify-icon>
                                    </a>
                                </span>
                                </td>
                              </tr>
                              <tr data-toggle="collapse"  class="accordion-toggle" data-target="#demo10">
                                <td>Online </td>
                                <td>0/16</td>
                                <td>2</td>
                                <td>90</td>
                                <td>78</td>
                                <td>
                                  <span id="configIcon" class="clickIcon">
                                    <a>
                                      <iconify-icon icon="vscode-icons:file-type-light-config" width="15" height="15"></iconify-icon>
                                    </a>
                                </span>
                                </td>
                              </tr>
                              <tr data-toggle="collapse"  class="accordion-toggle" data-target="#demo10">
                                <td>Unrecheable</td>
                                <td>0/15</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                              </tr>
                              <tr data-toggle="collapse"  class="accordion-toggle" data-target="#demo10">
                                <td>Unrecheable</td>
                                <td>0/14</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
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


export default { add_olt, remove_olt, checkSlots };