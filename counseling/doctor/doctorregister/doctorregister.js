var userId = localStorage.getItem("userId");
var userType = localStorage.getItem("userType");


console.log(`UserID : ${userId}`);
console.log(`userType : ${userType}`)


var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var serviceInput = document.getElementById("service");
var phoneInput = document.getElementById("phone");
var usernameInput = document.getElementById("username");
var passwordInput = document.getElementById("password");
var confirmpasswordInput = document.getElementById("confirmpassword");


async function createDoctor() {


    if (nameInput.value === "") {
        alert("Name should not be empty");
        return 0;
    }
    if (emailInput.value === "") {
        alert("Email should not be empty");
        return 0;
    }
    if (serviceInput.value === "Select a service") {
        alert("Service should not be empty");
        return 0;
    }
    if (phoneInput.value === "") {
        alert("Contact Number should not be empty");
        return 0;
    }
    if (usernameInput.value === "") {
        alert("Username should not be empty");
        return 0;
    }
    if (passwordInput.value === "") {
        alert("Password should not be empty");
        return 0;
    }


    if (passwordInput.value == confirmpasswordInput.value) {

        var returnId;

        var postData = new FormData();
        postData.append("name", nameInput.value);
        postData.append("email", emailInput.value);
        postData.append("phone", phoneInput.value);
        postData.append("service", serviceInput.value);
        postData.append("username", usernameInput.value);
        postData.append("password", passwordInput.value);

        fetch("http://localhost:8080/backend/doctor/createDoctor.php",
            {
                method: "POST",
                body: postData,
            })
            .then(response => response.json())
            .then(json => {

                if (json.status == 201) {
                    console.log(json.data);
                    returnId = json.data;

                    localStorage.setItem("userId",returnId);
                    localStorage.setItem("userType",2);

                    window.location.href = "../../home/home.html"

                } else {
                    console.log(json.status)
                }

            });

    } else {
        console.log("Password and Confirm Password should be same!")
        alert("Password and Confirm Password should be same!")
    }

}



async function register() {


    // checking th username
    var username = usernameInput.value;
    var postData = new FormData();
    postData.append("username", username);

    console.log(`username : ${username}`);

    if (username === "") {
        alert("Username should not be empty");
        return 0;
    } else {

        fetch("http://localhost:8080/backend/doctor/checkDocUsername.php",
            {
                method: "POST",
                body: postData,
            })
            .then(response => response.json())
            .then(json => {

                if (json.status == 200) {
                    console.log(json.status);

                    createDoctor();


                } else {
                    console.log(json.status);
                    alert("Usrename Already exists")
                }

            });

    }

}



function goBackHome(){

    window.location.href = "../../home/home.html"
}