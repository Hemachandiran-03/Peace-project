var userId = localStorage.getItem("userId");
var userType = localStorage.getItem("userType");
var inviteId = sessionStorage.getItem("inviteId");
var serviceType = sessionStorage.getItem("serviceType");
var doctorName = sessionStorage.getItem("doctorName");


console.log(`UserID : ${userId}`);
console.log(`userType : ${userType}`)
console.log(`inviteId : ${inviteId}`)
console.log(`serviceType : ${serviceType}`)
console.log(`doctorname : ${doctorName}`)

function onBack(){
    window.history.back();
}

var serviceNameInput = document.getElementById("serviceName");
var doctorNameInput = document.getElementById("doctorName");
var serviceStatusInput = document.getElementById("serviceStatus");

onStart();

function onStart() {
    switch(serviceType){
        case "1":{
            serviceNameInput.value="Individual Counseling"
            break;
        }
        case "2":{
            serviceNameInput.value="Relationship Counseling"
            break;
        }
        case "3":{
            serviceNameInput.value="Career Counseling"
            break;
        }
        case "4":{
            serviceNameInput.value="Educational Counseling"
            break;
        }
    }
    doctorNameInput.value = doctorName;
    serviceStatusInput.value = "Ongoing";
}


function onClickCompleted(){

    window.location.href = "../../feedback/feedback.html";

}