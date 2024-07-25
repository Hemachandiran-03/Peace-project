var userId = localStorage.getItem("userId");
var userType = localStorage.getItem("userType");


console.log(`UserID : ${userId}`);
console.log(`userType : ${userType}`)


function goBackHome() {
    window.location.href = "../home/home.html"
}

// empty alerts
var requestEmptyAlert = document.getElementById("requestEmptyAlert");
var ongoingEmptyAlert = document.getElementById("ongoingEmptyAlert");
var completedEmptyAlert = document.getElementById("completedEmptyAlert");

// invite box
var requestedBox = document.getElementById("requestedBox");
var ongoingBox = document.getElementById("ongoingBox");
var completedBox = document.getElementById("completedBox");

requestEmptyAlert.style.display = "none";
ongoingEmptyAlert.style.display = "none";
completedEmptyAlert.style.display = "none";


// invite count
var requestedCount = 0;
var ongoingCount = 0;
var completedCount = 0;

onStart();

function onStart(){

    if(userType==1){
        getAllInviteOfUser();
    }else if(userType==2){
        getAllInviteOfDoctor();
    }

}


function getAllInviteOfUser() {

    requestedBox.innerHTML = "";
    ongoingBox.innerHTML = "";
    completedBox.innerHTML = "";

    var paramData = new FormData();
    paramData.append("user_id", userId);

    fetch("http://localhost:8080/backend/invite/getAllInviteOfUser.php", {
        method: "POST",
        body: paramData
    })
        .then(response => response.json())
        .then(json => {

            if (json.status == 200) {
                console.log(json.status);
                //console.log(json.data);

                json.data.forEach(element => {

                    var inviteCardItem = document.createElement("div");
                    inviteCardItem.setAttribute("class", "col p-2");

                    switch (element["invite_status"]) {
                        case "1": {

                            inviteCardItem.innerHTML = `<div class="card" style="width: 18rem;">
                                    <div class="card-body">
                                        <h5 class="card-title">${element["service_name"]}</h5>
                                        <p class="card-text">Dr.${element["doctor_name"]} </p>
                                        <button class="btn btn-secondary" disabled>Requested <i class="bi bi-clock-fill"></i></button>
                                    </div>
                                </div>`
                            requestedBox.append(inviteCardItem);
                            requestedCount++;
                            break;
                        }

                        case "2": {

                            inviteCardItem.innerHTML = `<div class="card" style="width: 18rem;">
                                    <div class="card-body">
                                        <h5 class="card-title">${element["service_name"]}</h5>
                                        <p class="card-text">Dr.${element["doctor_name"]} </p>
                                        <button class="btn btn-primary" onclick=goToInviteDetails("${element["id"]}","${element["service_type"]}","${element["doctor_name"]}")>Details</button>
                                    </div>
                                </div>`
                            ongoingBox.append(inviteCardItem);
                            ongoingCount++;
                            break;
                        }

                        case "3": {

                            inviteCardItem.innerHTML = `<div class="card" style="width: 18rem;">
                                    <div class="card-body">
                                        <h5 class="card-title">${element["service_name"]}</h5>
                                        <p class="card-text">Dr.${element["doctor_name"]} </p>
                                        <button class="btn btn-success"> ${element["rating"]} <i class="bi bi-star-fill"></i></button>
                                    </div>
                                </div>`
                            completedBox.append(inviteCardItem);
                            completedCount++;
                            break;
                        }
                    }

                });

            } else if (json.status == 404) {
                console.log(json.message);
            }

            if (requestedCount == 0) {
                requestEmptyAlert.style.display = "block";
            }

            if (ongoingCount == 0) {
                ongoingEmptyAlert.style.display = "block";
            }

            if (completedCount == 0) {
                completedEmptyAlert.style.display = "block";
            }
        });



}


function getAllInviteOfDoctor() {

    requestedBox.innerHTML = "";
    ongoingBox.innerHTML = "";
    completedBox.innerHTML = "";

    var paramData = new FormData();
    paramData.append("doctor_id", userId);

    fetch("http://localhost:8080/backend/invite/getAllInviteOfDoctor.php", {
        method: "POST",
        body: paramData
    })
        .then(response => response.json())
        .then(json => {

            if (json.status == 200) {
                console.log(json.status);
                //console.log(json.data);

                json.data.forEach(element => {

                    var inviteCardItem = document.createElement("div");
                    inviteCardItem.setAttribute("class", "col p-2");

                    switch (element["invite_status"]) {
                        case "1": {

                            inviteCardItem.innerHTML = `<div class="card" style="width: 18rem;">
                                    <div class="card-body">
                                        <h5 class="card-title">${element["service_name"]}</h5>
                                        <p class="card-text">${element["user_name"]} </p>
                                        <button class="btn btn-primary" onclick=goToRequestInviteDetails("${element["id"]}","${element["service_type"]}","${element["user_id"]}")>Requested <i class="bi bi-clock-fill"></i></button>
                                    </div>
                                </div>`
                            requestedBox.append(inviteCardItem);
                            requestedCount++;
                            break;
                        }

                        case "2": {

                            inviteCardItem.innerHTML = `<div class="card" style="width: 18rem;">
                                    <div class="card-body">
                                        <h5 class="card-title">${element["service_name"]}</h5>
                                        <p class="card-text">${element["user_name"]} </p>
                                        <button class="btn btn-secondary" disabled )>Ongoing <i class="bi bi-graph-up-arrow"> </i></button>
                                    </div>
                                </div>`
                            ongoingBox.append(inviteCardItem);
                            ongoingCount++;
                            break;
                        }

                        case "3": {

                            inviteCardItem.innerHTML = `<div class="card" style="width: 18rem;">
                                    <div class="card-body">
                                        <h5 class="card-title">${element["service_name"]}</h5>
                                        <p class="card-text">${element["user_name"]} </p>
                                        <button class="btn btn-success"> ${element["rating"]} <i class="bi bi-star-fill"></i></button>
                                    </div>
                                </div>`
                            completedBox.append(inviteCardItem);
                            completedCount++;
                            break;
                        }
                    }

                });

            } else if (json.status == 404) {
                console.log(json.message);
            }

            if (requestedCount == 0) {
                requestEmptyAlert.style.display = "block";
            }

            if (ongoingCount == 0) {
                ongoingEmptyAlert.style.display = "block";
            }

            if (completedCount == 0) {
                completedEmptyAlert.style.display = "block";
            }
        });



}


function goToInviteDetails(inviteId, serviceType, doctorName) {
    sessionStorage.setItem("inviteId", inviteId);
    sessionStorage.setItem("serviceType", serviceType);
    sessionStorage.setItem("doctorName", doctorName);
    window.location.href = `inviteDetails/inviteDetails.html`;

}


function goToRequestInviteDetails(inviteId,serviceType,requestedUserId){

    sessionStorage.setItem("inviteId", inviteId);
    sessionStorage.setItem("serviceType", serviceType);
    sessionStorage.setItem("requestedUserId", requestedUserId);
    window.location.href = `requestedInviteDetails/requestedInviteDetails.html`;

}