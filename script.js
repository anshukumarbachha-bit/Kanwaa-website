let prices = { can20: 100, b1l: 12, b500: 8 };
let cart = { can20: 0, b1l: 0, b500: 0 };

function changeQty(item, delta) {
    cart[item] = Math.max(0, cart[item] + delta);
    document.getElementById(item + '-qty').innerText = cart[item];
    updateTotal();
}

function updateTotal() {
    let total = (cart.can20 * prices.can20) + (cart.b1l * prices.b1l) + (cart.b500 * prices.b500);
    document.getElementById('total-amt').innerText = '₹' + total;
}

function sendToWhatsApp() {
    let phoneNumber = "919508810630";
    let message = "💧 *KANWAA - NAYA ORDER* 💧\n\n";
    let hasItems = false;

    if(cart.can20 > 0) { message += `🔹 20L Can: ${cart.can20} units\n`; hasItems = true; }
    if(cart.b1l > 0) { message += `🔹 1L Bottle: ${cart.b1l} units\n`; hasItems = true; }
    if(cart.b500 > 0) { message += `🔹 500ml Bottle: ${cart.b500} units\n`; hasItems = true; }

    if(!hasItems) {
        alert("Pehle koi product select karein!");
        return;
    }

    let total = document.getElementById('total-amt').innerText;
    message += `\n💰 *Total Amount: ${total}*\n\nKripya confirmation dein!`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}
