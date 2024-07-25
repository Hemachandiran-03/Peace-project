const userId = localStorage.getItem("userId");
const userType = localStorage.getItem("userType");

// localStorage.clear();

console.log(`UserID : ${userId}`);
console.log(`userType : ${userType}`);
onStart();

function onStart() {

    console.log("iside the start fucntion")


    var navItemMyAcc = document.getElementById("nav-item-myacc");
    var navItemMyAct = document.getElementById("nav-item-myact");
    var navItemLInvite = document.getElementById("nav-item-invite");
    var navItemLogout = document.getElementById("nav-item-logout");

    if (userId != null) {
        navItemMyAcc.innerHTML = "My Account";
        navItemLogout.style.display = "block";
        navItemMyAct.style.display = "block";
        navItemLInvite.style.display = "block";
        console.log("iside the start fucntion 1")
    } else {
        navItemMyAcc.innerHTML = "Login";
        navItemLogout.style.display = "none";
        navItemMyAct.style.display = "none";
        navItemLInvite.style.display = "none";
        console.log("iside the start fucntion 2")
    }
}

function onClickLogOut() {

    localStorage.clear();

    window.location.reload();

}


function onClickMyAcc() {

    if (userId != null) {

        // localStorage.setItem("userId",userId);
        // localStorage.setItem("userType",userType);


        // console.log(`UserID : ${userId}`);
        // console.log(`userType : ${userType}`)



        if (userType == 1) {
            window.location.href = "../user/myAccount/myAccount.html"
        } else if (userType == 2) {
            window.location.href = "../doctor/doctormyAccount/doctormyAccount.html"
        }




    } else {

        window.location.href = "../user/login/login.html"

    }

}


function onClickLearnMore() {

    window.location.href = "../service/service.html"


}


function onClickSocialMedia(type){

    localStorage.setItem("socialMediaType",type);

    window.location.href = "../fakeSocialMedia/fakeSocialMedia.html";

}