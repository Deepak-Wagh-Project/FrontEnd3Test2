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
  let arr=data.loc.split(',');
  basicInfo.innerHTML=``;
  basicInfo.innerHTML+=` <div class="ip-Address" id="ip-Address"><p>IP Address:${data.ip}</p></div>
  <div class="ip-info">
      <div class="details">
          <div id="latitude"><p>Lat: ${arr[0]}</p></div>
          <div id="longitude"><p>Long: ${arr[1]}</p></div>
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

  // current datetime string in America/Chicago timezone
let chicago_datetime_str = new Date().toLocaleString("en-US", { timeZone: `${data.timezone}` });

// create new Date object
let date_chicago = new Date(chicago_datetime_str);

// year as (YYYY) format
let year = date_chicago.getFullYear();

// month as (MM) format
let month = ("0" + (date_chicago.getMonth() + 1)).slice(-2);

// date as (DD) format
let date = ("0" + date_chicago.getDate()).slice(-2);

// date time in YYYY-MM-DD format
let date_time = year + "-" + month + "-" + date;

// "2021-03-22"
console.log(date_time);
  
  moreDetailContainer.innerHTML=`<div class="title"><p>More Information About You</p></div>
  <div class="more-details"><p>Time Zone:${data.timezone}</p></div>
  <div class="more-details"><p>Date And Time:${date_time}</p></div>
  <div class="more-details"><p>Pincode:${data.postal}</p></div>`
  getPostOffices(data.postal);

}
moreDetails();

async function getPostOffices(pincode){
    officeContainer.innerHTML=``;
  const url=`${baseUrl}${pincode}`
  const response= await fetch(url,{method:"GET"});
  const data=await response.json();
  console.log(data);
  if(data[0].PostOffice===null||data[0].Status>200){
    officeContainer.innerHTML+=`<p class="No-results">No results returned</p>`
    return;
  }
  const list=data[0].PostOffice;

  console.log(list);
  for(let i=0;i<list.length;i++){
  
     officeContainer.innerHTML+=` <div class="post-Office">
     <div class="office-Name"><p>Name:${list[i].Name}</p></div>
     <div class="branch-type"><P>Branch Type:${list[i].BranchType}</P></div>
     <div class="delivery-status"><p>Delivery Status:${list[i].DeliveryStatus}</p></div>
     <div class="district"><p>District:${list[i].District}</p></div>
     <div class="division"><p>Division:${list[i].Division}</p></div>
 </div>`

  }
}

searchButton.addEventListener("click",()=>{
    val=searchBox.value.trim();
    if(val===''){
      officeContainer.innerHTML=`<p class="No-results">Please enter the pincode</p>`;
      return;

    }
    getPostOffices(val);
    
})

 async function  getlocation(){
  const response=  await fetch(`https://ipinfo.io/${ipNumber}/geo?token=2c537d88a354ec`,{method:"GET"});
  const data= await response.json();
  frame.src=`https://maps.google.com/maps?q=${data.loc}&output=embed`

 }
 getlocation();
//getResponse();
