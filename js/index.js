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
let modalTitle  = document.getElementById('modal-ticket-no');
modalTitle.textContent = ticketNo;
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
            ticketNo = this.querySelector('th').textContent;
            let columns = this.getElementsByTagName('td');
            customer = columns[0].textContent;
            contactNumber = columns[1].textContent;
            issueDescription = columns[2].textContent;
            assignedTeam = columns[3].textContent;
            stat = columns[4].textContent;
            priority = columns[5].textContent;
            deadline = columns[6].textContent;
            
        });
    });
    viewButton = document.querySelectorAll('.viewer') ;
    viewButton.forEach(function(button){
        button.addEventListener('click', function(){
            let title = document.getElementById('request-title');
            let _stat = document.getElementById('field-status');
            title.value = issueDescription;
            _stat.value = stat;
            
            modalHeader.classList.remove('bg-warning','bg-success','bg-danger');
            changeModalHeaderColor(stat);
        });
    });
    
    
});




        