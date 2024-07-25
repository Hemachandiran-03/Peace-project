var userId = localStorage.getItem("userId");
var userType = localStorage.getItem("userType");


console.log(`UserID : ${userId}`);
console.log(`userType : ${userType}`)


var usernameInput = document.getElementById("username");
var passwordInput = document.getElementById("password");


async function loginAdmin() {

    if (usernameInput.value === "") {
        alert("Username should not be empty");
        return 0;
    }
    if (passwordInput.value === "") {
        alert("Password should not be empty");
        return 0;
    }


    var postData = new FormData();
    postData.append("username", usernameInput.value);
    postData.append("password", passwordInput.value);

    fetch("http://localhost:8080/backend/admin/loginAdmin.php",
        {
            method: "POST",
            body: postData,
        })
        .then(response => response.json())
        .then(json => {

            if (json.status == 200) {
               console.log(json.data);

                window.location.href = "../admin.html"

            } else if(json.status == 403) {
                console.log(json.status)
                alert(json.message)
            }

        });


}

function onClickRegister(){
    window.location.href="../doctorregister/doctorregister.html"
}


function goBackHome(){

    window.location.href = "../../home/home.html"
}