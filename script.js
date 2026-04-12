const serviceAreas = ["812001", "812002", "812003", "812004", "812005", "812006", "812007", "853204", "853201", "854301", "851204"]; 

const prices = { 
    can20: 100, 
    b1l: 120,   
    b500: 90    
};

let cart = { can20: 0, b1l: 0, b500: 0 };

function checkPincode() {
    const input = document.getElementById('pincodeInput').value.trim();
    const result = document.getElementById('pincodeResult');
    if (serviceAreas.includes(input)) {
        result.innerHTML = `<i class="fas fa-check-circle"></i> Yes! We deliver in ${input}.`;
        result.style.color = "#27AE60";
    } else {
        result.innerText = "Sorry, we haven't reached there yet.";
        result.style.color = "#E74C3C";
    }
}

function changeQty(item, delta) {
    if ((item === 'b1l' || item === 'b500')) {
        if (cart[item] === 0 && delta > 0) cart[item] = 50;
        else if (cart[item] === 50 && delta < 0) cart[item] = 0;
        else cart[item] = Math.max(0, cart[item] + delta);
    } else {
        cart[item] = Math.max(0, cart[item] + delta);
    }
    document.getElementById(`${item}-qty`).innerText = cart[item];
    updateTotal();
}

function updateTotal() {
    let total = (cart.can20 * prices.can20) + (cart.b1l * prices.b1l) + (cart.b500 * prices.b500);
    document.getElementById('total-amt').innerText = '₹' + total.toLocaleString('en-IN');
    const bar = document.getElementById('checkout-bar');
    total > 0 ? bar.classList.remove('hide') : bar.classList.add('hide');
}

function sendToWhatsApp() {
    let msg = "⭐ *NEW KANWAA ORDER* ⭐\n\n";
    if(cart.can20 > 0) msg += `🔹 20L Jar: ${cart.can20} Units\n`;
    if(cart.b1l > 0) msg += `🔹 1L Box (12pcs): ${cart.b1l} Boxes\n`;
    if(cart.b500 > 0) msg += `🔹 500ml Box (24pcs): ${cart.b500} Boxes\n`;
    
    msg += `\n💰 *Total: ${document.getElementById('total-amt').innerText}*`;
    msg += `\n📍 *Delivery Location:* Imali Chowk, Bihpur, Bhagalpur`;
    
    window.open(`https://wa.me/919508810630?text=${encodeURIComponent(msg)}`, '_blank');
}

// Simple Animation trigger
window.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        if(el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add('active');
    });
});
