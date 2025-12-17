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

function openProductModal(title, description) {
  if (!modal || !modalTitle || !modalDescription) return;
  modalTitle.textContent = title;
  modalDescription.textContent = description;
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
    openProductModal(title, description);
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
