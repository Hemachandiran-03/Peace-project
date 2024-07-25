var socialMediaType = localStorage.getItem("socialMediaType");

var logo = document.getElementById("icon");
var nameTxt = document.getElementById("name");

onStart();


function onStart() {
    var element = document.createElement("i");


    console.log(`type:${socialMediaType}`);

    switch (socialMediaType) {

        case "1": {
            element.setAttribute("class","bi bi-facebook");
            nameTxt.innerHTML="FACEBOOK";
            break;
        }

        case "2": {
            element.setAttribute("class","bi bi-instagram");
            nameTxt.innerHTML="INSTAGRAM";
            break;
        }

        case "3": {
            element.setAttribute("class","bi bi-twitter");
            nameTxt.innerHTML="TWITTER";
            break;
        }
        
        default: {
            element.setAttribute("class","bi bi-facebook");
            nameTxt.innerHTML="FACEBOOK";
            break;
        }
    }

    logo.append(element);


}
