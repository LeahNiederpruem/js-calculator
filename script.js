const allButtons = document.getElementsByTagName("button");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const plusminus = document.querySelector("[data-plusminus]");
const inputNumberField = document.querySelector(".inputNumber");
const previewCalc = document.querySelector(".previewCalc");

let inputOperator = undefined;
let savedInputNumber = undefined;
let currentNumber = 0;
let resultNumber = undefined;

document.body.onkeypress = (e) => {
  if (isDigit(e.key)) {
    checkInput(e.key);
    pressEvent(e.key);
  }
};

document.body.onkeydown = (e) => {
  switch (e.key.toLowerCase()) {
    case "enter":
      calculate();
      break;
    case "backspace":
      deleteNumber();
      break;
    case "c":
      clearAll();
      break;
    case "_":
      changeSign();
      break;
    case ".":
      checkInput(".");
      pressEvent(e.key);
      break;
    case "+":
      setOperator("addition");
      break;
    case "-":
      setOperator("subtraction");
      break;
    case "*":
      setOperator("multiplication");
      break;
    case "/":
      setOperator("division");
      break;
  }
};

deleteButton.onclick = () => {
  deleteNumber();
};

clearButton.onclick = () => {
  clearAll();
};

equalsButton.onclick = () => {
  calculate();
};

plusminus.onclick = () => {
  changeSign();
};

numberButtons.forEach((button) => {
  button.onclick = () => {
    checkInput(button.innerText);
  };
});

operationButtons.forEach((button) => {
  button.onclick = () => {
    setOperator(button.dataset.operation);
  };
});

const checkInput = (input) => {
  if (input == ".") {
    return checkDecimal(input);
  }

  if (savedInputNumber == currentNumber) {
    replaceInput(input);
  } else if (inputNumberField.innerText == resultNumber) {
    replaceInput(input);
  } else {
    if (inputNumberField.innerText == "0" && input == 0) {
      return;
    } else if (inputNumberField.innerText == "0" && input != 0) {
      replaceInput(input);
    } else {
      appendInput(input);
    }
  }
  currentNumber = inputNumberField.innerText;
};

checkDecimal = (input) => {
  if (inputNumberField.innerText.includes(".") && input == ".") {
    return;
  } else {
    appendInput(input);
  }
};

const calculate = () => {
  switch (inputOperator) {
    case "addition":
      inputNumberField.innerText = calcAddition(
        savedInputNumber,
        currentNumber
      );
      break;
    case "subtraction":
      inputNumberField.innerText = calcSubtraction(
        savedInputNumber,
        currentNumber
      );
      break;
    case "multiplication":
      inputNumberField.innerText = calcMultiplication(
        savedInputNumber,
        currentNumber
      );
      break;
    case "division":
      inputNumberField.innerText = calcDivision(
        savedInputNumber,
        currentNumber
      );
      break;
  }
  resultNumber = inputNumberField.innerText;
  removeActiveStyle();
};

const setOperator = (input) => {
  calculate();
  savedInputNumber = inputNumberField.innerText;
  inputOperator = input;
  setActiveStyle(input);
};

const setActiveStyle = (input) => {
  removeActiveStyle();
  const styleButton = document.querySelector(`.${input}`);
  styleButton.classList.add("active");
};

const removeActiveStyle = () => {
  operationButtons.forEach((operationButton) => {
    operationButton.classList.remove("active");
  });
};

const changeSign = () => {
  if (Math.sign(currentNumber) == 1) {
    currentNumber = Math.abs(currentNumber) * -1;
  } else {
    currentNumber = Math.abs(currentNumber) * 1;
  }
  inputNumberField.innerText = currentNumber;
};

const appendInput = (input) => {
  if (inputNumberField.innerText.length > 16) {
    return;
  }
  inputNumberField.innerText += input;
  currentNumber = inputNumberField.innerText;
};

const replaceInput = (input) => {
  inputNumberField.innerText = input;
  currentNumber = inputNumberField.innerText;
};

const calcAddition = (num1, num2) => {
  return parseFloat(num1) + parseFloat(num2);
};

const calcSubtraction = (num1, num2) => {
  return parseFloat(num1) - parseFloat(num2);
};

const calcMultiplication = (num1, num2) => {
  return parseFloat(num1) * parseFloat(num2);
};

const calcDivision = (num1, num2) => {
  return parseFloat(num1) / parseFloat(num2);
};

const deleteNumber = () => {
  inputNumberField.innerText = inputNumberField.innerText.slice(0, -1);
  if (inputNumberField.innerText.length == 0) {
    inputNumberField.innerText = 0;
  }
  currentNumber = inputNumberField.innerText;
};

const clearAll = () => {
  removeActiveStyle();
  inputNumberField.innerText = 0;
  inputOperator = undefined;
  savedInputNumber = undefined;
  currentNumber = undefined;
  resultNumber = undefined;
};

const isDigit = (input) => {
  return /\d/.test(input);
};

const pressEvent = (input) => {
  const number = document.querySelector(`[data-number="${input}"]`);
  number.classList.add("keydown");
};

// const removePressEventStyle = (e) => {
//   e.target.classList.remove("keydown");
// };

numberButtons.forEach((button) => {
  button.ontransitionend = (e) => {
    e.target.classList.remove("keydown");
  };
});

const debugLog = () => {
  console.log("savedInputNumber", savedInputNumber);
  console.log("currentNumber", currentNumber);
  console.log("resultNumber", resultNumber);
  console.log("–––––––––––––––––––––––––––––––––");
};
