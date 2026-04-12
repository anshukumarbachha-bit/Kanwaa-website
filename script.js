// Prices define karein
let prices = {
    can20: 100,
    b1l: 12,
    b500: 8
};

// Cart count maintain karein
let cart = {
    can20: 0,
    b1l: 0,
    b500: 0
};

// Quantity change karne ka function
function changeQty(item, delta) {
    cart[item] = Math.max(0, cart[item] + delta);
    
    // UI update karein
    let qtyElement = document.getElementById(item + '-qty');
    if (qtyElement) {
        qtyElement.innerText = cart[item];
    }
    
    updateTotal();
}

// Total calculate aur Checkout Bar show/hide karne ke liye
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

// WhatsApp par professional message bhejna
function sendToWhatsApp() {
    let phoneNumber = "919508810630";
    let message = "⭐ *KANWAA PREMIUM WATER ORDER* ⭐\n";
    message += "--------------------------------------\n\n";
    
    let hasItems = false;

    if(cart.can20 > 0) {
        message += `🏢 *20L Premium Jar:* ${cart.can20} Units\n`;
        hasItems = true;
    }
    if(cart.b1l > 0) {
        message += `💎 *1L Classic Bottle:* ${cart.b1l} Units\n`;
        hasItems = true;
    }
    if(cart.b500 > 0) {
        message += `💧 *500ml Compact Pack:* ${cart.b500} Units\n`;
        hasItems = true;
    }

    let total = document.getElementById('total-amt').innerText;
    message += `\n--------------------------------------\n`;
    message += `💰 *TOTAL ESTIMATED AMOUNT: ${total}*\n\n`;
    message += "Kripya delivery location aur samay confirm karein. ✅";

    if(!hasItems) {
        alert("Kripya order ke liye koi item select karein!");
        return;
    }

    // Link generate karke nayi window mein open karein
    let whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}
const serviceAreas = ["853204", "812001", "812002", "854301"]; // Example ZIP codes

function checkPincode() {
    const input = document.getElementById('pincodeInput').value.trim();
    const result = document.getElementById('pincodeResult');
    
    if (input.length !== 6 || isNaN(input)) {
        result.innerText = "Please enter a valid 6-digit pincode.";
        result.style.color = "#E74C3C";
        return;
    }

    if (serviceAreas.includes(input)) {
        result.innerHTML = `<i class="fas fa-check-circle"></i> Service is available in your area!`;
        result.style.color = "#27AE60";
    } else {
        result.innerHTML = `<i class="fas fa-times-circle"></i> Currently, we do not deliver to this area.`;
        result.style.color = "#E74C3C";
    }
}
