// count elements
var customersCount = document.getElementById("customersCount");
var doctorsCount = document.getElementById("doctorsCount");
var ongoingCount = document.getElementById("ongoingCount");
var feedbacksCount = document.getElementById("feedbacksCount");


// feedback elements
var feedbackList = document.getElementById("feedbackList");
var noFeedbackAvailableAlert = document.getElementById("noFeedbackAvailableAlert");

noFeedbackAvailableAlert.style.display = "none";

onStart();

function onStart() {

    getCountDetails();
    getRecentFeedbacks();

}


function getCountDetails() {



    fetch("http://localhost:8080/backend/admin/getCountDetails.php")
        .then(response => response.json())
        .then(json => {

            if (json.status == 200) {

                console.log(json.data);

                customersCount.innerHTML=`<b>${json.data.customers}</b>`
                doctorsCount.innerHTML=`<b>${json.data.doctors}</b>`
                ongoingCount.innerHTML=`<b>${json.data.ongoing}</b>`
                feedbacksCount.innerHTML=`<b>${json.data.feedback}</b>`


            }

        });


}


function getRecentFeedbacks() {


    var paramData = new FormData();
    paramData.append("count", 5);


    fetch("http://localhost:8080/backend/feedback/getRecentFeedbacks.php",
        {
            method: "POST",
            body: paramData
        })
        .then(response => response.json())
        .then(json => {

            if (json.status == 200) {

                console.log(json.data);

                feedbackList.innerHTML = "";

                json.data.forEach(element => {

                    var feedbackListItem = document.createElement("li");
                    feedbackListItem.setAttribute("class", "list-group-item mb-5");
                    feedbackListItem.innerHTML = `<div class="container-fluid p-5 rounded">

                    <div class="row justify-content-between">
                        <div class="col">
                            <div class="h3">Dr.${element["doctor_name"]}</div>
                            <div class="lead">Commented by : ${element["user_name"]}</div>
                        </div>

                        <div class="col-md-1">
                            <button class="btn btn-success btn-lg" style="min-width: 85px;">
                                ${element["rating"]} <i class="bi bi-star-fill"></i>
                            </button>
                        </div>
                    </div>
                    <hr>

                    <div class="row">
                        <div class="col-12">
                            <div class="lead"><b>${element["comment"]}</b>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row pt-3">
                        <div class="col-12">
                            <div class="lead text-end">${element["time"]}</div>
                        </div>
                    </div>

                </div>`;

                    feedbackList.append(feedbackListItem);

                });

                noFeedbackAvailableAlert.style.display = "none";


            } else if (json.status == 404) {
                noFeedbackAvailableAlert.style.display = "block";
            }

        });


}