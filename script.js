// Mendapatkan elemen-elemen yang dibutuhkan
const openPopupBtn = document.getElementById("openPopupBtn");
const closePopupBtn = document.getElementById("closePopupBtn");
const popup = document.getElementById("myPopup");

// Fungsi untuk menampilkan popup
function showPopup() {
    popup.style.display = "block"; // Ubah display menjadi block untuk menampilkannya
}

// Fungsi untuk menyembunyikan popup
function hidePopup() {
    popup.style.display = "none"; // Ubah display menjadi none untuk menyembunyikannya
}

// Menambahkan event listener ke tombol "Buka Popup"
openPopupBtn.addEventListener("click", showPopup);

// Menambahkan event listener ke tombol "Tutup"
closePopupBtn.addEventListener("click", hidePopup);

// Anda juga bisa menyembunyikan popup jika pengguna mengklik di luar konten popup
window.addEventListener("click", function(event) {
    if (event.target === popup) { // Jika target klik adalah area popup itu sendiri
        hidePopup();
    }
});