// const tabs=document.querySelectorAll('.tab-btn' ) ;
// const all_content=document.querySelectorAll('._content') ;
// tabs. forEach((tab, index)=>{
//     tab.addEventListener('click',()=>{
//         tabs.forEach(tab=>{tab.classList.remove('active')});
//         tab.classList.add('active');
//         all_content.forEach(content=>{content.classList.remove('active')});
//         all_content[index].classList.add('active');
//     })
// })
const tabSelector = document.getElementById('tabSelector');
const allContent = document.querySelectorAll('._content');
const tableRows = document.querySelectorAll('#table-onqueue tbody tr');
tableRows.forEach(row => {
    row.addEventListener('click', () => {
        // Remove the 'selected-row' class from all rows
        tableRows.forEach(r => {
            r.classList.remove('table-primary');
        });

        // Add the 'selected-row' class to the clicked row
        row.classList.add('table-primary');
    });
});
tabSelector.addEventListener('change', () => {
    const selectedValue = tabSelector.value;
    
    // Remove 'active' class from all contents

    switch (selectedValue) {
        case 'all':
            tableRows.forEach(row => {
                row.classList.remove('d-none');
            });
            break;
        case 'tab1':
            tableRows.forEach(row => {
                const statusCell = row.cells[5]; // Assuming the status is in the 6th column (index 5)
                const statusValue = statusCell.textContent.trim().toUpperCase();

                if (statusValue === 'IN PROGRESS') {
                    row.classList.remove('d-none');
                    console.log("IN PROGRESS");
                } else {
                    row.classList.add('d-none');
                }
            });
            break;
        case 'tab2':
            tableRows.forEach(row => {
                const statusCell = row.cells[5]; // Assuming the status is in the 6th column (index 5)
                const statusValue = statusCell.textContent.trim().toUpperCase();

                if (statusValue === 'SOLVED') {
                    row.classList.remove('d-none');
                    console.log("SOLVED");
                } else {
                    row.classList.add('d-none');
                }
            });
            break;
        default:
            tableRows.forEach(row => {
                const statusCell = row.cells[5]; // Assuming the status is in the 6th column (index 5)
                const statusValue = statusCell.textContent.trim().toUpperCase();
                if (statusValue === 'CANCELLED') {
                    row.classList.remove('d-none');
                    console.log("SOLVED");
                } else {
                    row.classList.add('d-none');
                }
            });
            break;
    }
});

function breakByHTMLChars(statusHtml = ""){
    const tagRegex = /<[^>]*>/g;
    const resultArray = statusHtml.split(tagRegex);

    return resultArray.filter(item => item.trim() !== '');
}
let ticketNo ;
let customer;
let accountNumber;
let issueDescription;
let assignedTeam;
let stat;
let priority;
let deadline;
let tagetDate;
let modalHeader = document.querySelector('.modal-ako');
let modalStat = document.querySelector('#field-status');
let currentDate;
currentDate = new Date();

// Add 7 days to the current date
let sevenDaysLater = new Date(currentDate);
sevenDaysLater.setDate(currentDate.getDate() + 7);


// change
function changeModalHeaderColor(status){
    console.log(status);
    switch (status){
        case 'IN PROGRESS':
            modalHeader.classList.add('bg-warning');
            modalStat.classList.add('bg-warning');
            break;     
        case 'SOLVED':
            modalHeader.classList.add('bg-success');
            modalStat.classList.add('bg-success');
            
            console.log(modalHeader);
            break;    
        default:
            modalHeader.classList.add('bg-secondary');
            modalStat.classList.add('bg-secondary');
            break;                    
    }
}
function assignRowFieldValues(row){
    let title = document.getElementById('request-title');
    let _stat = document.getElementById('field-status');
    let tgt_dl = document.getElementById('deadline');
    let modalTitle = document.getElementById('modals-ticket-no');
    let _cust = document.getElementById('requested-by');
    let assign_team = document.getElementById('assigned-team');
    // let _priority = document.getElementById('priority');
    let account = document.getElementById('account-no');
    const priorityDropdown = document.getElementById('priority');
    modalTitle.value = ticketNo;
    title.value = issueDescription;
    _stat.value = stat;
    tgt_dl.value = deadline;
    _cust.value = customer;
    assign_team.value = assignedTeam;
    account.value = accountNumber;
    
    switch(priority.toUpperCase()) {
        case"HIGH":
            priorityDropdown.selectedIndex = 0;
            break;
        case"MEDIUM":
            priorityDropdown.selectedIndex = 1;
            break;
        default:
            priorityDropdown.selectedIndex = 2;
            break;
    }

    // _priority.value = priority;
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
        const inputFields = document.querySelectorAll(".form-control");
            inputFields.forEach(input => {
                if(input.id != "date-completed" && input.id != "field-status") input.removeAttribute("disabled");
                console.log("form fields");
            });
        if(state ==''){
            showBtns = modalMain.querySelector('#modal-btn-process');
            showBtns.classList.remove('d-none');
        }else{
            showBtns = modalMain.querySelector('#modal-btn-save');
            showBtns.classList.remove('d-none');
        }
    }else if(stats.includes('SOLVED')){
        //maybe
        modalStat.classList.remove('bg-warning');
        modalStat.classList.remove('bg-secondary');
        modalHeader.classList.add('bg-success');
        modalStat.classList.add('bg-success');
        const inputFields = document.querySelectorAll(".form-control");
            inputFields.forEach(input => {
                if(input.id != "date-completed" && input.id != "field-status") input.setAttribute("disabled","");
                console.log("form fields");
            });
            
        console.log('in else if');
    }else if(stats.includes('CANCELLED')){
        modalStat.classList.remove('bg-warning');
        modalStat.classList.remove('bg-success');
        modalHeader.classList.add('bg-secondary');
        modalStat.classList.add('bg-secondary');
        const inputFields = document.querySelectorAll(".form-control");
            inputFields.forEach(input => {
                if(input.id != "date-completed" && input.id != "field-status") input.setAttribute("disabled","");
                console.log("form fields");
            });
    }
    
}
function clearFieldValues(){
    let title = document.getElementById('request-title');
    let _stat = document.getElementById('field-status');
    let tgt_dl = document.getElementById('deadline');
    let modalTitle = document.getElementById('modals-ticket-no');
    let _cust = document.getElementById('requested-by');
    let assign_team = document.getElementById('assigned-team');
    let _priority = document.getElementById('priority');
    let prio;
    _priority.addEventListener('change', function() {
        // Get the selected option value
        const prio = _priority.value;
    });

    title.value = '';
    _stat.value = '';
    tgt_dl.value = '';
    modalTitle.value = '';
    _cust.value = '';
    assign_team.value = '';
    _priority.value = '';
}


function addTicketRecord(){
    let title = document.getElementById('request-title');
    let tgt_dl = document.getElementById('deadline');
    let accNo = document.getElementById('account-no');
    let modalTitle = document.getElementById('modals-ticket-no');
    let _cust = document.getElementById('requested-by');
    let assign_team = document.getElementById('assigned-team');
    let _priority = document.getElementById('priority');
    let curDate = document.getElementById('date-created');
    curDate.value = currentDate;
    tgt_dl.value= sevenDaysLater;
    let  prio = _priority.options[_priority.selectedIndex].value;
    // currentDate
    const tblRow   = document.querySelector("#table-onqueue");
    const tblBody  = tblRow.querySelector('tbody');

    let newRow  = tblBody.insertRow();
    let col1 = newRow.insertCell(0); //ticket no
    let col2 = newRow.insertCell(1); //customer name
    let col3 = newRow.insertCell(2); //contactnumber
    let col4 = newRow.insertCell(3); //Request title
    let col5 = newRow.insertCell(4); //assign_team
    let col6 = newRow.insertCell(5); 
    let col7 = newRow.insertCell(6); //priority
    let col8= newRow.insertCell(7); //deadline
    let col9= newRow.insertCell(8); //deadline
    col1.outerHTML = `<th class="align-middle fs-6">TIX-1000</th>`;
    col2.outerHTML = `<td class="align-middle fs-6">${_cust.value}</td>`;
    col3.outerHTML = `<td class="align-middle fs-6">${accNo.value}</td>`;
    col4.outerHTML = `<td class="align-middle fs-6">${title.value}</td>`;
    col5.outerHTML = `<td class="align-middle fs-6">${assign_team.value}</td>`;
    col6.outerHTML = `<td class="align-middle fs-6">IN PROGRESS</td></td>`;
    col7.outerHTML = `<td class="align-middle fs-6">${prio}</td>`;
    col8.outerHTML = `<td class="align-middle fs-6">${tgt_dl.value}</td>`;
    col9.outerHTML = `<td class="align-middle fs-6">${curDate.value}</td>`;


}

document.addEventListener('DOMContentLoaded', function() {
    let solvedRowCount = 0;
    let progressCount =0;
    const rows = document.querySelectorAll('.table tbody tr');
    
    tableRows.forEach(row => {
        const statusCell = row.cells[5]; // Assuming the status is in the 6th column (index 5)
        const statusValue = statusCell.textContent.trim().toUpperCase();

        if (statusValue === 'SOLVED') {
            solvedRowCount++;
        }else if (statusValue === 'IN PROGRESS') {
            progressCount++;
        }
    });
    const solvedcardNum = document.querySelector('.solved-card-no');
    const progresscardNum = document.querySelector('.progress-card-no');
    solvedcardNum.textContent = solvedRowCount;
    progresscardNum.textContent = progressCount;
    console.log(solvedRowCount);
    rows.forEach(row => {
        const columns = row.getElementsByTagName('td');
        if(stat == 'SOLVED'){
            let removeButtons = columns[7].querySelectorAll(".btn-warning,.btn-danger");
            removeButtons[0].classList.add('d-none'); //edit
            removeButtons[1].classList.add('d-none');
        }
    });
    let _rows = document.querySelectorAll('tbody tr');
    _rows.forEach(function(row, index) {
        row.addEventListener('click', function() {
            let rows = row.parentElement.parentElement;
            ticketNo = row.getElementsByTagName('th')[0].textContent;
            let columns = this.getElementsByTagName('td');
            activeRow = row;
            customer = columns[0].textContent;
            accountNumber = columns[1].textContent;
            issueDescription = columns[2].textContent;
            assignedTeam = columns[3].textContent;
            stat = columns[4].textContent;
            priority = columns[5].textContent;
            deadline = columns[6].textContent;
            tagetDate = columns[7].textContent;

            // Now you can use the 'index' variable to get the index of the clicked row
            
            
                  // Get the data from the clicked row
            
            const firstName = columns[1].textContent;
            const lastName = columns[2].textContent;
    
            const status = document.getElementById("field-status");
            console.log(columns[0].textContent);
            
            const animalArray = [];
            for (var i = 0; i < status.length; i++) {
            animalArray.push(status[i].textContent);
            }
            
        
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
            // let _priority = document.getElementById('priority');
            let account = document.getElementById('account-no');
            let targetdate = document.getElementById('date-created');
            const priorityDropdown = document.getElementById('priority');
            modalTitle.value = ticketNo;
            title.value = issueDescription;
            _stat.value = stat;
            tgt_dl.value = deadline;
            _cust.value = customer;
            assign_team.value = assignedTeam;
            account.value = accountNumber;
            targetdate.value= tagetDate;
            
            switch(priority.toUpperCase()) {
                case"HIGH":
                    priorityDropdown.selectedIndex = 0;
                    break;
                case"MEDIUM":
                    priorityDropdown.selectedIndex = 1;
                    break;
                default:
                    priorityDropdown.selectedIndex = 2;
                    break;
            }
            let row = this.parentElement.parentElement;
         // assign values to fields base on selected row
            // assignRowFieldValues(row);
            showHideModalButtons(row,'edit');
            // remove disable attribute in fields
            // const inputFields = document.querySelectorAll(".form-control");
            // inputFields.forEach(input => {
            //     if(input.id != "date-completed" && input.id != "field-status") input.removeAttribute("disabled");
            // });
            modalHeader.classList.remove('bg-warning','bg-success','bg-danger');
            changeModalHeaderColor(stat);
        });
    });
    mdlSaveButton = document.querySelector('#modal-btn-save');
    mdlSaveButton.addEventListener('click', function(){
        const columns  = activeRow.querySelectorAll('td');
        const modalMain = document.querySelector('#viewTicketModal');

        let _priority = document.getElementById('priority');
        let prio= _priority.options[_priority.selectedIndex].value;
        
        columns[0].textContent = modalMain.querySelector('#requested-by').value;
        // columns[1].textContent = modalMain.querySelector('#requested-by').value;
        columns[2].textContent = modalMain.querySelector('#request-title').value;
        columns[3].textContent = modalMain.querySelector('#assigned-team').value;
        columns[5].textContent = prio;
        columns[6].textContent = modalMain.querySelector('#deadline').value;
        console.log(modalMain.querySelector('#request-title').value);

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
    // Add Button
    addButton = document.querySelector('#add-ticket');
    addButton.addEventListener('click', function(){
        console.log("ADD BUTTON WAS CLICK");
        
        const inputFields = document.querySelectorAll(".form-control");
        inputFields.forEach(input => {
            if(input.id != "date-completed" && input.id != "field-status") input.removeAttribute("disabled");

        });
        
    
        clearFieldValues();

    });
    const createButton = document.querySelector("#modal-btn-create");
    createButton.classList.remove("d-none");
    createButton.addEventListener('click', function(){
        console.log("create ticket button");
        
        addTicketRecord()
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




        