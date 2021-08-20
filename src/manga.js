"use strict";

const vols = document.querySelectorAll(".vol");
const closeButton = document.querySelector(".modal-close");
const overlay = document.querySelector(".overlay");
const clicabkleOverlay = document.querySelector(".clickable-overlay");
const modal = document.querySelector(".modal");
const titles = document.querySelectorAll(".vol-title");
let isModal = false;

function closeModal() {
  isModal = false;
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
  closeButton.classList.add("hidden");
}

for (let i = 0; i < vols.length; i++) {
  vols[i].addEventListener("click", function () {
    isModal = true;
    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");
    closeButton.classList.remove("hidden");
    document.querySelector(".modal-content").src = vols[i].src;
    document.querySelector(".modal-caption").textContent =
      titles[i].textContent;
  });
}

closeButton.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (k) {
  if (k.key == "Escape" && isModal) {
    closeModal();
  }
});
