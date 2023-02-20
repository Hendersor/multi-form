const nxtButton = document.querySelector(
  ".main-container .main-container__buttons .main-container__buttons-next"
);
nxtButton.addEventListener("click", showNextContainer);
// nxtButton.addEventListener("click", whichContainerAreWe);
const bckButton = document.querySelector(
  ".main-container__buttons .main-container__buttons-back"
);
// bckButton.addEventListener("click", whichContainerAreWe);
bckButton.classList.add("visible");
bckButton.addEventListener("click", showPreviousContainer);

let planPriceSelected;
let namePlanSelected;

const total = [];

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
    //Reactivate button

    nxtButton.style.background = "hsl(213, 96%, 18%)";
    nxtButton.color = "white";
    nxtButton.disabled = false;
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
  //Functionality in the containers using the next button
  whichContainerAreWeNext(sibling);
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

  ////////////////////////////////////////
  whichContainerAreWeBack(sibling);
}

function whichContainerAreWeBack(sibling) {
  const container = sibling;
  if (!container.classList.contains("visible")) {
    if (container.classList.contains("main-container__form")) {
      mainContainerFunctionality();
      checkPersonalInfo();
    }
    // else {
    //   nxtButton.disabled = false;
    //   nxtButton.style.background = "hsl(213, 96%, 18%)";
    //   nxtButton.style.color = "white";
    // }
  }
}

function whichContainerAreWeNext(sibling) {
  const container = sibling;
  if (!container.classList.contains("visible")) {
    if (container.classList.contains("main-container__plan")) {
      selectPlanFunctionality(container);
    } else if (
      container.classList.contains("main-container__summary-container")
    ) {
      getTheTotal();
    }
  }
}

function mainContainerFunctionality() {
  bckButton.classList.add("visible");
  nxtButton.disabled = false;
  nxtButton.style.background = "hsl(213, 96%, 18%)";
  nxtButton.style.color = "white";
}

function selectPlanFunctionality(container) {
  const plansContainer = container.querySelectorAll(
    ".main-container__plan__options__container"
  );
  plansContainer.forEach((active) => {
    if (!active.classList.contains("activePlan")) {
      nxtButton.style.backgroundColor = "gray";
      nxtButton.style.color = "white";
      nxtButton.disabled = true;
    } else if (active.classList.contains("activePlan")) {
      nxtButton.disabled = false;
      nxtButton.style.background = "hsl(213, 96%, 18%)";
      nxtButton.style.color = "white";
    }
  });
}

function getTheTotal() {
  const planPrice = parseInt(document.querySelector(".price").innerText);
  const extraTotal = total.reduce((sum, item) => sum + item, 0);
  const finalPay = planPrice + extraTotal;

  const domTotal = document.querySelector(".total");
  domTotal.innerText = finalPay;
}

//Plans and extras container
const optionsContainer = document
  .querySelector(".main-container__plan")
  .querySelectorAll(".main-container__plan__options__container");
const extrasContainer = document.querySelectorAll(
  ".main-container__extras-container__picks__container"
);

const pricesContainer = document.querySelectorAll(
  ".main-container__summary-container__extras-summary__extra-container"
);

//Get the prices for the extras and push it to the array
extrasContainer.forEach((e) => {
  e.addEventListener("click", () => {
    let price = parseInt(e.querySelector("span").innerText);
    if (!total.includes(price)) {
      total.push(price);
    } else {
      const index = total.indexOf(price);
      total.splice(index, 1);
    }
  });
});

//checkbox for plan selection
const chk = document.getElementById("checkBox");
chk.addEventListener("click", () => {
  console.log("Checkbox");
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
  if (chk.checked) {
    filterSummary(pricesContainer);
    filterPlan();
  } else {
    filterSummary(pricesContainer);
    filterPlan();
  }
});

//The filter in the ticket that change the plan between monthly and yearly
function filterPlan() {
  const summaryPlanContainer = document.querySelector(
    ".main-container__summary-container__pay-summary__plan-container"
  );

  const summaryTotalContainer = document
    .querySelector(
      ".main-container__summary-container__extras-summary__total-container"
    )
    .querySelector("p")
    .querySelector(".sub");
  const textPerMonthPerYear = document
    .querySelector(
      ".main-container__summary-container__extras-summary__total-container"
    )
    .querySelector(".sub");

  const summaryPrice = document.querySelector(".price");
  const summaryPlan = summaryPlanContainer.querySelector(".sub");
  const summaryPlanPrice = summaryPrice.innerText;
  //Change in the summary monthly and yearly, also the price
  if (summaryPlan.innerText === "/mo") {
    summaryPlan.innerText = "/yr";
    summaryTotalContainer.innerText = "/yr";
    textPerMonthPerYear.innerText = "(per year)";
    if (summaryPlanPrice === "9") {
      summaryPrice.innerText = "90";
    } else if (summaryPlanPrice === "12") {
      summaryPrice.innerText = "120";
    } else if (summaryPlanPrice === "15") {
      summaryPrice.innerText = "150";
    }
  } else if (summaryPlan.innerText === "/yr") {
    summaryPlan.innerText = "/mo";
    summaryTotalContainer.innerText = "/mo";
    textPerMonthPerYear.innerText = "(per month)";
    if (summaryPlanPrice === "90") {
      summaryPrice.innerText = "9";
    } else if (summaryPlanPrice === "120") {
      summaryPrice.innerText = "12";
    } else if (summaryPlanPrice === "150") {
      summaryPrice.innerText = "15";
    }
  }
}

//The filter in the ticket between monthly and yearly
function filterSummary(pricesContainer) {
  let sub = "/mo";
  const firstContainer = document.getElementById("1price");
  const secondContainer = document.getElementById("2price");
  const thirdContainer = document.getElementById("3price");
  //Change the type of plan and the prices
  pricesContainer.forEach((c) => {
    const p = c.querySelectorAll(".finalPrice");
    p.forEach((p) => {
      const span = p.querySelectorAll("span");
      span.forEach((s) => {
        if (s.innerText.includes("/mo")) {
          s.innerText = "/yr";
          sub = s.innerText;
          firstContainer.innerText = "10";
          secondContainer.innerText = "20";
          thirdContainer.innerText = "30";
        } else if (s.innerText.includes("/yr")) {
          s.innerText = "/mo";
          sub = s.innerText;
          firstContainer.innerText = "1";
          secondContainer.innerText = "2";
          thirdContainer.innerText = "3";
        }
      });
    });
  });
}

const extrasNameContainer = document.querySelectorAll(
  ".main-container__extras-container__picks__container"
);

extrasNameContainer.forEach((n) => {
  n.addEventListener("click", () => {
    deployExtrasinSummary(n);
    //check and un check the extras
    const checkbox = n.querySelector("input");
    if (checkbox.checked) {
      checkbox.checked = false;
    } else {
      checkbox.checked = true;
    }
  });
});

function deployExtrasinSummary(n) {
  const name = n.querySelector("h1").innerText;

  const allExtras = document.querySelectorAll(
    ".main-container__summary-container__extras-summary__extra-container"
  );
  allExtras.forEach((find) => {
    const extraName = find.querySelector("h3").innerText;
    if (extraName === name) {
      find.classList.toggle("visible");
    }
  });
}

function deployPlan() {
  const showPlanSelected = document.querySelector(
    ".main-container__summary-container__pay-summary__plan-container"
  );
  showPlanSelected.querySelector("h3").innerText = namePlanSelected;
  showPlanSelected.querySelector(".price").innerText = planPriceSelected;
  if (planPriceSelected >= 90) {
    showPlanSelected.querySelector(".sub").innerText = "/yr";
  } else {
    showPlanSelected.querySelector(".sub").innerText = "/mo";
  }
}
//Enables and disables the button "Next" in the form container
function checkPersonalInfo() {
  const inputsContainers = document.querySelectorAll(
    ".main-container__form__input-container__input input"
  );

  let name;
  let email;
  let phone;
  if (name === undefined && email === undefined && phone === undefined) {
    nxtButton.style.backgroundColor = "gray";
    nxtButton.style.color = "white";
    nxtButton.disabled = true;
  }
  inputsContainers.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.type === "text") {
        name = input.value;
      } else if (input.type === "email") {
        email = input.value;
      } else if (input.type === "number") {
        phone = input.value;
      }
      if (name !== undefined && email !== undefined && phone !== undefined) {
        nxtButton.disabled = false;
        nxtButton.style.background = "hsl(213, 96%, 18%)";
        nxtButton.style.color = "white";
      }
    });
  });
}
checkPersonalInfo();
