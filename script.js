const allButtons = document.getElementsByTagName("button");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const functionButtons = document.querySelectorAll("[data-function]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const plusminus = document.querySelector("[data-plusminus]");
const inputNumberField = document.querySelector(".inputNumber");

let inputOperator = undefined;
let savedInputNumber = undefined;
let currentNumber = 0;
let resultNumber = undefined;

let replaceNumber = true;

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
      keyPressEvent(e.key);
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

  if (isDigit(e.key)) {
    checkInput(e.key);
    keyPressEvent(e.key);
  }
};

numberButtons.forEach((button) => {
  button.innerText = button.dataset.number
  button.onclick = () => {
    checkInput(button.innerText);
  };
});

operationButtons.forEach((button) => {
  button.onclick = () => {
    setOperator(button.dataset.operation);
  };
});

functionButtons.forEach((button) => {
  button.onclick = () => {
    useFunction(button.dataset.function);
  };
});

const checkInput = (input) => {
  if (input === ".") {
    replaceNumber = false;
    return appendDecimal(input);
  } else if (inputNumberField.innerText === "0" && input === "0") {
    replaceNumber = true;
    return;
  }

  if (replaceNumber) {
    replaceInput(input);
    replaceNumber = false;
  } else if (!replaceNumber) {
    appendInput(input);
  }

  currentNumber = inputNumberField.innerText;
};

const useFunction = (input) => {
  switch (input) {
    case "clear":
      clearAll();
      break;
    case "delete":
      deleteNumber();
      break;
    case "plusminus":
      changeSign();
      break;
    case "equals":
      calculate();
      break;
  }
};

appendDecimal = (input) => {
  if (inputNumberField.innerText.includes(".") && input === ".") {
    return;
  } else {
    appendInput(input);
  }
};

const calculate = () => {
  switch (inputOperator) {
    case "addition":
      updateDisplay(calcAddition(savedInputNumber, currentNumber));
      break;
    case "subtraction":
      updateDisplay(calcSubtraction(savedInputNumber, currentNumber));
      break;
    case "multiplication":
      updateDisplay(calcMultiplication(savedInputNumber, currentNumber));
      break;
    case "division":
      updateDisplay(calcDivision(savedInputNumber, currentNumber));
      break;
  }
  resultNumber = inputNumberField.innerText;
  savedInputNumber = resultNumber;
  replaceNumber = true;
  currentNumber = 0;
  removeActiveStyle();
};

const updateDisplay = (input) => {
  if (input.toString().length >= 16) {
    inputNumberField.innerText = parseFloat(input).toFixed(8);
  } else {
    inputNumberField.innerText = input;
  }
};

const setOperator = (input) => {
  calculate();
  replaceNumber = true;
  savedInputNumber = inputNumberField.innerText;
  inputOperator = input;
  setActiveStyle(input);
};

const setActiveStyle = (input) => {
  removeActiveStyle();
  const styleButton = document.querySelector(`#${input}`);
  styleButton.classList.add("active");
};

const removeActiveStyle = () => {
  operationButtons.forEach((operationButton) => {
    operationButton.classList.remove("active");
  });
};

const changeSign = () => {
  if (Math.sign(currentNumber) === 1) {
    currentNumber = Math.abs(currentNumber) * -1;
  } else {
    currentNumber = Math.abs(currentNumber) * 1;
  }
  inputNumberField.innerText = currentNumber;
};

const appendInput = (input) => {
  if (inputNumberField.innerText.length > 14) {
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
  if (num2 === 0) {
    return num1;
  }
  
  return parseFloat(num1) / parseFloat(num2);
};

const deleteNumber = () => {
  inputNumberField.innerText = inputNumberField.innerText.slice(0, -1);
  if (inputNumberField.innerText.length === 0) {
    replaceNumber = true;
    inputNumberField.innerText = 0;
  } else if (inputNumberField.innerText === "0") {
    replaceNumber = true;
  }
  currentNumber = inputNumberField.innerText;
};

const clearAll = () => {
  removeActiveStyle();
  inputNumberField.innerText = 0;
  replaceNumber = true;
  inputOperator = undefined;
  savedInputNumber = undefined;
  currentNumber = undefined;
  resultNumber = undefined;
};

const isDigit = (input) => {
  if (input.length === 1 && /\d/.test(input)) {
    return /\d/.test(input);
  }
};

const keyPressEvent = (input) => {
  removeKeydownStyle();
  const number = document.querySelector(`[data-number="${input}"]`);
  number.classList.add("keydown");

  document.body.onkeyup = (e) => {
    number.classList.remove("keydown");
  };
};

const removeKeydownStyle = () => {
  numberButtons.forEach((button) => {
    button.classList.remove("keydown");
  });
};

numberButtons.forEach((button) => {
  button.ontransitionend = (e) => {
    e.target.classList.remove("keydown");
  };
});

const debugLog = () => {
  console.log("savedInputNumber", savedInputNumber);
  console.log("currentNumber", currentNumber);
  console.log("resultNumber", resultNumber);
  console.log("inputOperator", inputOperator);
  console.log(replaceNumber);
  console.log("–––––––––––––––––––––––––––––––––");
};
