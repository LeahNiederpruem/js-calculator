const allButtons = document.getElementsByTagName("button");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const inputNumberField = document.querySelector(".inputNumber");

const regex = /\d/gm;

let currentNumber = inputNumberField.innerHTML;

let inputNumber1 = undefined;
let inputNumber2 = undefined;
let selectedOperator = undefined;

document.body.onkeydown = (e) => {
  if(e.key == 'Backspace'){
    deleteNumber()
  } else if (e.key.toLowerCase() == 'c'){
    clearAll()
  } else if (e.key == ','){
    checkInput(e.key)
  } else if(isNumber(e.key)){
    checkInput(e.key)
  }
};

numberButtons.forEach((button) => {
  button.onclick = () => {
    checkInput(button.innerText);
  };
});

operationButtons.forEach((button) => {
  button.onclick = () => {
    // console.log(button);
    if (selectedOperator === undefined) {
      switch (button.innerText) {
        case "+":
          selectedOperator = "+";
          break;
        case "-":
          selectedOperator = "-";
          break;
        case "⨉":
          selectedOperator = "*";
          break;
        case "÷":
          selectedOperator = "/";
          break;
      }
    }
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
  setCurrentNumber();
};

const replaceNumber = (input) => {
  inputNumberField.innerText = input;
  setCurrentNumber();
};

const setCurrentNumber = () => {
  currentNumber = inputNumberField.innerText;
  console.log(currentNumber);
};

const clearAll = () => {
  inputNumberField.innerText = 0;
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
  let match = input.match(regex)
  if(match){
    return true
  }

  return false
  // console.log(match)
}