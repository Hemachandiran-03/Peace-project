var userId = localStorage.getItem("userId");
var userType = localStorage.getItem("userType");


console.log(`UserID : ${userId}`);
console.log(`userType : ${userType}`)


function goBackHome() {
    window.location.href = "../home/home.html"
}

// body
var bodyConatiner = document.getElementById("bodyConatiner");
// div 
var selectServiceDiv = document.getElementById("selectServiceDiv");
var selectDoctorDiv = document.getElementById("selectDoctorDiv");
var doctorDetailsDiv = document.getElementById("doctorDetailsDiv");
var userDetailsDiv = document.getElementById("userDetailsDiv");

// service select
var inviteServiceInput = document.getElementById("inviteService");
// select doctor
var noDoctorAvailableAlert = document.getElementById("noDoctorAvailableAlert");
var feedbackList = document.getElementById("doctorList");
// doctor details
var docNameInput = document.getElementById("docName");
var docEmailInput = document.getElementById("docEmail");
var docServiceInput = document.getElementById("docService");
var docPhoneInput = document.getElementById("docPhone");
// user details
var userUsernameInput = document.getElementById("userUsername");
var userFirstInput = document.getElementById("userFirstName");
var userEmailInput = document.getElementById("userEmail");
var userCountryInput = document.getElementById("userCountry");
var userLastnameInput = document.getElementById("userLastName");
var userPhoneInput = document.getElementById("userPhone");

// variable
var selectedDoctorId;
var selectedService;


// initially hiding all other div except select service
selectDoctorDiv.style.display = "none";
doctorDetailsDiv.style.display = "none";
userDetailsDiv.style.display = "none";

inviteServiceInput.addEventListener("change", serviceChange);


function serviceChange() {

    var serviceValue = inviteServiceInput.value;
    console.log(serviceValue)
    switch (serviceValue) {

        case "1": {
            selectedService="Individual Counseling";
            getDocotorList("Individual Counseling");
            break;
        }

        case "2": {
            selectedService="Relationship Counseling";
            getDocotorList("Relationship Counseling");
            break;
        }

        case "3": {
            selectedService="Career Counseling";
            getDocotorList("Career Counseling");
            break;
        }

        case "4": {
            selectedService="Educational Counseling";
            getDocotorList("Educational Counseling");
            break;
        }

        default: {
            break;
        }
    }

}

function getDocotorList(service) {

    var postData = new FormData();
    postData.append("service", service);

    console.log(`service : ${service}`);

    if (service === "") {
        alert("Something went wrong!");
        return 0;
    } else {

        fetch("http://localhost:8080/backend/invite/getSpecificDoctorList.php",
            {
                method: "POST",
                body: postData,
            })
            .then(response => response.json())
            .then(json => {

                if (json.status == 200) {
                    console.log(json.status);
                    //console.log(json.data);
                    
                    feedbackList.innerHTML="";

                    json.data.forEach(element => {

                        var docListItem = document.createElement("li");
                        docListItem.setAttribute("class","list-group-item d-flex justify-content-between align-items-start");
                        docListItem.innerHTML = `<div class="ms-2 me-auto">
                            <div class="fw-bold">${element["name"]}</div>
                                ${element["username"]}
                            </div>
                            <button type="button" class="btn btn-primary" onclick="onDoctorSelect(${element["id"]})">Select</button>
                        </div>`;

                       feedbackList.append(docListItem);
                        
                    });

                    noDoctorAvailableAlert.style.display="none";
                    feedbackList.style.display = "block";
                    selectDoctorDiv.style.display = "block";
                    selectDoctorDiv.scrollIntoView({behavior:"smooth",block:"start"});



                } else if(json.status == 403){
                    console.log(json.status);

                    noDoctorAvailableAlert.style.display="block";
                    feedbackList.style.display = "none";

                    selectDoctorDiv.style.display = "block";
                    bodyConatiner.scrollIntoView({behavior:"smooth",block:"end"});

                }

            });

    }

}

function onDoctorSelect(docId){

    console.log(`Selected doctor id : ${docId}`);



    
    var postData = new FormData();
    postData.append("id", docId);

    if (userId === "") {
        alert("Something went wrong!");
        return 0;
    } else {

        fetch("http://localhost:8080/backend/doctor/getDoctorDetails.php",
            {
                method: "POST",
                body: postData,
            })
            .then(response => response.json())
            .then(json => {

                if (json.status == 200) {
                    console.log(json.status);
                    console.log(json.data)

                    docNameInput.value = json.data[0].name
                    docEmailInput.value = json.data[0].email
                    docPhoneInput.value = json.data[0].phone
                    docServiceInput.value = json.data[0].service
                    
                    doctorDetailsDiv.style.display="block";

                    selectedDoctorId = docId;
                    
                    setUserDetails();

                } else {
                    console.log(json.status);
                    alert("Something went wrong!")
                }

            });

    }

}

function setUserDetails(){
    var postData = new FormData();
    postData.append("id", userId);

    console.log(`id : ${userId}`);

    if (userId === "") {
        alert("Something went wrong!");
        return 0;
    } else {

        fetch("http://localhost:8080/backend/customer/getUserDetails.php",
            {
                method: "POST",
                body: postData,
            })
            .then(response => response.json())
            .then(json => {

                if (json.status == 200) {
                    console.log(json.status);
                    console.log(json.data)

                    userUsernameInput.value = json.data[0].username
                    userFirstInput.value = json.data[0].firstname
                    userLastnameInput.value = json.data[0].lastname
                    userEmailInput.value = json.data[0].email
                    userPhoneInput.value = json.data[0].phone
                    userCountryInput.value = json.data[0].country

                    userDetailsDiv.style.display="block";
                    bodyConatiner.scrollIntoView({behavior:"smooth",block:"end"});

                } else {
                    console.log(json.status);
                    alert("Something went wrong!")
                }

            });

    }
}

function inviteOnclick(){

    var postData = new FormData();
        postData.append("invite_status", 1);
        postData.append("service_type", inviteServiceInput.value);
        postData.append("service_name", selectedService);
        postData.append("doctor_id", selectedDoctorId);
        postData.append("doctor_name", docNameInput.value);
        postData.append("user_id", userId);
        postData.append("user_name", userUsernameInput.value);
        postData.append("user_email", userEmailInput.value);
        postData.append("user_phone", userPhoneInput.value);
        postData.append("rating", 0);

        fetch("http://localhost:8080/backend/invite/createInvite.php",
            {
                method: "POST",
                body: postData,
            })
            .then(response => response.json())
            .then(json => {

                if (json.status == 201) {
                    console.log(json.data);
                    returnId = json.data;

                    window.location.href = "../home/home.html"

                } else {
                    console.log(json.status)
                }

            });


}
