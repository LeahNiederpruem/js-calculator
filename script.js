const allButtons = document.getElementsByTagName("button");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const inputNumberField = document.querySelector(".inputNumber");
// const liveOperation = document.querySelector(".liveOperation");

let inputNumber = inputNumberField.innerHTML;

numberButtons.forEach((button) => {
  button.onclick = () => {
    checkInput(button.innerText);
  };
});

operationButtons.forEach((button) => {
  button.onclick = () => {
    console.log(button);
  };
});

clearButton.onclick = () => {
  clearAll();
};

deleteButton.onclick = () => {
  deleteNumber();
};

const checkInput = (input) => {
  if (inputNumberField.innerText == 0 && input == 0) {
    return;
  } else if (inputNumberField.innerText.includes(",") && input == ",") {
    return;
  } else if (inputNumberField.innerText == 0 && input != 0) {
    updateDisplay(input);
  } else if (inputNumberField.innerText == 0 && input == ",") {
    updateDisplay(input);
  } else {
    updateDisplay(input);
  }
};

const updateDisplay = (input) => {
  if (inputNumberField.innerText == 0 && input == ",") {
    appendNumber(input);
  } else if (inputNumberField.innerText == 0 && input != 0) {
    replaceNumber(input);
  } else {
    appendNumber(input);
  }
};

const appendNumber = (input) => {
  inputNumberField.innerText += input;
};

const replaceNumber = (input) => {
  inputNumberField.innerText = input;
};

const clearAll = () => {
  inputNumberField.innerText = 0;
};

const deleteNumber = () => {
  inputNumberField.innerText = inputNumberField.innerText.slice(0, -1);
  if (inputNumberField.innerText.length == 0) {
    inputNumberField.innerText = 0;
  }
};
