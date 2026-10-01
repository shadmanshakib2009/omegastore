const products=[
{id:"86",name:"86 Diamonds",price:75},
{id:"172",name:"172 Diamonds",price:150},
{id:"257",name:"257 Diamonds",price:225},
{id:"344",name:"344 Diamonds",price:300},
{id:"429",name:"429 Diamonds",price:375},
{id:"514",name:"514 Diamonds",price:450},
{id:"706",name:"706 Diamonds",price:600},
{id:"1060",name:"1,060 Diamonds",price:900}
];
let cart=[],selected=null;
const MERCHANT="01XXXXXXXXX"; // Replace with your authorized bKash merchant number.
document.getElementById("merchantDisplay").textContent=MERCHANT;
document.getElementById("modalMerchant").textContent=MERCHANT;

function renderProducts(){
 const q=(document.getElementById("search").value||"").toLowerCase();
 document.getElementById("products").innerHTML=products.filter(p=>p.name.toLowerCase().includes(q)).map(p=>`
 <article class="product">
   <div class="diamond-icon">◆</div><small>MLBB DIAMONDS</small>
   <h3>${p.name}</h3><div class="price">৳${p.price}</div>
   <button class="primary" onclick="buy('${p.name}',${p.price})">Buy Now</button>
 </article>`).join("");
}
renderProducts();

function buy(name,price){
 selected={name,price};
 document.getElementById("checkoutTitle").textContent="Complete your order";
 document.getElementById("checkoutProduct").textContent=name;
 document.getElementById("checkoutPrice").textContent="৳"+price;
 document.getElementById("playerId").value="";
 document.getElementById("serverId").value="";
 document.getElementById("trxId").value="";
 document.getElementById("orderMessage").innerHTML="";
 document.getElementById("checkoutModal").classList.remove("hidden");
}
function closeCheckout(){document.getElementById("checkoutModal").classList.add("hidden")}
function submitOrder(){
 const pid=document.getElementById("playerId").value.trim(),sid=document.getElementById("serverId").value.trim(),trx=document.getElementById("trxId").value.trim();
 if(!/^\d{4,15}$/.test(pid)||!/^\d{1,8}$/.test(sid)){toast("Enter a valid Player ID and Server ID.");return}
 if(!trx){toast("Enter your bKash Transaction ID.");return}
 const id="OMEGA"+Math.floor(100000+Math.random()*900000);
 const order={id,product:selected.name,amount:selected.price,playerId:pid,serverId:sid,trx,status:"Pending verification",created:new Date().toLocaleString()};
 localStorage.setItem(id,JSON.stringify(order));
 document.getElementById("orderMessage").innerHTML=`Order <b>${id}</b> submitted.<br>Status: Pending verification.`;
}
function track(){
 const id=document.getElementById("trackId").value.trim().toUpperCase(),raw=localStorage.getItem(id),box=document.getElementById("trackResult");
 if(!raw){box.innerHTML="<span style='color:#ff8b9d'>Order not found in this browser.</span>";return}
 const o=JSON.parse(raw);box.innerHTML=`<div class="summary"><span><b>${o.product}</b><br>Player ID: ${o.playerId}<br>TrxID: ${o.trx}</span><b>${o.status}</b></div>`;
}
function openCart(){renderCart();document.getElementById("cartModal").classList.remove("hidden")}
function renderCart(){
 const box=document.getElementById("cartItems");
 if(!cart.length){box.innerHTML="<p style='color:#8e9ab2'>Your cart is empty.</p>";return}
 let total=0;box.innerHTML=cart.map((x,i)=>{total+=x.price;return `<div class="cart-line"><span>${x.name}</span><b>৳${x.price}</b></div>`}).join("")+`<div class="cart-total"><span>Total</span><b>৳${total}</b></div>`;
}
function checkoutCart(){if(!cart.length){toast("Cart is empty.");return}const x=cart[0];document.getElementById("cartModal").classList.add("hidden");buy(x.name,x.price)}
function copyMerchant(){navigator.clipboard?.writeText(MERCHANT);toast("Merchant number copied.")}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2500)}
