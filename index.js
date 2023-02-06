const nxtButton = document.querySelector(
  ".main-container .main-container__buttons .main-container__buttons-next"
);

nxtButton.addEventListener("click", showNextContainer);

function showNextContainer() {
  const mainContainer = document
    .querySelector(".main-container")
    .querySelectorAll("section");

  mainContainer.forEach((container) => {
    if (!container.classList.contains("visible")) {
      const actualContainer = container;
      actualContainer.classList.add("visible");

      const sibling = actualContainer.nextElementSibling;
      sibling.classList.remove("visible");
      console.log(sibling);
    }
  });
  console.log(mainContainer);
}
