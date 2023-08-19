const baseUrl="https://api.postalpincode.in/pincode/"
const officeContainer=document.getElementById("offices");
const searchBox= document.getElementById("searchBoxInput");
const searchButton= document.getElementById("search-Button");
const ipNumber= localStorage.getItem("ipAddress");
const ipAddress=document.getElementById("ip-Address");
const basicInfo=document.getElementById("ip-Infordation");
ipAddress.innerText+=`${ipNumber}`
var pincode=``;
const moreDetailContainer=document.getElementById("more-Information");
const frame =document.getElementById("frame");

async function basicDetails(){
  const response=  await fetch(`https://ipinfo.io/${ipNumber}/geo?token=2c537d88a354ec`,{method:"GET"});
  const data= await response.json();
  basicInfo.innerHTML=``;
  basicInfo.innerHTML+=` <div class="ip-Address" id="ip-Address"><p>IP Address:${data.ip}</p></div>
  <div class="ip-info">
      <div class="details">
          <div id="latitude"><p>Lat: ${data.loc}</p></div>
       </div>
      <div class="details">
          <div id="city"><p>City: ${data.city}</p></div>
          <div id="region"><p>Region:${data.region}</p></div>
      </div>
      <div class="details">
          <div id="organization"><p>Organization: ${data.org}</p></div>
         
      </div>
  </div>`
  pincode=data.postal;
   console.log(data);
}

basicDetails();

async function moreDetails(){
  const response=  await fetch(`https://ipinfo.io/${ipNumber}/geo?token=2c537d88a354ec`,{method:"GET"});
  const data= await response.json();
  moreDetailContainer.innerHTML=`<div class="title"><p>More Information About You</p></div>
  <div class="more-details"><p>Time Zone:${data.timezone}</p></div>
  <div class="more-details"><p>Date And Time:</p></div>
  <div class="more-details"><p>Pincode:${data.postal}</p></div>
  <div class="more-details"><p>Message: Number of pincode(s) found: </p></div>`
  getPostOffices(data.postal);

}
moreDetails();

async function getPostOffices(pincode){
    officeContainer.innerHTML=``;
  const url=`${baseUrl}${pincode}`
  const response= await fetch(url,{method:"GET"});
  const data=await response.json();
  if(data[0].PostOffice===null){
    officeContainer.innerHTML+=`<p class="No-results">No results returned</p>`
    return;
  }
  const list=data[0].PostOffice;

  console.log(list);
  for(let i=0;i<list.length;i++){
  
     officeContainer.innerHTML+=` <div class="post-Office">
     <div class="office-Name"><p>Name:${list[i].Name}</p></div>
     <div class="branch-type"><P>Brance Type:${list[i].BranchType}</P></div>
     <div class="delivery-status"><p>Delivery Status:${list[i].DeliveryStatus}</p></div>
     <div class="district"><p>District:${list[i].District}</p></div>
     <div class="division"><p>Division:${list[i].Division}</p></div>
 </div>`

  }
}

searchButton.addEventListener("click",()=>{
    val=searchBox.value.trim();
    getPostOffices(val);
})

 async function  getlocation(){
  const response=  await fetch(`https://ipinfo.io/${ipNumber}/geo?token=2c537d88a354ec`,{method:"GET"});
  const data= await response.json();
  frame.src=`https://maps.google.com/maps?q=${data.loc}&output=embed`

 }
 getlocation();
//getResponse();
