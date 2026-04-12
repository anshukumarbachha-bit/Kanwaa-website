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
// 1. Serviceable Pincodes for Bhagalpur, Purnea, and Khagaria
const serviceAreas = [
    // Bhagalpur Districts
    "812001", "812002", "812003", "812004", "812005", "812006", "812007", 
    "813210", "813201", "813204", "813209", "853204", "853201",
    
    // Purnea Districts
    "854301", "854302", "854303", "854304", "854202", "854315", "854326", 
    "854328", "854330", "854337",
    
    // Khagaria Districts
    "851204", "851205", "851214", "851215", "851217", "848203", "851202"
]; 

// 2. Check Pincode Functionality
function checkPincode() {
    const input = document.getElementById('pincodeInput').value.trim();
    const result = document.getElementById('pincodeResult');
    
    // Validation: 6 digits check
    if (input.length !== 6 || isNaN(input)) {
        result.innerText = "Please enter a valid 6-digit pincode.";
        result.style.color = "#E74C3C";
        return;
    }

    // Logic to check if pincode exists in our list
    if (serviceAreas.includes(input)) {
        result.innerHTML = `<i class="fas fa-check-circle"></i> Excellent! We deliver to ${input}.`;
        result.style.color = "#27AE60";
    } else {
        result.innerHTML = `<i class="fas fa-times-circle"></i> Sorry, we haven't reached ${input} yet.`;
        result.style.color = "#E74C3C";
    }
}

// 3. Smooth Scroll Reveal Animation for Content
const revealOnScroll = () => {
    const reveals = document.querySelectorAll('.about-text, .trust-column, .feature-item, .retail-card');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
};

// 4. Quantity & Total Amount Logic (For Order System)
let prices = { can20: 100, b1l: 12, b500: 8 };
let cart = { can20: 0, b1l: 0, b500: 0 };

function changeQty(item, delta) {
    cart[item] = Math.max(0, cart[item] + delta);
    let qtyElement = document.getElementById(item + '-qty');
    if (qtyElement) qtyElement.innerText = cart[item];
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

// 5. WhatsApp Order Generation
function sendToWhatsApp() {
    let phoneNumber = "919508810630";
    let message = "⭐ *KANWAA PREMIUM WATER ORDER* ⭐\n\n";
    
    if(cart.can20 > 0) message += `🔹 20L Premium Jar: ${cart.can20}\n`;
    if(cart.b1l > 0) message += `🔹 1L Classic Bottle: ${cart.b1l}\n`;
    if(cart.b500 > 0) message += `🔹 500ml Compact: ${cart.b500}\n`;

    let total = document.getElementById('total-amt').innerText;
    message += `\n💰 *Total Amount: ${total}*\n`;
    message += "\nPlease confirm my delivery.";

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

// Initialize on Load
window.addEventListener("scroll", revealOnScroll);
document.addEventListener("DOMContentLoaded", revealOnScroll);
