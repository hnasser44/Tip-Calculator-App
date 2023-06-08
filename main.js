const BillInput = document.querySelector(".bill-input");
const TipButtons = document.querySelectorAll(".tip-options button");
const TipPercentageInput = document.querySelector('.custom-tipPercentage-input');
const NumberOfPeopleInput = document.querySelector(".people-input");
const TipAmountValue = document.querySelector(".tip-amount-val");
const TotalAmountValue = document.querySelector(".tip-total-val");
const ResetButton = document.querySelector(".card-right button");

let customTipPercentage = 0;

function checkInput(input) {
  const value = parseFloat(input.value);
  return !isNaN(value) && value > 0;
}

function calculateTip() {
  if (BillInput.value === "" || NumberOfPeopleInput.value === "") {
    TipAmountValue.textContent = "$0.00";
    TotalAmountValue.textContent = "$0.00";
    return;
  }

  let tipPercentage = 0;

  if (TipPercentageInput.value !== "") {
    tipPercentage = parseFloat(TipPercentageInput.value);
  } else {
    const activeButton = document.querySelector(".tip-options button.active");
    if (activeButton) {
      tipPercentage = parseFloat(activeButton.dataset.tippercentage);
    }
  }

  const billValue = parseFloat(BillInput.value);
  const numberOfPeopleValue = parseFloat(NumberOfPeopleInput.value);
  const tipAmount = (billValue * (tipPercentage / 100)) / numberOfPeopleValue;
  const totalAmount = (billValue / numberOfPeopleValue) + tipAmount;
  TipAmountValue.textContent = `$${tipAmount.toFixed(2)}`;
  TotalAmountValue.textContent = `$${totalAmount.toFixed(2)}`;
}

function clearInputs() {
  BillInput.value = "";
  TipPercentageInput.value = "";
  NumberOfPeopleInput.value = "";
  TipAmountValue.textContent = "$0.00";
  TotalAmountValue.textContent = "$0.00";
  TipButtons.forEach((button) => {
    button.classList.remove("active");
  });
}

TipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    TipButtons.forEach((button) => {
      button.classList.remove("active");
    });
    button.classList.add("active");
    customTipPercentage = parseFloat(button.dataset.tippercentage);
    calculateTip();
  });
});

BillInput.addEventListener("input", () => {
  if (!checkInput(BillInput)) {
    BillInput.value = "";
  }
  calculateTip();
});

TipPercentageInput.addEventListener("input", () => {
  if (!checkInput(TipPercentageInput) || TipPercentageInput.value > 100) {
    TipPercentageInput.value = "";
  }
  calculateTip();
});

NumberOfPeopleInput.addEventListener("input", () => {
  if (!checkInput(NumberOfPeopleInput)) {
    NumberOfPeopleInput.value = "";
  }
  calculateTip();
});

ResetButton.addEventListener("click", () => {
  clearInputs();
});
