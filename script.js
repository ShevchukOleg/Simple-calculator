const display = document.querySelector("input.display");
const keypad = document.querySelector(".mainFunctions");
let firstOperand = 0;
let secondOperand;
let mathOperation;
keypad.addEventListener('click', separator);

function addValue(number) {
  display.value += number;
}

function separator (event) {
  event.stopPropagation()
  if (event.target.hasAttribute("data-number")) {
    inputValue(event.target.dataset.number)
  } else if (event.target.hasAttribute("data-func")) {
    operator(event.target.dataset.func)
  }
}

function operator(operation) {

  if (!!display.value) {
    switch (true) {
      case (operation === "plus" || operation === "minus" || operation === "multiply" || operation === "divide"):
        mathOperation = operation;
        firstOperand = +display.value;
        display.value = "";
        break;
      case (operation === "dot"):
        display.value += ".";
        break;
      case (operation === "clear"):
        display.value = "";
        firstOperand = 0;
        break;
      case (operation === "changeValue"):
          display.value = "-" + display.value;
          break;
      case (operation === "back"):
          display.value = display.value.slice(0, -1);
          break;
    }
  } else {
    if(operation === "Pi") {
      display.value = "3.14159265359"
    }
  }


  console.log(display.value, operation);

  console.log(firstOperand);

}

function inputValue(number) {
  console.log(number);
  addValue(number)
}
