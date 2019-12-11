//                       Bugs ang problems
// 1. 0.1 +0.2    =>  вести округлення в ядро обчислень
// 2.  Потрібно реалізувати округлення значень до порядку максимальної кількості знаків дисплею
// 3. Багато коду дублюэться, деякі конструкції можна скоротити через switch caseб тернарний оператор,
//    уніфікуючих функцій

// UI
const display = document.querySelector("input.display");
const keypad = document.querySelector(".mainFunctions");

// Description of mathematical actions

/**
 * перший та другий операнд обчислень
 */
let firstOperand = {value: null, order: 1};
let secondOperand = {value: null, order: 2};
/**
 * суть метематичної операції
 */
let mathOperation;
/**
 * тригер що визначає знак числа
 */
let negative = false;
/**
 * параметр зо визначає чергу обробки змінних
 */
let turn = 1;

// Events
keypad.addEventListener('click', separator);

//______________________________________________Main

/**
 * separator - розподілювач вхідних данних на функціонаьні та числові
 * @param {*} event - подія передана з шаблону
 */
function separator (event) {
  event.stopPropagation()
  if (event.target.hasAttribute("data-number")) {
    addValue(event.target.dataset.number);
  } else if (event.target.hasAttribute("data-func")) {
    operator(event.target.dataset.func);
  }
}

/**
 * addValue - приймає чергове число з клавіатури і розподіляє до потрібної комірки пам'яті
 * @param {*} number - параметр що описує складову числа що набирається на клавіатурі
 */
function addValue(number) {
  if (turn === 1) {
    memoryControl(firstOperand, number);
  } else if(turn === 2) {
    memoryControl(secondOperand, number);
  }
  console.log({On_display: display.value, Stage: turn, v1: firstOperand.value, v2: secondOperand.value });
}

/**
 * - memoryControl - функція розподілювач, контролює створення змінних для обчислення
 * @param {*} memoryCell - об'єкт для збереження змінної для обчислень
 * @param {*} number - склабова числа змінної для обчислень
 */
function memoryControl (memoryCell, number) {
  if((memoryCell.value === null || (memoryCell.value.charAt(0) === "0" && memoryCell.value.charAt(1) !== "." )) && !negative) {
    console.log(`Умова вводу (перший знак), змінна №${memoryCell.order}, позитивна`);
    memoryCell.value = number;
    display.value  = memoryCell.value;
  } else
    if((memoryCell.value === null || (memoryCell.value.charAt(1) === "0" && memoryCell.value.charAt(2) !== "." )) && negative) {
    console.log(`Умова вводу (перший знак), змінна №${memoryCell.order}, негативна`);
    memoryCell.value = "-" + number;
    display.value  = memoryCell.value;
  } else {
      console.log(`Умова вводу (продовження числа), змінна №${memoryCell.order}`);
      memoryCell.value +=  number;
      display.value  = memoryCell.value;
  }
}


/**
 * calculation - ядро обчислень результатів
 */

function calculation() {
  if (mathOperation == "plus") {
    display.value = +firstOperand.value + (+secondOperand.value);
    firstOperand.value = display.value;
  } else if(mathOperation == "minus") {
    display.value = +firstOperand.value - (+secondOperand.value);
    firstOperand.value = display.value;
  }
  else if( mathOperation =="multiply") {
    display.value = +firstOperand.value * (+secondOperand.value);
    firstOperand.value = display.value;
  }
  else if( mathOperation == "divide") {
    display.value = +firstOperand.value / (+secondOperand.value);
    firstOperand.value = display.value;
  }
}

/**
 * operator - функція управління логікою математичних операторів
 * @param {*} operation - опс математичної дії
 */
function operator(operation) {
  //Поведінка функціональних клавіш при старі вводу першої змінної

  if (turn === 1 && (display.value === "" || display.value === "0") ) {
    console.log("Оператори фази старту вводу першої змінної");
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
        firstOperand.value = 0;
        mathOperation = operation;
        nagative = false;
        turn = 2;
        display.value = "";
        break;
      }
      case ( operation === "changeValue"):
          negative = !negative;
          if(negative && firstOperand.value === "0") {
            firstOperand.value = "-0";
            display.value = firstOperand.value;
          }
          break;

      case ( operation === "Pi"):
        // ! duplicated code
        if (!negative) {
          firstOperand.value = "3.14159265359";
        } else {
          firstOperand.value = "-3.14159265359";
        }
        display.value = firstOperand;
        break;
        // ! duplicated code
      case (operation === "="):
        firstOperand.value = "0";
        display.value = firstOperand.value;
        secondOperand.value = null;
        break;
      case (operation === "back"|| operation === "clear"):
        negative = false;
        display.value = "";
      case (operation === "dot"):
        if(!negative) {
          firstOperand.value = "0."
        } else {
          firstOperand.value = "-0.";
        }

        display.value = firstOperand.value;
        break;
    }
  } else
  //Поведінка функціональних клавіш при відомому значені першої змінної
  if (turn === 1 && display.value !== "") {
    console.log("Оператори фази відомої першої змінної до визначення мат. оператора");
    switch(true) {
      case (operation === "plus" || operation === "minus" || operation === "multiply" || operation === "divide"):
        mathOperation = operation;
        nagative = false;
        turn = 2;
        display.value = "";
        break;
      case ( operation === "changeValue"):
        negative = !negative;
        if(negative) {
          firstOperand.value = "-" + firstOperand.value
        } else {
          if(firstOperand.value.charAt(0) == "-") {
            firstOperand.value = firstOperand.value.slice(1)
          };
        }
        display.value = firstOperand.value;
        break;
      case ( operation === "Pi"):
        // ! duplicated code
        if (!negative) {
          firstOperand.value = "3.14159265359";
        } else {
          firstOperand.value = "-3.14159265359";
        }
        display.value = firstOperand.value;
        break;
        // ! duplicated code

      case(operation === "="):
        display.value = firstOperand.value
        break;

      case ( operation === "clear"):
          negative = false;
          display.value = "";
          firstOperand.value = null;
          break;
      case ( operation === "back"):
          firstOperand.value = firstOperand.value.slice(0, -1);
          display.value = firstOperand.value;
          break;
      case (operation === "dot"):
        if (firstOperand.value.includes(".")) {
          return
        } else {
          firstOperand.value +="."
          display.value = firstOperand.value;
        }
        break;
    }
  } else
  //Поведінка функціональних клавіш при старі вводу другої змінної
  if (turn === 2 && (secondOperand.value === "" || secondOperand.value === "0" || secondOperand.value === null)) {
    console.log("Оператори фази початку вводу другої змінної");
      switch(true) {
        case (operation === "plus" || operation === "minus" || operation === "multiply" || operation === "divide"):
          mathOperation = operation;
          break;

        case ( operation === "changeValue"):
          negative = !negative;
          if(negative && secondOperand.value === "0") {
            secondOperand.value = "-0";
            display.value = secondOperand.value;
          }
          break;

        case ( operation === "Pi"):
          // ! duplicated code
          if (!negative) {
            secondOperand.value = "3.14159265359";
          } else {
            secondOperand.value = "-3.14159265359";
          }
          display.value = secondOperand.value;
          break;

          // ! duplicated code
        case(operation === "="):
        if (mathOperation == "plus") {
          display.value = +firstOperand.value + +firstOperand.value;
          secondOperand.value = firstOperand.value;
          firstOperand.value = display.value;
        } else if(mathOperation == "minus") {
          display.value = 0;
          secondOperand.value = firstOperand.value;
          firstOperand.value = display.value;
        }
        else if( mathOperation =="multiply") {
          display.value = firstOperand.value ** 2;
          secondOperand.value = firstOperand.value;
          firstOperand.value = display.value;
        }
        else if( mathOperation == "divide") {
          display.value = 1;
          secondOperand.value = firstOperand.value;
          firstOperand.value = display.value;
        }
        console.log({stage: turn, do: mathOperation, firstOperand: firstOperand.value, display:display.value});
          break;
        // ! duplicated code
        case ( operation === "clear"):
            negative = false;
            turn = 1;
            display.value = "";
            firstOperand.value = null;
            secondOperand.value = null;
            break;
        // ! duplicated code
        case ( operation === "back"):
            break;
        case (operation === "dot"):
          secondOperand.value = "0."
          display.value = secondOperand.value;
          break;
      }
  } else
  // Поведінка функціональних клавіш з відомою другою змінною
  if (turn === 2 && secondOperand.value !== "" && secondOperand.value !== null) {
    console.log("Оператори фази 4");
    switch(true) {

      case (operation === "plus" || operation === "minus" || operation === "multiply" || operation === "divide"):
        calculation();
        secondOperand.value = null;
        mathOperation = operation;
        break;

      case ( operation === "changeValue"):
        negative = !negative;
        if(negative) {
          secondOperand.value = "-" + secondOperand.value
        } else {
          if(secondOperand.value.charAt(0) == "-") {
            secondOperand.value = secondOperand.value.slice(1)
          };
        }
        display.value = secondOperand.value;
        break;

      case ( operation === "Pi"):
        // ! duplicated code
        if (!negative) {
          secondOperand.value = "3.14159265359";
        } else {
          secondOperand.value = "-3.14159265359";
        }
        display.value = secondOperand.value;
        break;
        // ! duplicated code

      case(operation === "="):
        calculation();
        console.log({stage: turn, do: mathOperation, firstOperand: firstOperand.value, display:display.value});
        break;
      // ! duplicated code

      case ( operation === "clear"):
          turn = 1;
          display.value = "";
          firstOperand.value = null;
          secondOperand.value = null;
          break;
      // ! duplicated code
      case ( operation === "back"):
          secondOperand.value = secondOperand.value.slice(0, -1);
          display.value = secondOperand.value;
          break;
      case (operation === "dot"):
        if (secondOperand.value.includes(".")) {
          return
        } else {
          secondOperand.value +=".";
        }
        display.value = secondOperand.value;
        break;
    }
  }

  console.log({display: display.value, task: operation, stage: turn, a: firstOperand, b: secondOperand });

}
