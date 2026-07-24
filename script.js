//login

function login(e){
    e.preventDefault();
    window.location.href = "lobby.html";
}

//lobby

// 1. DATA DINAMIS BENCANA
const disasterData = {
    1: {
        title: "Banjir Bandang Demak",
        desc: "Ribuan rumah warga di Demak terendam banjir bandang akibat jebolnya tanggul sungai. Warga membutuhkan bantuan logistik, pakaian layak pakai, dan air bersih segera.",
        img: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80",
        collected: "Rp 75.200.000",
        target: "Rp 100.000.000",
        progress: "75%"
    },
    2: {
        title: "Gempa Bumi Cianjur",
        desc: "Dukungan pemulihan pasca gempa bumi di Cianjur. Fokus pada pembangunan Hunian Sementara (HUNTARA) dan fasilitas air bersih untuk pengungsi.",
        img: "https://images.unsplash.com/photo-1464234470469-c12140899cc3?auto=format&fit=crop&w=800&q=80",
        collected: "Rp 120.000.000",
        target: "Rp 500.000.000",
        progress: "24%"
    },
    3: {
        title: "Erupsi Gunung Marapi",
        desc: "Bantuan masker medis, makanan siap saji, dan obat-obatan untuk warga yang terdampak abu vulkanik tebal di wilayah kaki Gunung Marapi.",
        img: "https://images.unsplash.com/photo-1579003593419-98f949b9398f?auto=format&fit=crop&w=800&q=80",
        collected: "Rp 45.000.000",
        target: "Rp 50.000.000",
        progress: "90%"
    }
};

// 2. RENDER LOBBY CARDS SAAT HALAMAN DIMUAT
const renderLobby = () => {
    const grid = document.getElementById('disasterGrid');
    if(!grid) return;
    
    grid.innerHTML = '';
    Object.keys(disasterData).forEach(id => {
        const item = disasterData[id];
        grid.innerHTML += `
            <div class="disaster-card bg-white rounded-[2rem] border border-slate-100 p-4 shadow-sm transition-all duration-300 group cursor-pointer" onclick="showDetail(${id})">
                <div class="h-52 rounded-2xl overflow-hidden mb-6">
                    <img src="${item.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                </div>
                <div class="px-2">
                    <h3 class="text-xl font-bold text-slate-900 mb-2 truncate">${item.title}</h3>
                    <p class="text-slate-500 text-sm mb-6 line-clamp-2">${item.desc}</p>
                    <div class="mb-6">
                        <div class="flex justify-between text-xs font-bold mb-2">
                            <span class="text-emerald-600">${item.progress} Terkumpul</span>
                            <span class="text-slate-400">Target: ${item.target}</span>
                        </div>
                        <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div class="bg-emerald-500 h-full rounded-full" style="width: ${item.progress}"></div>
                        </div>
                    </div>
                    <button class="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-colors">Lihat Detail</button>
                </div>
            </div>
        `;
    });
};

// 3. FUNGSI NAVIGASI SPA (SINGLE PAGE APPLICATION)
window.showDetail = (id) => {
    loadDetailData(id);
    const lobby = document.getElementById('lobbyPage');
    const detail = document.getElementById('detailPage');

    lobby.classList.add('hidden-page');
    setTimeout(() => {
        lobby.style.display = 'none';
        detail.style.display = 'block';
        setTimeout(() => {
            detail.classList.remove('hidden-page');
            window.scrollTo(0,0);
        }, 50);
    }, 400);
};

window.backToLobby = () => {
    const lobby = document.getElementById('lobbyPage');
    const detail = document.getElementById('detailPage');

    detail.classList.add('hidden-page');
    setTimeout(() => {
        detail.style.display = 'none';
        lobby.style.display = 'block';
        setTimeout(() => {
            lobby.classList.remove('hidden-page');
            window.scrollTo(0,0);
        }, 50);
    }, 400);
};

const loadDetailData = (id) => {
    const data = disasterData[id];
    document.getElementById('detImg').src = data.img;
    document.getElementById('detTitle').innerText = data.title;
    document.getElementById('detDesc').innerText = data.desc;
    document.getElementById('detCollected').innerText = data.collected;
    document.getElementById('detTarget').innerText = `Target: ${data.target}`;
    document.getElementById('detProgress').style.width = data.progress;
};

// 4. LOGIKA SIDEBAR SETTINGS
const settingsBtn = document.getElementById('settingsBtn');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarContent = document.getElementById('sidebarContent');
const closeSidebar = document.getElementById('closeSidebar');

if (settingsBtn) {
    settingsBtn.onclick = () => {
        sidebarOverlay.classList.remove('hidden');
        setTimeout(() => {
            sidebarOverlay.classList.add('opacity-100');
            sidebarContent.classList.remove('translate-x-full');
        }, 10);
    };
}

const hideSidebar = () => {
    sidebarOverlay.classList.remove('opacity-100');
    sidebarContent.classList.add('translate-x-full');
    setTimeout(() => sidebarOverlay.classList.add('hidden'), 400);
};

if (closeSidebar) closeSidebar.onclick = hideSidebar;
if (sidebarOverlay) {
    sidebarOverlay.onclick = (e) => { 
        if(e.target === sidebarOverlay) hideSidebar(); 
    };
}

// Jalankan fungsi render saat file dimuat
renderLobby();

//payment

// ambil data dari halaman detail
window.onload = function(){
    const data = JSON.parse(localStorage.getItem("donasi_bencana"));

    if(data){
        document.getElementById("payImg").src = data.image;
        document.getElementById("payTitle").innerText = data.title;
    }
}

// validasi form
function pay(e){
    e.preventDefault();

    const nominal = document.getElementById("nominal").value.trim();
    const nama = document.getElementById("nama").value.trim();
    const rekening = document.getElementById("rekening").value.trim();

    if(nominal === "" || nama === "" || rekening === ""){
        showError();
    } else {
        showSuccess();
    }
}

// tampilkan gagal
function showError(){
    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("error").classList.remove("hidden");
    document.getElementById("success").classList.add("hidden");
}

// tampilkan berhasil
function showSuccess(){
    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("success").classList.remove("hidden");
    document.getElementById("error").classList.add("hidden");
}

function closeModal(){
    document.getElementById("modal").classList.add("hidden");
}

// kembali ke lobby
function backLobby(){
    window.location.href = "index.html";
}

// kembali ke detail
function backDetail(){
    window.location.href = "index.html#detailPage";
}
