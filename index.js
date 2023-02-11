const nxtButton = document.querySelector(
  ".main-container .main-container__buttons .main-container__buttons-next"
);
nxtButton.addEventListener("click", showNextContainer);

const bckButton = document.querySelector(
  ".main-container__buttons .main-container__buttons-back"
);
bckButton.classList.add("visible");
bckButton.addEventListener("click", showPreviousContainer);

let planPriceSelected;
let namePlanSelected;

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

planContainer.forEach((container) => {
  container.addEventListener("click", () => {
    planContainer.forEach((i) => {
      i.classList.remove("activePlan");
    });
    container.classList.toggle("activePlan");

    //changes prices between monthly and yearly. Also gets the price and name from the selected plan
    namePlanSelected = container.querySelector(
      ".main-container__plan__options__container__price__planName"
    ).innerText;

    container.querySelectorAll(".prices").forEach((p) => {
      if (!p.classList.contains("visible")) {
        p.querySelectorAll("span").forEach((p) => {
          planPriceSelected = parseInt(p.innerText);
        });
      }
    });
    deployPlan();
  });
});

//functionality for the sequence of numbers
function showNextContainer() {
  bckButton.classList.remove("visible");
  let actualStep;
  let siblingStep;

  //"Next step" button functionality
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

//Plans and extras container
const optionsContainer = document
  .querySelector(".main-container__plan")
  .querySelectorAll(".main-container__plan__options__container");
const extrasContainer = document.querySelectorAll(
  ".main-container__extras-container__picks__container"
);

//checkbox for plan selection
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
    extraContainer
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

let extraPriceSelected;
let extraNameSelected;

let onlineService;
let largeStorage;
let customProfile;

let onlineServicePrice;
let largeStoragePrice;
let customProfilePrice;

extrasContainer.forEach((c) => {
  c.addEventListener("click", () => {
    //checked and unchecked the checkbox lol
    if (c.querySelector("input").checked) {
      c.querySelector("input").checked = false;
    } else {
      c.querySelector("input").checked = true;
    }
    //gets the name of the extras
    extraNameSelected = c.querySelector("div").querySelector("h1").innerText;

    if (extraNameSelected === "Online service") {
      if (onlineService === undefined) {
        onlineService = extraNameSelected;
      } else {
        onlineService = undefined;
      }
      getThePrice(c);
    } else if (extraNameSelected === "Large storage") {
      if (largeStorage === undefined) {
        largeStorage = extraNameSelected;
      } else {
        largeStorage = undefined;
      }
      getThePrice(c);
    } else if (extraNameSelected === "Customizable profile") {
      if (customProfile === undefined) {
        customProfile = extraNameSelected;
      } else {
        customProfile = undefined;
      }
      getThePrice(c);
    }
  });
});

//Gets the price of the extra selected
function getThePrice(c) {
  c.querySelectorAll("p").forEach((p) => {
    if (!p.classList.contains("visible")) {
      p.querySelectorAll("span").forEach((s) => {
        extraPriceSelected = parseInt(s.innerText);
        if (extraPriceSelected === 1 || extraPriceSelected === 10) {
          if (onlineServicePrice === undefined) {
            onlineServicePrice = extraPriceSelected;
          } else {
            onlineServicePrice = undefined;
          }
        } else if (extraPriceSelected === 2 || extraPriceSelected === 20) {
          if (largeStoragePrice === undefined) {
            largeStoragePrice = extraPriceSelected;
          } else {
            largeStoragePrice = undefined;
          }
        } else if (extraPriceSelected === 3 || extraPriceSelected === 30) {
          if (customProfilePrice === undefined) {
            customProfilePrice = extraPriceSelected;
          } else {
            customProfilePrice = undefined;
          }
        }
      });
    }
  });
  console.log("Precios obtenidos");
  // deployExtras();
}

function deployPlan() {
  const showPlanSelected = document.querySelector(
    ".main-container__summary-container__pay-summary__plan-container"
  );
  console.log(showPlanSelected);
}
