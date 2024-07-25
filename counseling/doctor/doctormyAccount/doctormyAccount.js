const userId = localStorage.getItem("userId");
const userType = localStorage.getItem("userType");

console.log(`UserID : ${userId}`);
console.log(`userType : ${userType}`)

var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var serviceInput = document.getElementById("service");
var phoneInput = document.getElementById("phone");
var usernameInput = document.getElementById("username");

getDoctorInfo();



async function getDoctorInfo() {


    var postData = new FormData();
    postData.append("id", userId);

    console.log(`id : ${userId}`);

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

                    nameInput.value = json.data[0].name
                    emailInput.value = json.data[0].email
                    phoneInput.value = json.data[0].phone
                    serviceInput.value = json.data[0].service
                    usernameInput.value = json.data[0].username                    

                } else {
                    console.log(json.status);
                    alert("Something went wrong!")
                }

            });

    }

}



function goBackHome(){

    window.location.href = "../../home/home.html"
}