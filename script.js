const allButtons = document.getElementsByTagName("button");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const inputNumberField = document.querySelector(".inputNumber");
const bottomInput = document.querySelector(".bottomInput");

let currentNumber = inputNumberField.innerHTML;

let inputNumber1 = undefined;
let inputNumber2 = undefined;
let selectedOperator = undefined;

document.body.onkeydown = (e) => {
  switch (e.key) {
    case "+":
      setOperator("+");
      break;
    case "-":
      setOperator("-");
      break;
    case "*":
      setOperator("*");
      break;
    case "/":
      setOperator("/");
      break;
    case "Enter":
      doMath();
      break;
  }

  if (e.key == "Backspace") {
    deleteNumber();
  } else if (e.key.toLowerCase() == "c") {
    clearAll();
  } else if (e.key == ".") {
    checkInput(e.key);
  } else if (isNumber(e.code)) {
    checkInput(e.key);
  }
};

numberButtons.forEach((button) => {
  button.onclick = () => {
    checkInput(button.innerText);
  };
});

operationButtons.forEach((button) => {
  button.onclick = () => {
    switch (button.innerText) {
      case "+":
        setOperator("+");
        break;
      case "-":
        setOperator("-");
        break;
      case "⨉":
        setOperator("*");
        break;
      case "÷":
        setOperator("/");
        break;
    }
  };
});

clearButton.onclick = () => {
  clearAll();
};

equalsButton.onclick = () => {
  doMath();
};

deleteButton.onclick = () => {
  deleteNumber();
};

const checkInput = (input) => {
  if (inputNumberField.innerText == 0 && input == 0) {
    return;
  } else if (inputNumberField.innerText.includes(".") && input == ".") {
    return;
  } else if (inputNumberField.innerText == 0 && input != 0) {
    updateDisplay(input);
  } else if (inputNumberField.innerText == 0 && input == ".") {
    updateDisplay(input);
  } else {
    updateDisplay(input);
  }
};

const updateDisplay = (input) => {
  if (inputNumberField.innerText == 0 && input == ".") {
    appendNumber(input);
  } else if (inputNumberField.innerText == 0 && input != 0) {
    replaceNumber(input);
  } else {
    appendNumber(input);
  }
};

const appendNumber = (input) => {
  inputNumberField.innerText += input;
  setCurrentNumber();
};

const replaceNumber = (input) => {
  inputNumberField.innerText = input;
  setCurrentNumber();
};

const setOperator = (operator) => {
  selectedOperator = operator;
  updateBottomInput();
};

const updateBottomInput = () => {
  bottomInput.innerText = inputNumberField.innerText;
  inputNumberField.innerText = 0;
};

const doMath = () => {
  switch (selectedOperator) {
    case "+":
      bottomInput.innerText = calcAddition(
        parseFloat(inputNumberField.innerText),
        parseFloat(bottomInput.innerText)
      );
      break;
    case "-":
      bottomInput.innerText = calcSubtraction(
        parseFloat(inputNumberField.innerText),
        parseFloat(bottomInput.innerText)
      );
      break;
    case "*":
      bottomInput.innerText = calcMutliplication(
        parseFloat(inputNumberField.innerText),
        parseFloat(bottomInput.innerText)
      );
      break;
    case "/":
      bottomInput.innerText = calcDivision(
        parseFloat(inputNumberField.innerText),
        parseFloat(bottomInput.innerText)
      );
      break;
  }
};

const calcAddition = (num1, num2) => {
  return parseFloat(num1 + num2).toFixed(2);
};

const calcSubtraction = (num1, num2) => {
  return parseFloat(num1 - num2).toFixed(2);
};

const calcMutliplication = (num1, num2) => {
  return parseFloat(num1 * num2).toFixed(2);
};

const calcDivision = (num1, num2) => {
  return parseFloat(num1 / num2).toFixed(2);
};

const setCurrentNumber = () => {
  currentNumber = inputNumberField.innerText;
  console.log(currentNumber);
};

const clearAll = () => {
  inputNumberField.innerText = 0;
  bottomInput.innerText = 0;
  inputNumber1 == undefined;
  inputNumber2 == undefined;
  selectedOperator == undefined;
};

const deleteNumber = () => {
  inputNumberField.innerText = inputNumberField.innerText.slice(0, -1);
  if (inputNumberField.innerText.length == 0) {
    inputNumberField.innerText = 0;
  }
};

const isNumber = (input) => {
  if (input.includes("Digit")) {
    return true;
  }
};
