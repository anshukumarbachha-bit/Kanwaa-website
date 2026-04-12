// 1. Navigation & Animations
document.addEventListener('DOMContentLoaded', () => {
    // Reveal Elements on Scroll (Luxury Feel)
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        for (let i = 0; i < reveals.length; i++) {
            let windowHeight = window.innerHeight;
            let elementTop = reveals[i].getBoundingClientRect().top;
            let elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
                reveals[i].style.opacity = "1";
                reveals[i].style.transform = "translateY(0)";
            }
        }
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Initial check
});

// 2. Order Processing Logic (Stealth Mode)
function processOrder() {
    // Fetching Values from Form
    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const product = document.getElementById('prodSelect').value;
    const qty = document.getElementById('qty').value;

    // Validation
    if (!name || !phone || !qty) {
        alert("Please provide complete details for professional verification.");
        return;
    }

    // Business Rules: 50 Box Minimum (except for 20L Can)
    if (product !== '20L' && qty < 50) {
        alert("Policy Notice: Bulk orders for " + product + " start from a minimum of 50 boxes.");
        return;
    }

    // Stealth WhatsApp Bridge (User sees a 'Processing' alert, then redirected)
    alert("Securing connection to KANWAA Logistics Hub...");

    let message = `🚀 *OFFICIAL KANWAA DIGITAL ORDER* 🚀\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `👤 *Client:* ${name}\n`;
    message += `📞 *Contact:* ${phone}\n`;
    message += `📦 *Product:* ${product}\n`;
    message += `🔢 *Quantity:* ${qty}\n`;
    message += `📍 *Source:* Website Terminal\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `_This is a system-generated priority request._`;

    // WhatsApp API (919508810630)
    const waURL = `https://api.whatsapp.com/send?phone=919508810630&text=${encodeURIComponent(message)}`;
    
    // Smooth redirect
    setTimeout(() => {
        window.open(waURL, '_blank');
    }, 500);
}

// 3. Smooth Transitions between pages
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.hostname === window.location.hostname) {
            // Optional: Add a fade-out animation here if you want to be extra fancy
            console.log("Navigating to: " + this.href);
        }
    });
});
