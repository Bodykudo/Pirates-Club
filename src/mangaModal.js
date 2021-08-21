"use strict";

const vols = document.querySelectorAll(".vol");
const closeButton = document.querySelector(".modal-close");
const overlay = document.querySelector(".overlay");
const clicabkleOverlay = document.querySelector(".clickable-overlay");
const modal = document.querySelector(".modal");
const titles = document.querySelectorAll(".vol-title");
let isModal = false;
let currentVol = 0;

function changeVolume() {
  document.querySelector(".modal-content").src = vols[currentVol].src;
  document.querySelector(".modal-caption").textContent =
    titles[currentVol].textContent;
  document.querySelector(".modal-current").textContent = `${
    currentVol + 1
  } / 99`;
}

function closeModal() {
  isModal = false;
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
  closeButton.classList.add("hidden");
}

for (let i = 0; i < vols.length; i++) {
  vols[i].addEventListener("click", function () {
    isModal = true;
    currentVol = i;
    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");
    closeButton.classList.remove("hidden");
    changeVolume();
  });
}

closeButton.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (k) {
  if (k.key == "Escape" && isModal) {
    closeModal();
  }

  if (
    (k.key == "ArrowRight" || k.key == "ArrowLeft") &&
    isModal &&
    currentVol >= 0 &&
    currentVol <= vols.length - 1
  ) {
    currentVol =
      k.key == "ArrowRight"
        ? currentVol < vols.length - 1
          ? currentVol + 1
          : currentVol
        : currentVol > 0
        ? currentVol - 1
        : currentVol;
    changeVolume();
  }
});

document.querySelector(".modal-next").addEventListener("click", function () {
  currentVol = currentVol < vols.length - 1 ? currentVol + 1 : currentVol;
  changeVolume();
});

document.querySelector(".modal-prev").addEventListener("click", function () {
  currentVol = currentVol > 0 ? currentVol - 1 : currentVol;
  changeVolume();
});
