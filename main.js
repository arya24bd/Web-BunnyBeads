document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Navbar Scroll & Mobile Menu
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Efek Navbar saat scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Toggle Menu Mobile
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

  // 2. Product Modal (Pop-up Detail)
  const modal = document.getElementById('product-modal');
  const modalImg = document.getElementById('product-modal-image');
  const modalTitle = document.getElementById('product-modal-title');
  const modalPrice = document.getElementById('product-modal-price');
  const modalDesc = document.getElementById('product-modal-description');
  const closeModalBtns = document.querySelectorAll('[data-modal-close]');

  document.addEventListener('click', (e) => {
    // Cek tombol detail
    const btn = e.target.closest('.btn-detail');
    if (!btn) return;

    const card = btn.closest('.card');
    const imgSrc = card.dataset.productImg;
    const price = card.dataset.productPrice;
    const title = card.querySelector('h3').innerText;
    const desc = card.querySelector('.card-desc') ? card.querySelector('.card-desc').innerText : "Deskripsi produk...";

    // Isi konten modal
    modalImg.src = imgSrc;
    modalTitle.innerText = title;
    modalPrice.innerText = `Rp ${price}`;
    modalDesc.innerText = desc;

    // Buka modal
    modal.classList.add('is-open');
  });

  // Tutup Modal
  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('is-open');
    });
  });

  // Tutup jika klik background
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('is-open');
  });

  // 3. Form Submission (Simulasi)
  const form = document.querySelector('.kontak-form');
  const toast = document.getElementById('notification-toast');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.reset();
      
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
      }
    });
  }

  // 4. Update Tahun Copyright
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.innerText = new Date().getFullYear();

});