function updateKartus() {
  const pesanan = document.getElementById("TabelDataPesanan");
  const menu = document.getElementById("TabelDataMenu");
  const bahan = document.getElementById("TabelDataBahan");

  // menghitung jumlah baris dalam tabel
  const pesananRows = pesanan ? pesanan.getElementsByTagName("tr").length : 0;
  const menuRows = menu ? menu.getElementsByTagName("tr").length : 0;
  const bahanRows = bahan ? bahan.getElementsByTagName("tr").length : 0;

  // update kartu
  document.getElementById("pesananmasuk").textContent = pesananRows;
  document.getElementById("menuProduk").textContent = menuRows;
  document.getElementById("statuspesanan").textContent = bahanRows;
}
document.getElementById("logout").addEventListener("click", (event) => {
  // Mencegah tindakan default (navigasi langsung)
  event.preventDefault();

  // Menampilkan pop-up SweetAlert
  Swal.fire({
    title: "Apakah kamu yakin ingin logout?",
    showDenyButton: true,
    confirmButtonText: "Iya",
    denyButtonText: `Tidak`,
  }).then((result) => {
    if (result.isConfirmed) {
      // Jika pengguna memilih "Logout"
      window.location.href = "index.html";
    } else if (result.isDenied) {
      // Jika pengguna memilih "Tidak"
      Swal.fire("Logout dibatalkan", "", "info");
    }
  });
});
// menyimpan data menu ke localStorage menggunakan class
class Menu {
  constructor(storageKey) {
    this.storageKey = storageKey;
    this.dataBahan = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    this.kategori = ["minuman", "makanan"];
  }

  // Menambahkan data ke LocalStorage
  tambahMenu(menu) {
    this.dataBahan.push(menu);
    localStorage.setItem(this.storageKey, JSON.stringify(this.dataBahan));
  }

  //Untuk mengambil semua data dari LocalStorage
  ambilMenu() {
    return this.dataBahan;
  }

  // Untuk menghapus data dari LocalStorage
  hapusMenu(index) {
    this.dataBahan.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(this.dataBahan));
    this.tampilkanDataTabel("TabelDataMenu");

    // Menampilkan pesan berhasil dihapus
    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Data berhasil dihapus!",
      showConfirmButton: false,
      timer: 2000,
    });
  }

  // Untuk menampilkan data ke tabel
  tampilkanDataTabel(tabelId) {
    const tabelDataMenu = document.getElementById(tabelId);
    tabelDataMenu.innerHTML = "";
    let no = 1;
    this.dataBahan.forEach((menu, index) => {
      let badge = "";
      if (menu.kategori === "minuman") {
        badge = `<span class="badge bg-success">Minuman</span>`;
      } else if (menu.kategori === "makanan") {
        badge = `<span class="badge bg-primary">Makanan</span>`;
      }

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${no++}</td>
        <td>${menu.nama}</td>
        <td>Rp ${menu.harga}</td>
        <td>${badge}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="menu.hapusMenu(${index})">
            <i class="fa fa-trash"></i>
          </button>
        </td>
      `;
      tabelDataMenu.appendChild(row);
    });
  }
  tampilkanDataTabelKategori(tabelId) {
    const tabelDataMenu = document.getElementById(tabelId);
    tabelDataMenu.innerHTML = "";
    let no = 1;
    this.dataBahan.forEach((menu, index) => {
      let badge = "";
      if (menu.kategori === "minuman") {
        badge = `<span class="badge bg-success">Minuman</span>`;
      } else if (menu.kategori === "makanan") {
        badge = `<span class="badge bg-primary">Makanan</span>`;
      }

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${no++}</td>
        <td>${menu.nama}</td>
        <td>Rp ${menu.harga}</td>
        <td>${badge}</td>
      `;
      tabelDataMenu.appendChild(row);
    });
  }
}
class Bahan {
  constructor(storageKey) {
    this.storageKey = storageKey;
    this.dataBahan = JSON.parse(localStorage.getItem(this.storageKey)) || [];
  }

  // Menambahkan data ke localStorage
  tambahBahan(bahan) {
    this.dataBahan.push(bahan);
    localStorage.setItem(this.storageKey, JSON.stringify(this.dataBahan));
  }

  // Mengambil semua data dari localStorage
  ambilBahan() {
    return this.dataBahan;
  }

  // Menghapus data berdasarkan indeks
  hapusBahan(index) {
    this.dataBahan.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(this.dataBahan));
    this.tampilkanDataTabel("TabelDataBahan");

    // Menampilkan pesan berhasil dihapus
    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Data berhasil dihapus!",
      showConfirmButton: false,
      timer: 2000,
    });
  }

  // Menampilkan data ke tabel
  tampilkanDataTabel(tabelId) {
    const tabelDataBahan = document.getElementById(tabelId);
    tabelDataBahan.innerHTML = "";

    this.dataBahan.forEach((bahan, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${bahan.nama}</td>
        <td>${bahan.jumlah}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="bahan.hapusBahan(${index})">
            <i class="fa fa-trash"></i>
          </button>
        </td>
      `;
      tabelDataBahan.appendChild(row);
    });
  }
  tampilkanDataTabelBahan(tabelId) {
    const tabelDataBahan = document.getElementById(tabelId);
    tabelDataBahan.innerHTML = "";

    this.dataBahan.forEach((bahan, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${bahan.nama}</td>
        <td>${bahan.jumlah}</td>
      `;
      tabelDataBahan.appendChild(row);
    });
  }
}
class Pesanan {
  constructor(storageKey) {
    this.storageKey = storageKey;
    this.dataPesanan = JSON.parse(localStorage.getItem(this.storageKey)) || [];
  }

  // Menambahkan data ke localStorage
  tambahPesanan(pesanan) {
    this.dataPesanan.push(pesanan);
    localStorage.setItem(this.storageKey, JSON.stringify(this.dataPesanan));
  }

  // Mengambil semua data dari localStorage
  ambilPesanan() {
    return this.dataPesanan;
  }

  // Menghapus data berdasarkan indeks
  hapusPesanan(index) {
    this.dataPesanan.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(this.dataPesanan));
    this.tampilkanDataTabel("TabelDataPesanan");

    // Menampilkan pesan berhasil dihapus
    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Pesanan berhasil dibatalkan!",
      showConfirmButton: false,
      timer: 2000,
    });
  }

  // Menampilkan data ke tabel
  tampilkanDataTabel(tabelId) {
    const tabelDataPesanan = document.getElementById(tabelId);
    tabelDataPesanan.innerHTML = "";

    let no = 1;
    this.dataPesanan.forEach((pesanan, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${no++}</td>
        <td>${pesanan.menu}</td>
        <td>${pesanan.quantity}</td>
        <td>${pesanan.catatan}</td></td>
        <td>${new Date().toLocaleString()}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="pesanan.hapusPesanan(${index})">
            Batal
          </button>
        </td>
      `;
      tabelDataPesanan.appendChild(row);
    });
  }
  // Menampilkan data ke tabel di pesanan masuk
  tampilkanDataTabelPesananMasuk(tabelId) {
    const tabelDataPesanan = document.getElementById(tabelId);
    tabelDataPesanan.innerHTML = "";

    let no = 1;
    this.dataPesanan.forEach((pesanan, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${no++}</td>
        <td>${pesanan.menu}</td>
        <td>${pesanan.quantity}</td>
        <td>${pesanan.catatan}</td></td>
        <td>${new Date().toLocaleString()}</td>
      `;
      tabelDataPesanan.appendChild(row);
    });
  }
}
class Pembayaran {
  constructor(storageKey) {
    this.storageKey = storageKey;
    this.dataPembayaran =
      JSON.parse(localStorage.getItem(this.storageKey)) || [];
  }
  saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.dataPembayaran));
  }
  tambahPesanan(pesanan) {
    this.dataPembayaran.push(pesanan);
    this.saveToLocalStorage();
  }
  tampilDataPesanan() {
    return this.dataPembayaran;
  }
  hapusSemuaPesanan() {
    this.dataPembayaran = [];
    this.saveToLocalStorage();
  }
}

// Object pesanan
const pesanan = new Pesanan("dataPesanan");

// Object menu
const menu = new Menu("dataMenu");

// Object bahan
const bahan = new Bahan("dataBahan");

// Object pesanankasir
const pembayaran = new Pembayaran("dataPembayaran");
