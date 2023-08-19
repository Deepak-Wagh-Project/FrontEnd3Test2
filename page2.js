const baseUrl="https://api.postalpincode.in/pincode/"
const officeContainer=document.getElementById("offices");
const searchBox= document.getElementById("searchBoxInput");
const searchButton= document.getElementById("search-Button");
const ipNumber= localStorage.getItem("ipAddress");
const ipAddress=document.getElementById("ip-Address");
ipAddress.innerText+=`${ipNumber}`
async function getPostOffices(pincode){
    officeContainer.innerHTML=``;
  const url=`${baseUrl}${pincode}`
  const response= await fetch(url,{method:"GET"});
  const data=await response.json();
  const list=data[0].PostOffice;
  console.log(list);
  for(let i=0;i<list.length;i++){
    console.log(i);
     officeContainer.innerHTML+=` <div class="post-Office">
     <div class="office-Name"><p>Name:${list[i].Name}</p></div>
     <div class="branch-type"><P>Brance Type:${list[i].BranchType}</P></div>
     <div class="delivery-status"><p>Delivery Status:${list[i].DeliveryStatus}</p></div>
     <div class="district"><p>District:${list[i].District}</p></div>
     <div class="division"><p>Division:${list[i].Division}</p></div>
 </div>`
  }
}
getPostOffices(457001);
searchButton.addEventListener("click",()=>{
    val=searchBox.value.trim();
    getPostOffices(val);
})

