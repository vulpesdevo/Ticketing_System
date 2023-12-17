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
const tabSelector = document.getElementById('tabSelector');
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
let stat2;
let priority;
let deadline;
let createdDate;
let modalHeader = document.querySelector('.modal-ako');
let modalStat = document.querySelector('#field-status');

    // Implement your logic here
function changeStatus(newStatus) {
    document.getElementById('field-status').value = newStatus;
    document.getElementById('field-status2').value = newStatus;
}

// Add event listeners to the buttons
document.getElementById('cancel-btn').addEventListener('click', function() {
changeStatus('CANCELLED');
});

document.getElementById('solve-btn').addEventListener('click', function() {
changeStatus('SOLVED');
});
function addGlobalEventListener(type, selector, callback){
    document.addEventListener(type, e=>{
        if(e.target.matches(selector)) callback(e);
    });
}
function addGlobalEventListenerRow(type, selector, callback){
    document.addEventListener(type, e=>{
        if(e.target.matches(selector)) callback(e);
    });
}
function autoUpdateStat(r, targetDate){
    const trget = Date.parse(targetDate);
    let todayDate= new Date();
    let todayDateFormat = todayDate.toISOString().split("T")[0];
    const toddate = Date.parse(todayDateFormat);
    const colmn = r.getElementsByTagName("td");
    if (toddate>=trget){
        colmn[4].textContent = "CANCELLED";
        solvedRowCount=0;
        progressCount=0;
        const tableRows = document.querySelectorAll('#table-onqueue tbody tr');
    tableRows.forEach(row => {
        const statusCell = row.cells[5]; // Assuming the status is in the 6th column (index 5)
        const statusValue = statusCell.textContent.trim().toUpperCase();
        //console.log(statusValue+' '+solvedr); 
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
    }
    

}
// Get the current date and time


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
    let _stat2 = document.getElementById('field-status2');
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
    _stat2.value = stat;
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
        const tktfield = modalMain.querySelector('#modals-ticket-no');
        tktfield.setAttribute("disabled","disabled");

        if(state !=''){
            cancelBTN = modalMain.querySelector('#cancel-btn');
            solveBTN = modalMain.querySelector('#solve-btn');
            cancelBTN.classList.remove('d-none');
            solveBTN.classList.remove('d-none');
            showBtns = modalMain.querySelector('#modal-btn-save');
            showBtns.classList.remove('d-none');
        }
    }else if(stats.includes('SOLVED')){
        //maybe
        modalStat.classList.remove('bg-warning');
        modalStat.classList.remove('bg-secondary');
        modalHeader.classList.add('bg-success');
        modalStat.classList.add('bg-success');
        const modalMain = document.querySelector('#viewTicketModal');
        cancelBTN = modalMain.querySelector('#cancel-btn');
        solveBTN = modalMain.querySelector('#solve-btn');
        cancelBTN.classList.add('d-none');
        solveBTN.classList.add('d-none');
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
        const modalMain = document.querySelector('#viewTicketModal');
        cancelBTN = modalMain.querySelector('#cancel-btn');
        solveBTN = modalMain.querySelector('#solve-btn');
        cancelBTN.classList.add('d-none');
        solveBTN.classList.add('d-none');
        const inputFields = document.querySelectorAll(".form-control");
            inputFields.forEach(input => {
                if(input.id != "date-completed" && input.id != "field-status") input.setAttribute("disabled","");
                console.log("form fields");
            });
    }
    
}
let cellValue;

function clearFieldValues(){
    let title = document.getElementById('request-title');
    let _stat = document.getElementById('field-status');
    let tgt_dl = document.getElementById('deadline');
    let createdate = document.getElementById('date-created');
    let modalTitle = document.getElementById('modals-ticket-no');
    let _cust = document.getElementById('requested-by');
    let assign_team = document.getElementById('assigned-team');
    let _priority = document.getElementById('priority');
    let acc = document.getElementById('account-no');
    let prio;
    _priority.addEventListener('change', function() {
        // Get the selected option value
        const prio = _priority.value;
    });
    const modalMain = document.querySelector('#viewTicketModal');
    
    createbtn = modalMain.querySelector("#modal-btn-create");
    cancelBTN = modalMain.querySelector('#cancel-btn');
    solveBTN = modalMain.querySelector('#solve-btn');
    cancelBTN.classList.add('d-none');
    solveBTN.classList.add('d-none');
    createbtn.classList.remove('d-none');
    let todayDate= new Date();
    todayDateFormat = todayDate.toISOString().split("T")[0];
    todayDate.setDate(todayDate.getDate()+7);
    targetdates = todayDate.toISOString().split("T")[0];
    tgt_dl.value= targetdates;
    console.log(todayDateFormat);
    title.value = '';
    _stat.value = '';
    acc.value="";
    modalTitle.value = cellValue;
    createdate.value =todayDateFormat;
    createdate.setAttribute("disabled","disabled");
    _cust.value = '';
    assign_team.value = '';
    _priority.value = '';
    console.log('Value of the last row:', cellValue);
    solvedRowCount=0;
    progressCount=0;

}

function addTicketRecord() {
    let title = document.getElementById('request-title');
    let accNo = document.getElementById('account-no');
    let modalTitle = document.getElementById('modals-ticket-no');
    let _cust = document.getElementById('requested-by');
    let assign_team = document.getElementById('assigned-team');
    let _priority = document.getElementById('priority');
    let curDate = document.getElementById('date-created');
    let tgt_dl = document.getElementById('deadline');

    let prio = _priority.options[_priority.selectedIndex].value;

    // currentDate
    const tblRow = document.querySelector("#table-onqueue");
    const tblBody = tblRow.querySelector('tbody');
    let newRow = tblBody.insertRow();

    newRow.classList.add('selectable'); // Add 'selectable' class to make the row clickable

    newRow.insertCell(0).outerHTML = `<th class="align-middle fs-6">${modalTitle.value}</th>`;
    newRow.insertCell(1).outerHTML = `<td class="align-middle fs-6">${_cust.value}</td>`;
    newRow.insertCell(2).outerHTML = `<td class="align-middle fs-6">${accNo.value}</td>`;
    newRow.insertCell(3).outerHTML = `<td class="align-middle fs-6">${title.value}</td>`;
    newRow.insertCell(4).outerHTML = `<td class="align-middle fs-6">${assign_team.value}</td>`;
    newRow.insertCell(5).outerHTML = `<td class="align-middle fs-6">IN PROGRESS</td>`;
    newRow.insertCell(6).outerHTML = `<td class="align-middle fs-6">${prio}</td>`;
    newRow.insertCell(7).outerHTML = `<td class="align-middle fs-6">${tgt_dl.value}</td>`;
    newRow.insertCell(8).outerHTML = `<td class="align-middle fs-6">${curDate.value}</td>`;


    
    const tabSelector = document.getElementById('tabSelector');
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

    //let solvedr =solvedRowCount;
    //let progressc =progressCount;
    const tableRows = document.querySelectorAll('#table-onqueue tbody tr');
    tableRows.forEach(row => {
        const statusCell = row.cells[5]; // Assuming the status is in the 6th column (index 5)
        const statusValue = statusCell.textContent.trim().toUpperCase();
        //console.log(statusValue+' '+solvedr); 
        if (statusValue === 'SOLVED') {
            solvedRowCount++;
            
        }else if (statusValue === 'IN PROGRESS') {
            progressCount++;
        }
        
    });
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
    const solvedcardNum = document.querySelector('.solved-card-no');
    const progresscardNum = document.querySelector('.progress-card-no');
    solvedcardNum.textContent = solvedRowCount;
    progresscardNum.textContent = progressCount;
    
    
    // Add click event listener to the new row
    let _rows = document.querySelectorAll('.selectable');
    _rows.forEach(function(row, index) {
        let ecolumns = row.getElementsByTagName('td');
        autoUpdateStat(row,ecolumns[6].textContent);
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
            createdDate = columns[7].textContent;
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
    
    
    mdlSaveButton = document.querySelector('#modal-btn-save');
    mdlSaveButton.addEventListener('click', function(){
        const columns  = activeRow.querySelectorAll('tr td');
        const modalMain = document.querySelector('#viewTicketModal');

        let _priority = document.getElementById('priority');
        let prio= _priority.options[_priority.selectedIndex].value;
        
        columns[0].textContent = modalMain.querySelector('#requested-by').value;
        // columns[1].textContent = modalMain.querySelector('#requested-by').value;
        columns[2].textContent = modalMain.querySelector('#request-title').value;
        columns[3].textContent = modalMain.querySelector('#assigned-team').value;
        columns[4].textContent = modalMain.querySelector('#field-status2').value;
        columns[5].textContent = prio;
        columns[6].textContent = modalMain.querySelector('#deadline').value;
        // const updateStat = document.querySelector("#modal-btn-process");
        // updateStat.addEventListener('click', function(){
        console.log(columns);
        // });
        //console.log(modalMain.querySelector('#request-title').value);
        solvedRowCount=0;
        progressCount=0;
        const tableRows = document.querySelectorAll('#table-onqueue tbody tr');
        tableRows.forEach(row => {
            const statusCell = row.cells[5]; // Assuming the status is in the 6th column (index 5)
            const statusValue = statusCell.textContent.trim().toUpperCase();
            //console.log(statusValue+' '+solvedr); 
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
    });
    deleteButton = document.querySelectorAll('.delete-ticket');
    deleteButton.forEach(function(button){
    button.addEventListener('click', function(){
        let row = this.parentElement.parentElement;
        const modalDelete = document.querySelector("#deleteModal");
        const confirmDelBtn = modalDelete.querySelector("#modal-btn-delete");
        solvedRowCount=0;
        progressCount=0;
        confirmDelBtn.addEventListener("click", function(){
            activeRow.remove();
            console.log('removed');
            generateToast("text-bg-danger",`Ticket number<strong> ${ticketNo} </strong> DELETED`);
            
            const tableRows = document.querySelectorAll('#table-onqueue tbody tr');
            tableRows.forEach(row => {
                const statusCell = row.cells[5]; // Assuming the status is in the 6th column (index 5)
                const statusValue = statusCell.textContent.trim().toUpperCase();
                //console.log(statusValue+' '+solvedr); 
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
            });
        });
    });
}
let solvedRowCount =0;
let progressCount =0;
document.addEventListener('DOMContentLoaded', function() {
    
    const rows = document.querySelectorAll('.table tbody tr');
    const tableRows = document.querySelectorAll('#table-onqueue tbody tr');
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
    //ciewbutonsole.log(solvedRowCount);
    rows.forEach(row => {
        const columns = row.getElementsByTagName('td');
        if(stat == 'SOLVED'){
            let removeButtons = columns[7].querySelectorAll(".btn-warning");
            removeButtons[0].classList.add('d-none'); //edit
            removeButtons[1].classList.add('d-none');
        }
    });
    let _rows = document.querySelectorAll('.selectable');
    _rows.forEach(function(row, index) {
        let ecolumns = row.getElementsByTagName('td');
        autoUpdateStat(row,ecolumns[6].textContent);
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
            createdDate = columns[7].textContent;
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
    addGlobalEventListener("click",".viewer",e=>{
            let title = document.getElementById('request-title');
            let _stat = document.getElementById('field-status');
            let tgt_dl = document.getElementById('deadline');
            let modalTitle = document.getElementById('modals-ticket-no');
            let _cust = document.getElementById('requested-by');
            let assign_team = document.getElementById('assigned-team');
            // let _priority = document.getElementById('priority');
            let account = document.getElementById('account-no');
            let createddate = document.getElementById('date-created');
            const priorityDropdown = document.getElementById('priority');
            modalTitle.value = ticketNo;
            title.value = issueDescription;
            _stat.value = stat;
            tgt_dl.value = deadline;
            _cust.value = customer;
            assign_team.value = assignedTeam;
            account.value = accountNumber;
            createddate.value= createdDate;
            
            
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
            let row = e.target.parentElement.parentElement;
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
            solvedRowCount=0;
            progressCount=0;
    });
    
    mdlSaveButton = document.querySelector('#modal-btn-save');
    mdlSaveButton.addEventListener('click', function(){
        const columns  = activeRow.querySelectorAll('tr td');
        const modalMain = document.querySelector('#viewTicketModal');

        let _priority = document.getElementById('priority');
        let prio= _priority.options[_priority.selectedIndex].value;
        
        columns[0].textContent = modalMain.querySelector('#requested-by').value;
        // columns[1].textContent = modalMain.querySelector('#requested-by').value;
        columns[2].textContent = modalMain.querySelector('#request-title').value;
        columns[3].textContent = modalMain.querySelector('#assigned-team').value;
        columns[4].textContent = modalMain.querySelector('#field-status2').value;
        columns[5].textContent = prio;
        columns[6].textContent = modalMain.querySelector('#deadline').value;
        // const updateStat = document.querySelector("#modal-btn-process");
        // updateStat.addEventListener('click', function(){

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
        // });
        //console.log(modalMain.querySelector('#request-title').value);
    });
    deleteButton = document.querySelectorAll('.delete-ticket');
    deleteButton.forEach(function(button){
    button.addEventListener('click', function(){
        let row = this.parentElement.parentElement;
        const modalDelete = document.querySelector("#deleteModal");
        const confirmDelBtn = modalDelete.querySelector("#modal-btn-delete");
        solvedRowCount=0;
        progressCount=0;
        confirmDelBtn.addEventListener("click", function(){
            activeRow.remove();
            console.log('removed');
            generateToast("text-bg-danger",`Ticket number<strong> ${ticketNo} </strong> DELETED`);
            
            const tableRows = document.querySelectorAll('#table-onqueue tbody tr');
            tableRows.forEach(row => {
                const statusCell = row.cells[5]; // Assuming the status is in the 6th column (index 5)
                const statusValue = statusCell.textContent.trim().toUpperCase();
                //console.log(statusValue+' '+solvedr); 
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
            });
    });
    });
    // Add Button
    
    addButton = document.querySelector('#add-ticket');
    addButton.addEventListener('click', function(){
        console.log("ADD BUTTON WAS CLICK");
        
        const modalMain = document.querySelector('#viewTicketModal');
        removeBtns = modalMain.querySelectorAll("#modal-btn-process,#modal-btn-complete,#modal-btn-save,#modal-btn-create");
        removeBtns.forEach(btnCol => {
            btnCol.classList.add('d-none');
        });
        modalHeader.classList.remove('bg-warning','bg-success','bg-secondary');
        modalStat.classList.remove('bg-warning','bg-success','bg-secondary');
        
        
        const inputFields = document.querySelectorAll(".form-control");
        inputFields.forEach(input => {
            if(input.id != "date-completed" && input.id != "field-status") input.removeAttribute("disabled");

        });
        const tktfield = modalMain.querySelector('#modals-ticket-no');
        modalHeader.classList.add('bg-primary');
        modalStat.classList.add('bg-primary');
        tktfield.setAttribute("disabled","disabled");
        let curDate = document.getElementById('date-created');
        let tgt_dl = document.getElementById('deadline');
        let _rows = document.querySelectorAll('tbody tr');
        
// Check if there are any rows in the table
        if (_rows.length > 0) {
        // Get the last row
            let lastRow = _rows[_rows.length - 1];
            let cell;
            // Assuming the value you want is in a specific cell (e.g., the first cell of the last row)
            cell = lastRow.cells[0].textContent;
            let currentTicketNumber = cell ? cell.match(/\d+/) : null;
            // Increment the ticket number by 1
            cellValue = 'TKT00' + (parseInt(currentTicketNumber, 10) + 1);

  // Increment the ticket number by 1
            //cellValue = 'TKT' + (parseInt(currentTicketNumber, 10) + 1)

        // Log the value or use it as needed
            
        } else {
        console.log('No rows in the table.');
        }


        // let currentDate = new Date();
        // let sevenDaysLater = new Date(currentDate);
        // sevenDaysLater.setDate(currentDate.getDate() + 7);
        // let formattedSevenDaysLater = formatDate(sevenDaysLater);

        // // Set the value of the input field
        // tgt_dl.value = formattedSevenDaysLater;

        // // Function to format date as "dd/mm/yyyy"
        // function calculateDeadline() {
        //     // Get the current date and time
        //     let currentDate = new Date();
        
        //     // Add 7 days to the current date
        //     let deadlineDate = new Date(currentDate);
        //     deadlineDate.setDate(currentDate.getDate() + 7);
        
        //     // Return the deadline date
        //     return deadlineDate;
        // }
        
        //   // Example usage
        // let deadline = calculateDeadline();
        // console.log("Deadline Date:", deadline.toISOString());
        // cancelBTN = document.getElementById('cancel-btn');
        // solveBTN = document.getElementById('solve-btn');
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




        