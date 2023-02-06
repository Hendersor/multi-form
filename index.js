const nxtButton = document.querySelector(
  ".main-container .main-container__buttons .main-container__buttons-next"
);

nxtButton.addEventListener("click", showNextContainer);

function showNextContainer() {
  const mainContainer = document
    .querySelector(".main-container")
    .querySelectorAll("section");

  let actualContainer;
  let sibling;
  mainContainer.forEach((container) => {
    if (!container.classList.contains("visible")) {
      actualContainer = container;
      sibling = actualContainer.nextElementSibling;
    }
  });
  actualContainer.classList.add("visible");
  sibling.classList.remove("visible");
}
