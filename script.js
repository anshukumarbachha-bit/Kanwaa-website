function checkPin(){
let pin = document.getElementById("pincode").value;

if(pin.length == 6){
document.getElementById("msg").innerText = "Delivery Available in Bihar";
}else{
document.getElementById("msg").innerText = "Enter Valid Pincode";
}
}

function placeOrder(){

let name = document.getElementById("name").value;
let phone = document.getElementById("phone").value;
let product = document.getElementById("product").value;
let qty = document.getElementById("qty").value;

if(product !== "20L Can" && qty < 30){
alert("Minimum 30 boxes required!");
return;
}

let message = `New Order:
Name: ${name}
Phone: ${phone}
Product: ${product}
Qty: ${qty}`;

let url = "https://wa.me/919508810630?text=" + encodeURIComponent(message);

window.open(url,"_blank");

}

function pay(){
alert("Pay via UPI: 9508810630@kotakbank");
}
