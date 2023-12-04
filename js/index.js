const tabs=document.querySelectorAll('.tab-btn' ) ;
const all_content=document.querySelectorAll('._content') ;
tabs. forEach((tab, index)=>{
    tab.addEventListener('click',()=>{
        tabs.forEach(tab=>{tab.classList.remove('active')});
        tab.classList.add('active');
        all_content.forEach(content=>{content.classList.remove('active')});
        all_content[index].classList.add('active');
    })
})
let ticketNo ;
let customer;
let contactNumber;
let issueDescription;
let assignedTeam;
let stat;
let priority;
let deadline;
let modalHeader = document.querySelector('.modal-ako');
function changeModalHeaderColor(status){
    console.log(status);
    switch (status){
        case 'IN PROGRESS':
            modalHeader.classList.add('bg-warning');
            break;     
        case 'SOLVED':
            modalHeader.classList.add('bg-success');
            console.log(modalHeader);
            break;    
        default:
            modalHeader.classList.add('bg-danger');
            break;                    
    }
}


function assignRowFieldValues(row){

}
let toastCtr = 0;
function generateToast(bgColor = "", textMessage =""){
    toastCtr++;
    let toastHtml = `<div class="toast align-items-center ${bgColor} border-0" role="alert" aria-live="assertive" aria-atomic="true"  id="liveToast${toastCtr}">
                        <div class="d-flex">
                        <div class="toast-body">
                            ${textMessage}
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                    </div>`;
    const toastWrapper = document.querySelector('.toast-container');
    toastWrapper.innerHTML += toastHtml;

    const toastMain = document.querySelector('#liveToast'+toastCtr);
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastMain);
    toastBootstrap.show();
}

function showHideModalButtons(row, state =''){
    const stats = stat;
    const modalMain = document.querySelector('#viewTicketModal');
    removeBtns = modalMain.querySelectorAll("#modal-btn-process,#modal-btn-complete,#modal-btn-save,#modal-btn-create");
    removeBtns.forEach(btnCol => {
        btnCol.classList.add('d-none');
    });

    if(stats.includes("IN PROGRESS")){
        if(state ==''){
            showBtns = modalMain.querySelector('#modal-btn-process');
            showBtns.classList.remove('d-none');
        }else{
            showBtns = modalMain.querySelector('#modal-btn-save');
            showBtns.classList.remove('d-none');
        }
    }else if(stats.includes('SOLVED')){
        //maybe
        console.log('in else if');
    }
}
document.addEventListener('DOMContentLoaded', function() {
    
    const rows = document.querySelectorAll('.table tbody tr');
    rows.forEach(row => {
        const columns = row.getElementsByTagName('td');
        if(columns[6].textContent == 'completed'){
            let removeButtons = columns[7].querySelectorAll(".btn-warning,.btn-danger");
            removeButtons[0].classList.add('d-none'); //edit
            removeButtons[1].classList.add('d-none');
        }
    });
    let _rows = document.querySelectorAll('tbody tr');
    _rows.forEach(function(row) {
        row.addEventListener('click', function() {
            ticketNo = this.getElementsByTagName('th')[0].textContent;
            let columns = this.getElementsByTagName('td');
            activeRow = row;
            customer = columns[0].textContent;
            contactNumber = columns[1].textContent;
            issueDescription = columns[2].textContent;
            assignedTeam = columns[3].textContent;
            stat = columns[4].textContent;
            priority = columns[5].textContent;
            deadline = columns[6].textContent;
            console.log(row.classList.add());
            
        });
    });
    let activeRow = null;
    viewButton = document.querySelectorAll('.viewer') ;
    viewButton.forEach(function(button){
        button.addEventListener('click', function(){
            let title = document.getElementById('request-title');
            let _stat = document.getElementById('field-status');
            let tgt_dl = document.getElementById('deadline');
            let modalTitle = document.getElementById('modals-ticket-no');
            let _cust = document.getElementById('requested-by');
            let assign_team = document.getElementById('assigned-team');
            let _priority = document.getElementById('priority');
            let row = this.parentElement.parentElement;
         // assign values to fields base on selected row
            assignRowFieldValues(row);
            showHideModalButtons(row,'edit');
            modalTitle.value = ticketNo;
            title.value = issueDescription;
            _stat.value = stat;
            tgt_dl.value = deadline;
            _cust.value = customer
            assign_team.value = assignedTeam;
            _priority.value = priority
            
            
            // remove disable attribute in fields
            const inputFields = document.querySelectorAll(".form-control");
            inputFields.forEach(input => {
                if(input.id != "date-completed" && input.id != "field-status") input.removeAttribute("disabled");
            });
            
            modalHeader.classList.remove('bg-warning','bg-success','bg-danger');
            changeModalHeaderColor(stat);
        });
    });
    mdlSaveButton = document.querySelector('#modal-btn-save');
    mdlSaveButton.addEventListener('click', function(){
        const columns  = activeRow.querySelectorAll('td');
        const modalMain = document.querySelector('#viewTicketModal');

        // customer = columns[0].textContent;
        // contactNumber = columns[1].textContent;
        // issueDescription = columns[2].textContent;
        // assignedTeam = columns[3].textContent;
        // stat = columns[4].textContent;
        // priority = columns[5].textContent;
        // deadline = columns[6].textContent;

        // let title = document.getElementById('request-title');
        // let _stat = document.getElementById('field-status');
        // let tgt_dl = document.getElementById('target-date');
        // let modalTitle = document.getElementById('modals-ticket-no');
        // let _cust = document.getElementById('requested-by');
        // let assign_team = document.getElementById('assigned-team');
        // let _priority = document.getElementById('priority');
        // let row = this.parentElement.parentElement;

        columns[0].textContent = modalMain.querySelector('#requested-by').value;
        // columns[1].textContent = modalMain.querySelector('#requested-by').value;
        columns[2].textContent = modalMain.querySelector('#request-title').value;
        columns[3].textContent = modalMain.querySelector('#assigned-team').value;
        columns[6].textContent = modalMain.querySelector('#deadline').value;
        console.log(modalMain.querySelector('#request-title').value);
        // if (activeRow) {
        //     const columns = activeRow.querySelectorAll('td')[0];
        //     const modalMain = document.querySelector('#viewTicketModal');
        //     // Check if columns is not null or undefined
        //     if (columns) {
        //         columns.textContent = modalMain.querySelector('#request-title').value;
        //     } else {
        //         console.error('Columns not found in activeRow');
        //     }
        // } else {
        //     console.error('Active row is not set');
        // }
    });
    deleteButton = document.querySelectorAll('.delete-ticket');
    deleteButton.forEach(function(button){
    button.addEventListener('click', function(){
        let row = this.parentElement.parentElement;
        const modalDelete = document.querySelector("#deleteModal");
        const confirmDelBtn = modalDelete.querySelector("#modal-btn-delete");
        confirmDelBtn.addEventListener("click", function(){
            activeRow.remove();
            console.log('removed');
            generateToast("text-bg-danger",`Ticket number<strong> ${ticketNo} </strong> DELETED`);
        });
    });
    });

    modalWindow =  document.querySelector('#viewTicketModal');
    modalWindow.addEventListener("hidden.bs.modal", function(){
        const inputFields = document.querySelectorAll(".form-control");
        inputFields.forEach(input => {
            input.setAttribute("disabled","");
            console.log('disabled')
        });
    })


    
    
});




        