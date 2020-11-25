window.addEventListener('DOMContentLoaded',(event) =>{
    const name = document.querySelector('#name');
    const nameError = document.querySelector('#name-error');
    name.addEventListener('input', function () {
        let namRegex = new RegExp(/^[A-Z][a-z]{2,}$/);
        if (namRegex.test(name.value))
            nameError.textContent = "";
        else
            nameError.textContent = "Name is Incorrect";
    })});
    
const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function () {
    output.textContent = salary.value;
});


let empPayroll = [];
// Employee payroll object creation 
function createEmployeePayroll() {
    let employeepayrollData = new PayrollModel();
    employeepayrollData.name = getInputValueById('#name');
    employeepayrollData.profile = getSelectedValues('[name = profile]').pop();
    employeepayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeepayrollData.department = getSelectedValues('[name=department]');
    employeepayrollData.salary = getInputValueById('#salary');
    employeepayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#year') + "-" + getInputValueById('#month') + "/" + getInputValueById('#day');
    employeepayrollData.startDate = new Date(date).getDate();
    empPayroll.push(employeepayrollData)
    alert("Your entry is successfully done");
    alert(employeepayrollData.toString());
    return employeepayrollData;
}
function getSelectedValues(attribute) {
    let allItems = document.querySelectorAll(attribute);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked)
            selItems.push(item.value);
    });
    return selItems;
}

function getInputValueById(id) {
    let value = document.querySelector(id).value;
    return value;
}
function getElementValueById(id) {
    let value = document.getElementById(id).value;
    return value;
}
function save(){
    try{    
        let empPayrollData = createEmployeePayroll();
        createAndUpdateStorage(empPayrollData);
    }
    catch(e)
    {
        alert(e);
        return;
    }
}
function createAndUpdateStorage(employeepayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined)
    {
        employeePayrollList.push(employeepayrollData);
    }
    else
    {
        employeePayrollList = [employeepayrollData];
    }
    alert("Object Added to local storage" + employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}
const resetForm = () => {
    document.querySelector("#name").value = "";
    unsetSelectedValues("[name=profile]");
    unsetSelectedValues("[name=gender]");
    unsetSelectedValues("[name=department]");
    document.querySelector(".salary-output").textContent=400000;
    document.querySelector("#day").value = 01;
    document.querySelector("#month").value = 01;
    document.querySelector("#year").value = 2020;
    document.querySelector("#notes").value= "";
    document.querySelector(".date-error").textContent = "";
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{
        item.checked = false;
    });
}