const display = document.querySelector("input.display");
const keypad = document.querySelector(".mainFunctions");
console.log(+"-00003");
let firstOperand = null;
let secondOperand = null;
let mathOperation;
let negative = false;
let turn = 1;


keypad.addEventListener('click', separator);

function addValue(number) {
  if(display.value == "0" && number == "0") {
    return
  }

  // if(turn === 2 && secondOperand === null && display.value !== "") {
  //   display.value = "";
  //   if(!negative) {
  //     display.value += number;
  //   } else {
  //     if (display.value.charAt(0) ==="-") {
  //       display.value += number;
  //     } else {
  //       display.value = "-" + display.value + number;
  //     }
  //   }
  // } else {

  // }

  if(!negative) {
    display.value += number;
  } else {
    if (display.value.charAt(0) ==="-") {
      display.value += number;
    } else {
      display.value = "-" + display.value + number;
    }
  }
}

function separator (event) {
  event.stopPropagation()
  if (event.target.hasAttribute("data-number")) {
    addValue(event.target.dataset.number);
  } else if (event.target.hasAttribute("data-func")) {
    operator(event.target.dataset.func);
  }
}

function calculation() {
  if (mathOperation == "plus") {
    secondOperand = +display.value;
    display.value = firstOperand + secondOperand;
  } else if(mathOperation == "minus") {
    secondOperand = +display.value;
    display.value = firstOperand - secondOperand;
  }
  else if( mathOperation =="multiply") {
    secondOperand = +display.value;
    display.value = firstOperand * secondOperand;
  }
  else if( mathOperation == "divide") {
    secondOperand = +display.value;
    display.value = firstOperand /secondOperand;
  }
}

function operator(operation) {
  //Поведінка функціональних клавіш при старі программи коли поле вводу пусте
  if (turn === 1 && (display.value === "" || display.value === "0") ) {
    switch(true) {
      case (operation === "plus" || operation === "multiply" || operation === "divide"):
        mathOperation = operation;
        turn = 2;
        nagative = false;
        break;
      case(operation === "minus" ):
      if(display.value === "") {
        negative = true;
        break;
      } else if( display.value === "0") {
        firstOperand = +display.value;
        mathOperation = operation;
        nagative = false;
        turn = 2;
        display.value = "";
        break;
      }
      case ( operation === "changeValue"):
          negative = !negative;
          break;

      case ( operation === "Pi"):
        // ! duplicated code
        if (!negative) {
          firstOperand = "3.14159265359";
        } else {
          firstOperand = "-3.14159265359";
        }

        display.value = firstOperand;
        break;
        // ! duplicated code
      case (operation === "=" || operation === "back"|| operation === "clear"):
        display.value = "0";
        break;
      case (operation === "dot"):
          display.value = "0."
          break;
    }
  } else if (turn === 1 && display.value !== "") {
    switch(true) {
      case (operation === "plus" || operation === "minus" || operation === "multiply" || operation === "divide"):
        firstOperand = +display.value;
        mathOperation = operation;
        nagative = false;
        turn = 2;
        display.value = "";
        break;
      case ( operation === "changeValue"):
        negative = !negative;
        display.value = -display.value;
        break;
      case ( operation === "Pi"):
        // ! duplicated code
        if (!negative) {
          firstOperand = "3.14159265359";
        } else {
          firstOperand = "-3.14159265359";
        }
        display.value = firstOperand;
        break;
        // ! duplicated code

      case(operation === "="):
        firstOperand = display.value
        break;

      case ( operation === "clear"):
          display.value = "";
          firstOperand = null;
          secondOperand = null;
          break;
      case ( operation === "back"):
          display.value = display.value.slice(0, -1);
          break;
      case (operation === "dot"):
        if (display.value.includes(".")) {
          return
        } else {
          display.value +=".";
        }
        break;
    }
  } else if (turn === 2 && display.value === "") {
      switch(true) {
        case (operation === "plus" || operation === "minus" || operation === "multiply" || operation === "divide"):
          mathOperation = operation;
          break;
        case ( operation === "changeValue"):
          negative = !negative;
          break;
        case ( operation === "Pi"):
          // ! duplicated code
          if (!negative) {
            secondOperand = "3.14159265359";
          } else {
            secondOperand = "-3.14159265359";
          }
          display.value = secondOperand;
          break;
          // ! duplicated code
        // *
        case(operation === "="):
        if (mathOperation == "plus") {
          display.value = firstOperand + firstOperand;
        } else if(mathOperation == "minus") {
          display.value = "0";
        }
        else if( mathOperation =="multiply") {
          display.value = firstOperand**2;
        }
        else if( mathOperation == "divide") {
          display.value = 1;
        }
          console.log(turn, firstOperand, display.value);
          break;
        // ! duplicated code
        case ( operation === "clear"):
            turn = 1;
            display.value = "";
            firstOperand = null;
            secondOperand = null;
            break;
        // ! duplicated code
        case ( operation === "back"):
            break;
        case (operation === "dot"):
          display.value = "0."
          break;
      }
  } else if (turn === 2 && display.value !== "") {
    switch(true) {
      case (operation === "plus" || operation === "minus" || operation === "multiply" || operation === "divide"):
        calculation();
        firstOperand = +display.value;
        secondOperand = null;
        mathOperation = operation;
        break;
      case ( operation === "changeValue"):
        negative = !negative;
        break;
      case ( operation === "Pi"):
        // ! duplicated code
        if (!negative) {
          secondOperand = "3.14159265359";
        } else {
          secondOperand = "-3.14159265359";
        }
        display.value = secondOperand;
        break;
        // ! duplicated code

      case(operation === "="):
        calculation();
        console.log(turn, firstOperand, display.value);
        break;
      // ! duplicated code
      case ( operation === "clear"):
          turn = 1;
          display.value = "";
          firstOperand = null;
          secondOperand = null;
          break;
      // ! duplicated code
      case ( operation === "back"):
          display.value = display.value.slice(0, -1);
          break;
      case (operation === "dot"):
        if (display.value.includes(".")) {
          return
        } else {
          display.value +=".";
        }
        break;
    }
  }


  console.log(display.value, operation, turn);

  console.log(firstOperand, secondOperand);
}
