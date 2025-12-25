document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. Mobile Menu (Hamburger) ---
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });

    // Tutup menu saat link diklik
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
      });
    });
  }

  // --- 2. Product Detail Modal (Popup) ---
  const modal = document.getElementById('product-modal');
  const modalImage = document.getElementById('product-modal-image');
  const modalTitle = document.getElementById('product-modal-title');
  const modalPrice = document.getElementById('product-modal-price');
  const modalDesc = document.getElementById('product-modal-description');
  const closeButtons = document.querySelectorAll('[data-modal-close]');

  // Tangkap klik pada semua tombol "Detail"
  document.addEventListener('click', (e) => {
    // Cek jika yang diklik adalah tombol detail
    const btn = e.target.closest('.btn-detail');
    if (!btn) return;

    const card = btn.closest('.card');
    if (!card) return;

    // Ambil data produk
    const imgSrc = card.getAttribute('data-product-img');
    const price = card.getAttribute('data-product-price');
    const title = card.querySelector('h3').innerText;
    const descElement = card.querySelector('.card-desc');
    const description = descElement ? descElement.innerText : "Deskripsi belum tersedia.";

    // Isi Modal
    modalImage.src = imgSrc;
    modalTitle.innerText = title;
    modalPrice.innerText = 'Rp ' + price;
    modalDesc.innerText = description;

    // Tampilkan Modal
    modal.classList.add('is-open');
  });

  // Tutup Modal
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('is-open');
    });
  });

  // Tutup jika klik di luar kotak (background gelap)
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('is-open');
    }
  });

  // --- 3. Form Kontak & Notifikasi ---
  const contactForm = document.querySelector('.kontak-form');
  const toast = document.getElementById('notification-toast');
  const toastClose = document.querySelector('.notification-close');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Mencegah reload halaman
      
      const nama = document.getElementById('nama').value;
      
      // Reset form
      contactForm.reset();

      // Tampilkan Notifikasi
      if (toast) {
        const msg = toast.querySelector('.notification-message');
        if(msg) msg.innerText = `Halo ${nama}, pesanmu sudah terkirim!`;
        
        toast.classList.add('show');
        
        // Hilang otomatis setelah 4 detik
        setTimeout(() => {
          toast.classList.remove('show');
        }, 4000);
      }
    });
  }

  if (toastClose) {
    toastClose.addEventListener('click', () => {
      toast.classList.remove('show');
    });
  }

  // --- 4. Tahun Otomatis di Footer ---
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
  }

  // --- 5. Fix Gambar Sosmed (Cache Busting) ---
  // Trik agar gambar di dalam lingkaran putih footer selalu fresh dan pas
  const socialImages = document.querySelectorAll('.social-icon img');
  socialImages.forEach(img => {
    const src = img.getAttribute('src');
    if(src) {
      img.src = src + '?t=' + new Date().getTime();
    }
  });

});