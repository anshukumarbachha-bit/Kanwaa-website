// 1. Serviceable Pincodes
const serviceAreas = [
    "812001", "812002", "812003", "812004", "812005", "812006", "812007", 
    "813210", "813201", "813204", "813209", "853204", "853201",
    "854301", "854302", "854303", "854304", "854202", "854315", "854326", 
    "854328", "854330", "854337",
    "851204", "851205", "851214", "851215", "851217", "848203", "851202"
]; 

// 2. Updated Pricing (Box Wise)
const prices = { 
    can20: 100, // Per Unit
    b1l: 120,   // Per Box (Min 50)
    b500: 90    // Per Box (Min 50)
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

// 4. Quantity Change Logic
function changeQty(item, delta) {
    // Retail Packs (1L aur 500ml) ke liye 50 ka minimum limit handle karna
    if (item === 'b1l' || item === 'b500') {
        if (cart[item] === 0 && delta > 0) {
            cart[item] = 50; // Pehli baar click karne par seedha 50 boxes
        } else if (cart[item] === 50 && delta < 0) {
            cart[item] = 0; // 50 se niche jane par seedha 0
        } else {
            cart[item] = Math.max(0, cart[item] + delta);
        }
    } else {
        // 20L Jar ke liye normal increment
        cart[item] = Math.max(0, cart[item] + delta);
    }
    
    syncUI(item);
}

function syncUI(item) {
    const qtyElement = document.getElementById(item + '-qty');
    if (qtyElement) {
        qtyElement.innerText = cart[item];
    }
    updateTotal();
}

// 5. Total Calculation
function updateTotal() {
    let total = (cart.can20 * prices.can20) + (cart.b1l * prices.b1l) + (cart.b500 * prices.b500);
    
    const totalElement = document.getElementById('total-amt');
    if(totalElement) {
        totalElement.innerText = '₹' + total.toLocaleString('en-IN'); // Format number
    }
    
    const bar = document.getElementById('checkout-bar');
    if(bar) {
        total > 0 ? bar.classList.remove('hide') : bar.classList.add('hide');
    }
}

// 6. WhatsApp Order with Box Details
function sendToWhatsApp() {
    let phoneNumber = "919508810630";
    let message = "⭐ *KANWAA PREMIUM WATER ORDER* ⭐\n\n";

    // Double check minimum 50 boxes validation
    if((cart.b1l > 0 && cart.b1l < 50) || (cart.b500 > 0 && cart.b500 < 50)) {
        alert("Retail Packs (1L/500ml) require a minimum of 50 Boxes.");
        return;
    }

    let hasItems = false;
    if(cart.can20 > 0) { 
        message += `🔹 *20L Jar:* ${cart.can20} Units\n`; 
        hasItems = true; 
    }
    if(cart.b1l > 0) { 
        message += `🔹 *1L Classic Box:* ${cart.b1l} Boxes\n`; 
        hasItems = true; 
    }
    if(cart.b500 > 0) { 
        message += `🔹 *500ml Compact Box:* ${cart.b500} Boxes\n`; 
        hasItems = true; 
    }

    if(!hasItems) {
        alert("Please add items to your cart first!");
        return;
    }

    let total = document.getElementById('total-amt').innerText;
    message += `\n💰 *Estimated Total: ${total}*\n`;
    message += "--------------------------------------\n";
    message += "Please confirm availability and delivery time. ✅";

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

// 7. Scroll Animation
const revealOnScroll = () => {
    const reveals = document.querySelectorAll('.reveal, .feature-item, .retail-card');
    reveals.forEach(el => {
        let windowHeight = window.innerHeight;
        let elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 50) el.classList.add("active");
    });
};

window.addEventListener("scroll", revealOnScroll);
document.addEventListener("DOMContentLoaded", revealOnScroll);
