var ipNumber=""
const info=document.getElementById("info");
$.getJSON("https://api.ipify.org?format=json", function(data) {
     ipNumber=data.ip;
     info.innerHTML=`Your current IP address is ${ipNumber}`
     console.log(data);
     console.log(123);
 })
 
 
 

function openPage2(){
    localStorage.setItem("ipAddress",ipNumber);
    window.open("page2.html");
}
