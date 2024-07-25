var usernameInput = document.getElementById("username");
var passwordInput = document.getElementById("password");

function goBackHome(){

    window.location.href = "../../home/home.html"
}

async function loginCustomer() {

    if (usernameInput.value === "") {
        alert("Username should not be empty");
        return 0;
    }
    if (passwordInput.value === "") {
        alert("Password should not be empty");
        return 0;
    }

    var returnId;

    var postData = new FormData();
    postData.append("username", usernameInput.value);
    postData.append("password", passwordInput.value);

    fetch("http://localhost:8080/backend/customer/loginCustomer.php",
        {
            method: "POST",
            body: postData,
        })
        .then(response => response.json())
        .then(json => {

            if (json.status == 200) {
               console.log(json.data);
                returnId = json.data[0]["id"];

                localStorage.setItem("userId", returnId);
                localStorage.setItem("userType",1);

                window.location.href = "../../home/home.html"

            } else if(json.status == 403) {
                console.log(json.status)
                alert(json.message)
            }

        });


}

function onClickRegister(){
    window.location.href="../register/register.html"
}