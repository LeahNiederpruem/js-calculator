const allButtons = document.getElementsByTagName("button");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const inputNumberField = document.querySelector(".inputNumber");
const bottomInput = document.querySelector(".bottomInput");

inputOperator = undefined;
savedInputNumber = undefined;

(deleteButton.onclick = () => {
  deleteNumber();
}),
  numberButtons.forEach((button) => {
    button.onclick = () => {
      checkInput(button.innerText);
    };
  });

operationButtons.forEach((button) => {
  button.onclick = () => {
    if (inputOperator == undefined) {
      savedInputNumber = inputNumberField.innerText;
      inputNumberField.innerText = ''
    }
  };
});

const checkInput = (input) => {
  if (inputNumberField.innerText == 0 && input == 0) {
    return;
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
  console.log(input);
  inputNumberField.innerText = input;
};

const deleteNumber = () => {
  inputNumberField.innerText = inputNumberField.innerText.slice(0, -1);
  if (inputNumberField.innerText.length == 0) {
    inputNumberField.innerText = 0;
  }
};

const calcAddition = (num1, num2) => {
  return parseFloat(num1 + num2).toFixed(2);
};

const calcSubtraction = (num1, num2) => {
  return parseFloat(num1 - num2).toFixed(2);
};

const calcMultiplication = (num1, num2) => {
  return parseFloat(num1 * num2).toFixed(2);
};

const calcDivision = (num1, num2) => {
  return parseFloat(num1 / num2).toFixed(2);
};
