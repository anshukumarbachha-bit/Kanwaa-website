// 1. Serviceable Pincodes (Bhagalpur, Purnea, Khagaria)
const serviceAreas = [
    "812001", "812002", "812003", "812004", "812005", "812006", "812007", 
    "813210", "813201", "813204", "813209", "853204", "853201",
    "854301", "854302", "854303", "854304", "854202", "854315", "854326", 
    "854328", "854330", "854337",
    "851204", "851205", "851214", "851215", "851217", "848203", "851202"
]; 

// 2. Updated Pricing (Box Wise for Bottles)
const prices = { 
    can20: 100, // Per Unit
    b1l: 120,   // Per Box (12 Bottles)
    b500: 90    // Per Box (24 Bottles)
};

let cart = { can20: 0, b1l: 0, b500: 0 };

// 3. Pincode Checker
function checkPincode() {
    const input = document.getElementById('pincodeInput').value.trim();
    const result = document.getElementById('pincodeResult');
    
    if (input.length !== 6 || isNaN(input)) {
        result.innerText = "Please enter a valid 6-digit pincode.";
        result.style.color = "#E74C3C";
        return;
    }

    if (serviceAreas.includes(input)) {
        result.innerHTML = `<i class="fas fa-check-circle"></i> Service Available in ${input}!`;
        result.style.color = "#27AE60";
    } else {
        result.innerHTML = `<i class="fas fa-times-circle"></i> Sorry, no delivery in ${input}.`;
        result.style.color = "#E74C3C";
    }
}

// 4. Quantity Change Logic (Buttons)
function changeQty(item, delta) {
    // If it's a box item, ensure it starts at 50 if increased from 0
    if ((item === 'b1l' || item === 'b500') && cart[item] === 0 && delta > 0) {
        cart[item] = 50;
    } else {
        cart[item] = Math.max(0, cart[item] + delta);
    }
    
    // Sync to UI
    syncUI(item);
}

// 5. Manual Input Logic (User can type numbers)
function manualEntry(item, value) {
    let num = parseInt(value) || 0;
    cart[item] = num;
    updateTotal();
}

function syncUI(item) {
    const qtyElement = document.getElementById(item + '-qty');
    if (qtyElement) {
        // If it's a span/div
        qtyElement.innerText = cart[item];
        // If you use input field instead, use: qtyElement.value = cart[item];
    }
    updateTotal();
}

// 6. Total Calculation with Minimum Constraints
function updateTotal() {
    let total = (cart.can20 * prices.can20) + (cart.b1l * prices.b1l) + (cart.b500 * prices.b500);
    document.getElementById('total-amt').innerText = '₹' + total;
    
    const bar = document.getElementById('checkout-bar');
    total > 0 ? bar.classList.remove('hide') : bar.classList.add('hide');
}

// 7. Professional WhatsApp Order
function sendToWhatsApp() {
    let phoneNumber = "919508810630";
    let message = "⭐ *KANWAA PREMIUM WATER ORDER* ⭐\n\n";
    let error = "";

    // Validation for minimum 50 boxes
    if(cart.b1l > 0 && cart.b1l < 50) error = "Minimum order for 1L Classic is 50 Boxes.";
    if(cart.b500 > 0 && cart.b500 < 50) error = "Minimum order for 500ml Compact is 50 Boxes.";

    if(error) {
        alert(error);
        return;
    }

    let hasItems = false;
    if(cart.can20 > 0) { message += `🔹 *20L Jar:* ${cart.can20} Units\n`; hasItems = true; }
    if(cart.b1l > 0) { message += `🔹 *1L Classic:* ${cart.b1l} Boxes\n`; hasItems = true; }
    if(cart.b500 > 0) { message += `🔹 *500ml Compact:* ${cart.b500} Boxes\n`; hasItems = true; }

    if(!hasItems) return alert("Please select items first!");

    let total = document.getElementById('total-amt').innerText;
    message += `\n💰 *Total Amount: ${total}*\n`;
    message += "--------------------------------------\n";
    message += "Please confirm my delivery schedule. ✅";

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

// 8. Scroll Animation
const revealOnScroll = () => {
    const reveals = document.querySelectorAll('.about-text, .trust-column, .feature-item, .retail-card');
    reveals.forEach(el => {
        let windowHeight = window.innerHeight;
        let elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) el.classList.add("active");
    });
};

window.addEventListener("scroll", revealOnScroll);
document.addEventListener("DOMContentLoaded", revealOnScroll);
