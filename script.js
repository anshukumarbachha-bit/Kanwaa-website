const prices = { 
    can20: 100, 
    b1l: 120,   
    b500: 90,
    b2l: 230   // 2L Price Added
};

let cart = { can20: 0, b1l: 0, b500: 0, b2l: 0 };

function changeQty(item, delta) {
    if (item !== 'can20') {
        // Min 50 Boxes rule for Retail packs
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
    let total = (cart.can20 * prices.can20) + (cart.b1l * prices.b1l) + (cart.b500 * prices.b500) + (cart.b2l * prices.b2l);
    document.getElementById('total-amt').innerText = '₹' + total.toLocaleString('en-IN');
    const bar = document.getElementById('checkout-bar');
    total > 0 ? bar.classList.remove('hide') : bar.classList.add('hide');
}

function openModal() { document.getElementById('loginModal').style.display = 'flex'; }
function closeModal() { document.getElementById('loginModal').style.display = 'none'; }

function finalCheckout() {
    const name = document.getElementById('userName').value;
    const phone = document.getElementById('userPhone').value;
    const addr = document.getElementById('userAddress').value;

    if(!name || !phone || !addr) { alert("Please enter all details."); return; }

    let msg = `⚡ *NEW PREMIUM ORDER - KANWAA* ⚡\n\n`;
    msg += `👤 *Customer:* ${name}\n📞 *WhatsApp:* ${phone}\n📍 *Address:* ${addr}\n\n`;
    msg += `--- *Order List* ---\n`;
    if(cart.b2l > 0) msg += `✅ 2L Mega Box: ${cart.b2l}\n`;
    if(cart.b1l > 0) msg += `✅ 1L Classic Box: ${cart.b1l}\n`;
    if(cart.can20 > 0) msg += `✅ 20L Premium Jar: ${cart.can20}\n`;
    
    msg += `\n💰 *Total: ${document.getElementById('total-amt').innerText}*`;
    window.open(`https://wa.me/919508810630?text=${encodeURIComponent(msg)}`, '_blank');
}

// Reveal on Scroll
window.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        if(el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add('active');
    });
});
