let cart = { can20: 0, b1l: 0, b500: 0 };
let prices = { can20: 100, b1l: 12, b500: 8 };

function changeQty(item, delta) {
    cart[item] = Math.max(0, cart[item] + delta);
    document.getElementById(item + '-qty').innerText = cart[item];
    updateTotal();
}

function updateTotal() {
    let total = (cart.can20 * prices.can20) + (cart.b1l * prices.b1l) + (cart.b500 * prices.b500);
    document.getElementById('total-amt').innerText = '₹' + total;
    
    let bar = document.getElementById('checkout-bar');
    if (total > 0) {
        bar.classList.remove('hide');
    } else {
        bar.classList.add('hide');
    }
}

function sendToWhatsApp() {
    let phoneNumber = "919508810630";
    let message = "⭐ *KANWAA PREMIUM ORDER* ⭐\n\n";
    let hasItems = false;

    if(cart.can20 > 0) { message += `🏢 *20L Premium Jar:* ${cart.can20} units\n`; hasItems = true; }
    if(cart.b1l > 0) { message += `💎 *1L Classic Bottle:* ${cart.b1l} units\n`; hasItems = true; }
    if(cart.b500 > 0) { message += `💧 *500ml Compact:* ${cart.b500} units\n`; hasItems = true; }

    let total = document.getElementById('total-amt').innerText;
    message += `\n*TOTAL ESTIMATE:* ${total}\n\n_Please confirm the delivery address._`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}
