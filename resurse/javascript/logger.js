let lastEventDate = new Date();

document.body.addEventListener("click", function(event) {
    lastEventDate = new Date();
    let elem = document.getElementById("log");
    let message =  GetDate() + " click, coords: " + event.clientX + " " + event.clientY + "<br>";
    elem.innerHTML = elem.innerHTML + message;
}, true);

document.body.addEventListener("keydown", function(event) {
    lastEventDate = new Date();
    let elem = document.getElementById("log");
    let message =  GetDate() + " keydown, key code: " + event.keyCode + "<br>";
    elem.innerHTML = elem.innerHTML + message;
}, true);

document.body.addEventListener("keyup", function(event) {
    lastEventDate = new Date();
    let elem = document.getElementById("log");
    let message =  GetDate() + " keyup, key code: " + event.keyCode + "<br>";
    elem.innerHTML = elem.innerHTML + message;
}, true);

window.addEventListener("scroll", function(event) {
    lastEventDate = new Date();
    let elem = document.getElementById("log");
    let message =  GetDate() + " scroll, coords: " + window.pageYOffset + "<br>";
    elem.innerHTML = elem.innerHTML + message;
}, true);

setInterval(function() {
    let currentDate = new Date();
    if(currentDate - lastEventDate > 10000)
    {
        document.getElementById("inactivity").style.display = "inline";
        document.getElementById("nrSecInactiv").innerHTML = Math.floor((currentDate - lastEventDate) / 1000);
    }
    else
    {
        document.getElementById("inactivity").style.display = "none";
    }
}, 1000)

function GetDate()
{
    let currentDate = new Date();
    return currentDate.getDate() + "/"
    + (currentDate.getMonth()+1)  + "/" 
    + currentDate.getFullYear() + " "  
    + (currentDate.getHours() < 10 ? 0 : "") + currentDate.getHours() + ":"  
    + (currentDate.getMinutes() < 10 ? 0 : "") + currentDate.getMinutes() + ":" 
    + (currentDate.getSeconds() < 10 ? 0 : "") + currentDate.getSeconds();
}