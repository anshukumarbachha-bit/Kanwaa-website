// Scroll Reveal System
window.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        if(el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add('active');
    });
});

// Initial Reveal
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
});

// Ordering System
let activeItem = "";
function openTerminal(item) {
    activeItem = item;
    document.getElementById('orderTerminal').style.display = 'block';
    document.getElementById('orderTitle').innerText = "System Order: " + item;
    window.scrollTo(0, document.body.scrollHeight);
}

function executeOrder() {
    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const addr = document.getElementById('custAddr').value;
    const qty = document.getElementById('custQty').value;

    if(!name || !phone || !addr || !qty) { alert("Incomplete Data."); return; }
    if(qty < 50 && !activeItem.includes("20L")) { alert("Minimum bulk order is 50 boxes."); return; }

    const message = `🌟NEW PREMIUM ORDER🌟\nItem: ${activeItem}\nName: ${name}\nContact: ${phone}\nAddress: ${addr}\nQty: ${qty}`;
    
    // Background order dispatch
    window.open(`https://api.whatsapp.com/send?phone=919508810630&text=${encodeURIComponent(message)}`, '_blank');
    alert("Priority order dispatched to server.");
}
