var userId = localStorage.getItem("userId");
var userType = localStorage.getItem("userType");
var inviteId = sessionStorage.getItem("inviteId");


console.log(`UserID : ${userId}`);
console.log(`userType : ${userType}`)
console.log(`inviteId : ${inviteId}`)

function onBack() {
    window.history.back();
}

// details
var serviceType;
var serviceName;
var doctorId;
var doctorName;
var userName;
var rating = 0;
var comment;
var time;

// elements
var usernameInput = document.getElementById("userUsername");
var doctorNameInput = document.getElementById("doctorname");
var serviceTypeInput = document.getElementById("serviceType");
var commentInput = document.getElementById("comment");


//rating star elements
var star1 = document.getElementById("star1");
var star2 = document.getElementById("star2");
var star3 = document.getElementById("star3");
var star4 = document.getElementById("star4");
var star5 = document.getElementById("star5");

getInviteDetails();

// rating star function
function starClick(rate) {

    rating = rate;

    console.log(`rate:${rating}`)

    switch (rate) {
        case 1: {
            star1.setAttribute("class", "bi bi-star-fill");
            star2.setAttribute("class", "bi bi-star");
            star3.setAttribute("class", "bi bi-star");
            star4.setAttribute("class", "bi bi-star");
            star5.setAttribute("class", "bi bi-star");
            break;
        }
        case 2: {
            star1.setAttribute("class", "bi bi-star-fill");
            star2.setAttribute("class", "bi bi-star-fill");
            star3.setAttribute("class", "bi bi-star");
            star4.setAttribute("class", "bi bi-star");
            star5.setAttribute("class", "bi bi-star");
            break;
        }
        case 3: {
            star1.setAttribute("class", "bi bi-star-fill");
            star2.setAttribute("class", "bi bi-star-fill");
            star3.setAttribute("class", "bi bi-star-fill");
            star4.setAttribute("class", "bi bi-star");
            star5.setAttribute("class", "bi bi-star");
            break;
        }
        case 4: {
            star1.setAttribute("class", "bi bi-star-fill");
            star2.setAttribute("class", "bi bi-star-fill");
            star3.setAttribute("class", "bi bi-star-fill");
            star4.setAttribute("class", "bi bi-star-fill");
            star5.setAttribute("class", "bi bi-star");
            break;
        }
        case 5: {
            star1.setAttribute("class", "bi bi-star-fill");
            star2.setAttribute("class", "bi bi-star-fill");
            star3.setAttribute("class", "bi bi-star-fill");
            star4.setAttribute("class", "bi bi-star-fill");
            star5.setAttribute("class", "bi bi-star-fill");
            break;
        }
    }

}


function getInviteDetails() {

    var postData = new FormData();
    postData.append("id", inviteId);

    console.log(`invite id : ${inviteId}`);

    if (inviteId === "") {
        alert("Something went wrong!");
        return 0;
    } else {

        fetch("http://localhost:8080/backend/invite/getInviteById.php",
            {
                method: "POST",
                body: postData,
            })
            .then(response => response.json())
            .then(json => {

                if (json.status == 200) {
                    console.log(json.status);
                    console.log(json.data)

                    serviceType = json.data[0].service_type;
                    serviceName = json.data[0].service_name;
                    doctorId = json.data[0].doctor_id;
                    doctorName = json.data[0].doctor_name;
                    userName = json.data[0].user_name;

                    usernameInput.value = userName;
                    doctorNameInput.value = doctorName;
                    serviceTypeInput.value = serviceName;

                } else {
                    console.log(json.status);
                    alert("Something went wrong!")
                }

            });

    }


}

function submitFeedback() {

    comment = commentInput.value;
    var currentdate = new Date();
    time = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    console.log(`Time : ${time}`);

    var postData = new FormData();
    postData.append("invite_id", inviteId);
    postData.append("service_type", serviceType);
    postData.append("service_name", serviceName);
    postData.append("doctor_id", doctorId);
    postData.append("doctor_name", doctorName);
    postData.append("user_id", userId);
    postData.append("user_name", userName);
    postData.append("rating", rating);
    postData.append("comment", comment);
    postData.append("time", time);

    fetch("http://localhost:8080/backend/feedback/createFeedback.php",
        {
            method: "POST",
            body: postData
            
        }).then(response => response.json())
        .then(json => {

            if (json.status == 201) {
                console.log(json.message);

                updateInvite();

                // window.location.href = "../home/home.html"

            } else {
                console.log(json.status)
            }

        });

}

function updateInvite(){

    var postData = new FormData();
    postData.append("id",inviteId);
    postData.append("invite_status",3);
    postData.append("rating",rating);

    fetch("http://localhost:8080/backend/invite/updateInviteDetails.php",
        {
            method: "POST",
            body: postData
            
        }).then(response => response.json())
        .then(json => {

            if (json.status == 200) {
                console.log(json.message);

                window.location.href = "../home/home.html"

            } else {
                console.log(json.status)
            }

        });
}


