// Toggle navbar on mobile
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("show");
    }
  });
}

// Set current year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Product detail modal
const modal = document.getElementById("product-modal");
const modalTitle = document.getElementById("product-modal-title");
const modalDescription = document.getElementById("product-modal-description");
const modalImage = document.getElementById("product-modal-image");
const modalPrice = document.getElementById("product-modal-price");

function openProductModal(title, description, imageSrc, price) {
  if (!modal || !modalTitle || !modalDescription || !modalImage || !modalPrice) return;
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  modalImage.src = imageSrc;
  modalPrice.textContent = "Rp " + price;
  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  document.body.style.overflow = "";
}

// Handle click on all "Detail" buttons
document.addEventListener("click", (event) => {
  const detailBtn = event.target.closest(".btn-detail");
  if (detailBtn) {
    const card = detailBtn.closest(".card");
    if (!card) return;
    const titleEl = card.querySelector("h3");
    const descEl = card.querySelector(".card-desc");
    const title = titleEl ? titleEl.textContent.trim() : "";
    const description = descEl ? descEl.textContent.trim() : "";
    const imageSrc = card.getAttribute("data-product-img") || "";
    const price = card.getAttribute("data-product-price") || "";
    openProductModal(title, description, imageSrc, price);
  }

  if (event.target.matches("[data-modal-close]") || event.target.classList.contains("product-modal-backdrop")) {
    closeProductModal();
  }
});

// Close modal on Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && modal.classList.contains("is-open")) {
    closeProductModal();
  }
});

// Notification Toast
const notificationToast = document.getElementById("notification-toast");
let notificationTimeout;

function showNotification(title = "Pesan Terkirim!", message = "Terima kasih telah menghubungi kami. Kami akan merespon segera.") {
  if (!notificationToast) return;
  
  // Update notification content
  const notifTitle = notificationToast.querySelector(".notification-title");
  const notifMessage = notificationToast.querySelector(".notification-message");
  if (notifTitle) notifTitle.textContent = title;
  if (notifMessage) notifMessage.textContent = message;
  
  // Show notification
  notificationToast.classList.add("show");
  
  // Clear existing timeout
  clearTimeout(notificationTimeout);
  
  // Auto hide after 5 seconds
  notificationTimeout = setTimeout(() => {
    hideNotification();
  }, 5000);
}

function hideNotification() {
  if (!notificationToast) return;
  notificationToast.classList.remove("show");
}

// Handle notification close button
const notificationClose = document.querySelector(".notification-close");
if (notificationClose) {
  notificationClose.addEventListener("click", hideNotification);
}

// Form submission handler
const kontakForm = document.querySelector(".kontak-form");
if (kontakForm) {
  kontakForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Get form values
    const nama = kontakForm.querySelector("#nama").value;
    const email = kontakForm.querySelector("#email").value;
    const pesan = kontakForm.querySelector("#pesan").value;
    
    // Validate form
    if (!nama || !email || !pesan) {
      showNotification("Oops!", "Mohon isi semua field yang diperlukan.");
      return;
    }
    
    // Show success notification
    showNotification(
      "Pesan Terkirim! 🎉",
      `Halo ${nama}, terima kasih telah menghubungi kami. Kami akan merespon email Anda segera di ${email}.`
    );
    
    // Reset form
    kontakForm.reset();
    
    // You can add actual form submission logic here if needed
    // For demo purposes, we just show the notification
  });
}
