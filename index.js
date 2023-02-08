const nxtButton = document.querySelector(
  ".main-container .main-container__buttons .main-container__buttons-next"
);
nxtButton.addEventListener("click", showNextContainer);

const bckButton = document.querySelector(
  ".main-container__buttons .main-container__buttons-back"
);
bckButton.classList.add("visible");
bckButton.addEventListener("click", showPreviousContainer);

//Main containers
const nextStepContainer = document
  .querySelector(".main-container__steps")
  .querySelectorAll(".main-container__steps__steps--container");

const mainContainer = document
  .querySelector(".main-container")
  .querySelectorAll("section");

const planContainer = document
  .querySelector(".main-container__plan__options")
  .querySelectorAll(".main-container__plan__options__container");

//functionality for the sequence of numbers
planContainer.forEach((container) => {
  container.addEventListener("click", () => {
    planContainer.forEach((i) => {
      i.classList.remove("activePlan");
    });
    container.classList.toggle("activePlan");
  });
});

//"Next step" button functionality
function showNextContainer() {
  bckButton.classList.remove("visible");
  let actualStep;
  let siblingStep;

  nextStepContainer.forEach((container) => {
    if (container.classList.contains("active")) {
      actualStep = container;
      siblingStep = actualStep.nextElementSibling;
    }
  });
  actualStep.classList.remove("active");
  siblingStep.classList.add("active");

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

//"Go back" button functionality
function showPreviousContainer() {
  let actualStep;
  let siblingStep;

  nextStepContainer.forEach((container) => {
    if (container.classList.contains("active")) {
      actualStep = container;
      siblingStep = actualStep.previousElementSibling;
    }
  });
  actualStep.classList.remove("active");
  siblingStep.classList.add("active");

  let actualContainer;
  let sibling;
  mainContainer.forEach((container) => {
    if (!container.classList.contains("visible")) {
      actualContainer = container;
      sibling = actualContainer.previousElementSibling;
    }
  });
  if (actualContainer.classList.contains("main-container__form")) {
    console.log("Contenedor input");
  }

  actualContainer.classList.add("visible");
  sibling.classList.remove("visible");
}

//checkbox for plan selection
const optionsContainer = document
  .querySelector(".main-container__plan")
  .querySelectorAll(".main-container__plan__options__container");

const extrasContainer = document.querySelectorAll(
  ".main-container__extras-container__picks__container"
);

const chk = document.getElementById("checkBox");
chk.addEventListener("click", () => {
  optionsContainer.forEach((container) => {
    const yearlyPrice = container
      .querySelector(".main-container__plan__options__container__price")
      .querySelectorAll(
        ".main-container__plan__options__container__price__yearly"
      );

    const monthlyPrice = container
      .querySelector(".main-container__plan__options__container__price")
      .querySelectorAll(
        ".main-container__plan__options__container__price__monthly"
      );
    monthlyPrice.forEach((price) => {
      price.classList.toggle("visible");
    });

    yearlyPrice.forEach((price) => {
      price.classList.toggle("visible");
    });
    container.querySelectorAll("p").forEach((p) => {
      p.classList.toggle("visible");
    });
  });

  extrasContainer.forEach((extraContainer) => {
    const priceMonthly = extraContainer
      .querySelectorAll(
        ".main-container__extras-container__picks__container-price__monthly"
      )
      .forEach((price) => {
        price.classList.toggle("visible");
      });

    extraContainer
      .querySelectorAll(
        ".main-container__extras-container__picks__container-price__yearly"
      )
      .forEach((price) => {
        price.classList.toggle("visible");
      });
  });
});
