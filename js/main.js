// Data Game
const games = [
    { id: 1, name: "Mobile Legends", img: "assets/images/mlbb.png", nominal: [54, 112, 226, 562] },
    { id: 2, name: "Free Fire", img: "assets/images/ff.png", nominal: [70, 140, 355, 1060] },
    { id: 3, name: "PUBG Mobile", img: "assets/images/pubg.png", nominal: [60, 325, 660, 1800] },
    { id: 4, name: "Genshin Impact", img: "assets/images/genshin.png", nominal: [60, 300, 980, 1960] },
    { id: 5, name: "Lifx", img: "assets/images/lifx.png", nominal: [25, 50, 100, 200] },
    { id: 6, name: "Valorant", img: "assets/images/valorant.png", nominal: [475, 1000, 2050, 5350] }
];

// Metode Pembayaran + logika uang asli (dummy gateway)
const paymentMethods = [
    { id: "qris", name: "QRIS", icon: "fas fa-qrcode", desc: "Scan pakai DANA/OVO/GoPay" },
    { id: "dana", name: "DANA", icon: "fab fa-android", desc: "E-Wallet" },
    { id: "bca", name: "Transfer BCA", icon: "fas fa-university", desc: "Virtual Account" },
    { id: "alfamart", name: "Alfamart", icon: "fas fa-store", desc: "Bayar di Indomaret/Alfamart" }
];

let selectedGame = null;
let selectedNominal = null;
let selectedPayment = null;
let userSaldo = 0; // Saldo dummy dari pembayaran sebelumnya

// Render daftar game
function renderGames() {
    const grid = document.getElementById("gameGrid");
    grid.innerHTML = games.map(game => `
        <div class="game-card" data-id="${game.id}">
            <img src="${game.img}" alt="${game.name}" onerror="this.src='assets/placeholder/game-placeholder.png'">
            <h4>${game.name}</h4>
            <p>Top Up</p>
        </div>
    `).join("");
    
    document.querySelectorAll(".game-card").forEach(card => {
        card.addEventListener("click", () => {
            const id = parseInt(card.dataset.id);
            selectedGame = games.find(g => g.id === id);
            document.getElementById("selectedGameName").innerText = selectedGame.name;
            showNominalSelection();
        });
    });
}

function showNominalSelection() {
    const nominalGrid = document.getElementById("nominalGrid");
    nominalGrid.innerHTML = selectedGame.nominal.map(nom => `
        <div class="nominal-item" data-nominal="${nom}">
            ${nom} ${selectedGame.name === "Valorant" ? "VP" : "Diamonds"}
            <br><small>Rp ${(nom * 200).toLocaleString()}</small>
        </div>
    `).join("");
    
    document.querySelectorAll(".nominal-item").forEach(item => {
        item.addEventListener("click", () => {
            document.querySelectorAll(".nominal-item").forEach(i => i.classList.remove("selected"));
            item.classList.add("selected");
            selectedNominal = parseInt(item.dataset.nominal);
            showPaymentSelection();
        });
    });
    
    document.getElementById("gameGrid").parentElement.style.display = "none";
    document.getElementById("nominalSection").style.display = "block";
    document.getElementById("paymentSection").style.display = "none";
}

function showPaymentSelection() {
    const paymentList = document.getElementById("paymentList");
    paymentList.innerHTML = paymentMethods.map(method => `
        <div class="payment-item" data-payment="${method.id}">
            <i class="${method.icon}"></i>
            <div class="payment-info">
                <div>${method.name}</div>
                <div class="payment-desc">${method.desc}</div>
            </div>
        </div>
    `).join("");
    
    document.querySelectorAll(".payment-item").forEach(pay => {
        pay.addEventListener("click", () => {
            document.querySelectorAll(".payment-item").forEach(p => p.classList.remove("selected"));
            pay.classList.add("selected");
            selectedPayment = pay.dataset.payment;
            updateOrderSummary();
        });
    });
    
    document.getElementById("nominalSection").style.display = "none";
    document.getElementById("paymentSection").style.display = "block";
}

function updateOrderSummary() {
    const total = selectedNominal * 200;
    const summaryDiv = document.getElementById("orderSummary");
    summaryDiv.innerHTML = `
        <strong>Ringkasan Pesanan</strong><br>
        Game: ${selectedGame.name}<br>
        Item: ${selectedNominal} ${selectedGame.name === "Valorant" ? "VP" : "Diamonds"}<br>
        Total: <span style="color: #e11d2c;">Rp ${total.toLocaleString()}</span><br>
        Metode: ${paymentMethods.find(p => p.id === selectedPayment)?.name || selectedPayment}
    `;
}

// Proses pembayaran UANG ASLI (simulasi gateway)
document.getElementById("payNowBtn").addEventListener("click", () => {
    if (!selectedPayment) {
        showToast("Pilih metode pembayaran dulu!");
        return;
    }
    const total = selectedNominal * 200;
    
    if (selectedPayment === "qris") {
        showQRISModal(total);
    } else {
        // Simulasi redirect ke gateway pembayaran nyata
        showToast(`Mengarahkan ke ${selectedPayment.toUpperCase()}... Pembayaran Rp ${total.toLocaleString()}`);
        setTimeout(() => {
            showToast("✅ Pembayaran Berhasil! (Demo) Saldo bertambah.");
            // Simulasi nambah saldo user setelah bayar (karena uang asli)
            userSaldo += total;
            document.getElementById("userSaldo").innerHTML = `Rp ${userSaldo.toLocaleString()}`;
            resetToGameList();
        }, 1500);
    }
});

function showQRISModal(total) {
    const modal = document.getElementById("qrisModal");
    modal.style.display = "flex";
    document.getElementById("confirmPaymentBtn").onclick = () => {
        modal.style.display = "none";
        showToast(`💰 Pembayaran QRIS Rp ${total.toLocaleString()} berhasil! Saldo ditambahkan.`);
        userSaldo += total;
        document.getElementById("userSaldo").innerHTML = `Rp ${userSaldo.toLocaleString()}`;
        resetToGameList();
    };
    document.querySelector(".modal-close").onclick = () => modal.style.display = "none";
}

function resetToGameList() {
    selectedGame = null;
    selectedNominal = null;
    selectedPayment = null;
    document.getElementById("gameGrid").parentElement.style.display = "block";
    document.getElementById("nominalSection").style.display = "none";
    document.getElementById("paymentSection").style.display = "none";
    renderGames(); // refresh
}

function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
}

// Slider Otomatis + Sentuh
function initSlider() {
    const slider = document.getElementById("sliderContainer");
    const dotsContainer = document.getElementById("sliderDots");
    const slides = document.querySelectorAll(".slide");
    let currentIndex = 0;
    let autoSlideInterval;
    
    slides.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            slider.scrollTo({ left: slider.clientWidth * i, behavior: "smooth" });
            updateActiveDot(i);
        });
        dotsContainer.appendChild(dot);
    });
    
    function updateActiveDot(index) {
        document.querySelectorAll(".dot").forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
        currentIndex = index;
    }
    
    slider.addEventListener("scroll", () => {
        const index = Math.round(slider.scrollLeft / slider.clientWidth);
        updateActiveDot(index);
    });
    
    function autoSlide() {
        let next = (currentIndex + 1) % slides.length;
        slider.scrollTo({ left: slider.clientWidth * next, behavior: "smooth" });
    }
    autoSlideInterval = setInterval(autoSlide, 4000);
    slider.addEventListener("touchstart", () => clearInterval(autoSlideInterval));
    slider.addEventListener("touchend", () => {
        autoSlideInterval = setInterval(autoSlide, 4000);
    });
}

// Inisialisasi awal
renderGames();
initSlider();
document.getElementById("backToGameBtn").addEventListener("click", resetToGameList);

// Update saldo awal user (dummy dari local storage)
if(localStorage.getItem("userSaldo")) {
    userSaldo = parseInt(localStorage.getItem("userSaldo"));
} else {
    userSaldo = 25000;
}
document.getElementById("userSaldo").innerHTML = `Rp ${userSaldo.toLocaleString()}`;
setInterval(() => localStorage.setItem("userSaldo", userSaldo), 1000);
