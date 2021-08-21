"use strict";

const closeButton = document.querySelector(".modal-close");
const overlay = document.querySelector(".overlay");
const clicabkleOverlay = document.querySelector(".clickable-overlay");
const modal = document.querySelector(".modal");
const nextButton = document.querySelector(".modal-next");
const prevButton = document.querySelector(".modal-prev");
let isModal = false;
let currentVol = 0;

function reverseTableRows(tableClass) {
  let table = document.querySelector(tableClass);
  let newTbody = document.createElement("tbody");
  let oldTbody = table.tBodies[0];
  let rows = oldTbody.rows;
  let i = rows.length - 1;

  while (i >= 0) {
    newTbody.appendChild(rows[i]);
    i -= 1;
  }
  oldTbody.parentNode.replaceChild(newTbody, oldTbody);
}

reverseTableRows(".vols");
const vols = document.querySelectorAll(".vol");
const titles = document.querySelectorAll(".vol-title");

function changeVolume() {
  document.querySelector(".modal-content").src = vols[currentVol].src;
  document.querySelector(".modal-caption").textContent =
    titles[currentVol].textContent;
  document.querySelector(".modal-current").textContent = `${currentVol + 1} / ${
    vols.length
  }`;
  nextButton.style.opacity = 1;
  nextButton.style.pointer = "cursor";
  prevButton.style.opacity = 1;
  prevButton.style.pointer = "cursor";

  if (currentVol == vols.length - 1) {
    nextButton.style.opacity = 0;
    nextButton.style.pointer = "auto";
  }

  if (currentVol == 0) {
    prevButton.style.opacity = 0;
    prevButton.style.pointer = "auto";
  }
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

nextButton.addEventListener("click", function () {
  currentVol = currentVol < vols.length - 1 ? currentVol + 1 : currentVol;
  changeVolume();
});

prevButton.addEventListener("click", function () {
  currentVol = currentVol > 0 ? currentVol - 1 : currentVol;
  changeVolume();
});
