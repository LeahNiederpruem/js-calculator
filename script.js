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
currentNumber = undefined;
resultNumber = undefined;

deleteButton.onclick = () => {
  deleteNumber();
};

clearButton.onclick = () => {
  clearAll();
};

equalsButton.onclick = () => {
  calculate();
};

numberButtons.forEach((button) => {
  button.onclick = () => {
    checkInput(button.innerText);
    console.log('-----------------------')
    console.log('savedInputNumber', savedInputNumber)
    console.log('currentNumber', currentNumber)
    console.log('resultNumber', resultNumber)
  };
});

operationButtons.forEach((button) => {
  button.onclick = () => {
    setOperator(button);
  };
});

const checkInput = (input) => {
  if(input == '.'){
    return checkComma(input)
  }

  if (savedInputNumber == currentNumber) {
    replaceNumber(input);
  } else if (inputNumberField.innerText == resultNumber) {
    replaceNumber(input);
  } else {
    if (inputNumberField.innerText == 0 && input == 0) {
      return;
    } else if (inputNumberField.innerText === 0 && input != 0) {
      replaceNumber(input);
    } else {
      appendNumber(input);
    }
  }

  currentNumber = inputNumberField.innerText;
};

checkComma = (input) => {
  if (inputNumberField.innerText.includes('.') && input == '.') {
    return
  } else {
    appendNumber(input)
  }
}

const calculate = () => {
  switch (inputOperator) {
    case "+":
      inputNumberField.innerText = calcAddition(
        savedInputNumber,
        currentNumber
      );
      break;
    case "-":
      inputNumberField.innerText = calcSubtraction(
        savedInputNumber,
        currentNumber
      );
      break;
    case "⨉":
      inputNumberField.innerText = calcMultiplication(
        savedInputNumber,
        currentNumber
      );
      break;
    case "÷":
      inputNumberField.innerText = calcDivision(
        savedInputNumber,
        currentNumber
      );
      break;
  }
  resultNumber = inputNumberField.innerText;
  removeActiveStyle();
};

const setOperator = (button) => {
  // console.log(button);
  savedInputNumber = inputNumberField.innerText;
  inputOperator = button.innerText;
  setActiveStyle(button);
};

const setActiveStyle = (button) => {
  removeActiveStyle();
  button.classList.add("active");
};

const removeActiveStyle = () => {
  operationButtons.forEach((operationButton) => {
    operationButton.classList.remove("active");
  });
};

const appendNumber = (input) => {
  inputNumberField.innerText += input;
  currentNumber = inputNumberField.innerText;
};

const replaceNumber = (input) => {
  inputNumberField.innerText = input;
  currentNumber = inputNumberField.innerText;
};

const calcAddition = (num1, num2) => {
  return (parseFloat(num1) + parseFloat(num2)).toFixed(2);
};

const calcSubtraction = (num1, num2) => {
  return (parseFloat(num1) - parseFloat(num2)).toFixed(2);
};

const calcMultiplication = (num1, num2) => {
  return (parseFloat(num1) * parseFloat(num2)).toFixed(2);
};

const calcDivision = (num1, num2) => {
  return (parseFloat(num1) / parseFloat(num2)).toFixed(2);
};

const deleteNumber = () => {
  inputNumberField.innerText = inputNumberField.innerText.slice(0, -1);
  if (inputNumberField.innerText.length == 0) {
    inputNumberField.innerText = 0;
  }
};

const clearAll = () => {
  inputNumberField.innerText = 0;
  removeActiveStyle();
  inputOperator = undefined;
  savedInputNumber = undefined;
  currentNumber = undefined;
  resultNumber = undefined;
};

const isNumber = (input) => {
  if (input.includes("Digit")) {
    return true;
  }
};
