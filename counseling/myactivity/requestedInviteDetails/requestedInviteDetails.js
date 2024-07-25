var userId = localStorage.getItem("userId");
var userType = localStorage.getItem("userType");


console.log(`UserID : ${userId}`);
console.log(`userType : ${userType}`)

function goBackHome() {
    window.location.href = "../home/home.html"
}


var inviteId = sessionStorage.getItem("inviteId");
var serviceType = sessionStorage.getItem("serviceType");
var requestedUserId = sessionStorage.getItem("requestedUserId");

var firstnameInput = document.getElementById("firstname");
var lastnameInput = document.getElementById("lastname");
var emailInput = document.getElementById("email");
var countryInput = document.getElementById("country");
var phoneInput = document.getElementById("phone");
var usernameInput = document.getElementById("username");
var serviceNameInput = document.getElementById("serviceName");

onStart();


function onStart(){

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

    getuserInfo();

}



async function getuserInfo() {


    var postData = new FormData();
    postData.append("id", requestedUserId);

    console.log(`id : ${requestedUserId}`);

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

                    usernameInput.value = json.data[0].username
                    firstnameInput.value = json.data[0].firstname
                    lastnameInput.value = json.data[0].lastname
                    emailInput.value = json.data[0].email
                    phoneInput.value = json.data[0].phone
                    countryInput.value = json.data[0].country

                    

                } else {
                    console.log(json.status);
                    alert("Something went wrong!")
                }

            });

    }

}

function onClickAccepted(){

    var postData = new FormData();
    postData.append("id",inviteId);
    postData.append("invite_status",2);
    postData.append("rating",0);

    fetch("http://localhost:8080/backend/invite/updateInviteDetails.php",
        {
            method: "POST",
            body: postData
            
        }).then(response => response.json())
        .then(json => {

            if (json.status == 200) {
                console.log(json.message);

                window.location.href = "../../home/home.html"

            } else {
                console.log(json.status)
            }

        });

}