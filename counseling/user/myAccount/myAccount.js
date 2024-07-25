var userId = localStorage.getItem("userId");
var userType = localStorage.getItem("userType");


console.log(`UserID : ${userId}`);
console.log(`userType : ${userType}`)


function goBackHome(){

    window.location.href = "../../home/home.html"
}


var firstnameInput = document.getElementById("firstName");
var lastnameInput = document.getElementById("lastName");
var emailInput = document.getElementById("email");
var dobInput = document.getElementById("dob");
var countryInput = document.getElementById("country");
var phoneInput = document.getElementById("phone");
var usernameInput = document.getElementById("username");

getuserInfo();



async function getuserInfo() {


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

                    usernameInput.value = json.data[0].username
                    firstnameInput.value = json.data[0].firstname
                    lastnameInput.value = json.data[0].lastname
                    emailInput.value = json.data[0].email
                    phoneInput.value = json.data[0].phone
                    dobInput.value = json.data[0].dob
                    countryInput.value = json.data[0].country

                    

                } else {
                    console.log(json.status);
                    alert("Something went wrong!")
                }

            });

    }

}