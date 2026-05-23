const display = document.getElementById("display");
const buttons = document.querySelectorAll(".button");

let currentValue = "0";
let previousValue = null;
let operator = null;
let waitingForNewValue = false;

function updateDisplay() {
  display.textContent = currentValue;
}

function inputNumber(number) {
  if (waitingForNewValue) {
    currentValue = number;
    waitingForNewValue = false;
  } else {
    currentValue = currentValue === "0" ? number : currentValue + number;
  }
}

function inputDecimal() {
  if (waitingForNewValue) {
    currentValue = "0.";
    waitingForNewValue = false;
    return;
  }
  if (!currentValue.includes(".")) {
    currentValue += ".";
  }
}

function clearCalculator() {
  currentValue = "0";
  previousValue = null;
  operator = null;
  waitingForNewValue = false;
}

function toggleSign() {
  if (currentValue === "0") return;
  currentValue = currentValue.startsWith("-") ? currentValue.slice(1) : `-${currentValue}`;
}

function percentValue() {
  currentValue = String(parseFloat(currentValue) / 100);
}

function calculate(nextOperator) {
  const inputValue = parseFloat(currentValue);
  if (operator && waitingForNewValue) {
    operator = nextOperator;
    return;
  }

  if (previousValue === null) {
    previousValue = inputValue;
  } else if (operator) {
    const result = performCalculation(operator, previousValue, inputValue);
    currentValue = String(result);
    previousValue = result;
  }

  waitingForNewValue = true;
  operator = nextOperator;
}

function performCalculation(operator, first, second) {
  switch (operator) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "*":
      return first * second;
    case "/":
      return second === 0 ? 0 : first / second;
    default:
      return second;
  }
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    switch (action) {
      case "number":
        inputNumber(value);
        break;
      case "decimal":
        inputDecimal();
        break;
      case "clear":
        clearCalculator();
        break;
      case "negate":
        toggleSign();
        break;
      case "percent":
        percentValue();
        break;
      case "operator":
        calculate(value);
        break;
      case "calculate":
        calculate(null);
        waitingForNewValue = true;
        operator = null;
        break;
    }

    updateDisplay();
  });
});

updateDisplay();
