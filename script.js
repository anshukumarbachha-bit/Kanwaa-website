const serviceAreas = ["812001", "812002", "853201", "853204", "854301", "851204", "813201"]; 

const prices = { 
    can20: 100, 
    b1l: 120,   
    b500: 90    
};

let cart = { can20: 0, b1l: 0, b500: 0 };

// Pincode Logic
function checkPincode() {
    const input = document.getElementById('pincodeInput').value.trim();
    const result = document.getElementById('pincodeResult');
    if (serviceAreas.includes(input)) {
        result.innerHTML = `<i class="fas fa-check-circle"></i> Priority Delivery Available in ${input}!`;
        result.style.color = "#10b981";
    } else {
        result.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Outside standard zone. Contact support.`;
        result.style.color = "#f43f5e";
    }
}

// Quantity Logic (Strict 50 Box rule for Retail)
function changeQty(item, delta) {
    if (item === 'b1l' || item === 'b500') {
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

// Modal System (Professional Lead Generation)
function openModal() {
    document.getElementById('loginModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function finalCheckout() {
    const name = document.getElementById('userName').value;
    const phone = document.getElementById('userPhone').value;
    const addr = document.getElementById('userAddress').value;

    if(!name || !phone || !addr) {
        alert("Please provide all details for a smooth delivery.");
        return;
    }

    let msg = `⭐ *NEW PREMIUM ORDER FROM KANWAA WEBSITE* ⭐\n\n`;
    msg += `👤 *Client:* ${name}\n`;
    msg += `📞 *Phone:* ${phone}\n`;
    msg += `📍 *Address:* ${addr}\n\n`;
    msg += `--- *Order Details* ---\n`;
    
    if(cart.can20 > 0) msg += `🔹 20L Premium Jar: ${cart.can20} Units\n`;
    if(cart.b1l > 0) msg += `🔹 1L Classic Box: ${cart.b1l} Boxes\n`;
    if(cart.b500 > 0) msg += `🔹 500ml Compact Box: ${cart.b500} Boxes\n`;
    
    msg += `\n💰 *Total Amount: ${document.getElementById('total-amt').innerText}*`;
    msg += `\n\n_Please confirm the order dispatch time._`;

    window.open(`https://wa.me/919508810630?text=${encodeURIComponent(msg)}`, '_blank');
    closeModal();
}
