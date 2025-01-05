// Стек — це структура даних, у якій доступ до елементів обмежений таким чином, що лише останній доданий 
// елемент можна видалити (цей принцип називається LIFO — (Last In, First Out). Це дуже схоже на стопку 
// книг: ви можете покласти книгу на верхівку стопки (операція push), але ви не можете видалити 
// книгу знизу або середини стопки без зняття всіх книг, що знаходяться вище (операція pop).
  

class Stack {
    constructor() {
        this.stack = [] 
    }

		// Додавання елемента до стеку
    push(item) {
        this.stack.push(item);
    }

		// Видалення елемента зі стеку
    pop() {
        if (this.stack.length < 1) {
            return null;
        }
        return this.stack.pop();
    }

		// Перевірка, чи стек порожній
    isEmpty() {
        return this.stack.length === 0;
    }

		// Перегляд верхнього елемента стеку без його видалення
    peek() {
        if (!this.isEmpty()) {
            return this.stack[this.stack.length - 1];
        }
    }
}


// Задача 1, на перевірку балансу дужок

function isBalancedBrackets(input) {
  const stack = new Stack(); // Створюємо стек
  const openBrackets = "({["; // Відкриті дужки
  const closeBrackets = ")}]"; // Закриті дужки
  const matches = { ")": "(", "}": "{", "]": "[" }; // Пари дужок

  for (let char of input) { // Перебираємо кожен символ у вхідному рядку
    if (openBrackets.includes(char)) { // Якщо символ є відкритою дужкою
      stack.push(char); // Додаємо в стек
    } else if (closeBrackets.includes(char)) { // Якщо символ є закритою дужкою
      if (stack.isEmpty() || stack.pop() !== matches[char]) { // Перевіряємо, чи стек порожній або чи він збалансований
        return false; // Якщо ні, повертаємо false
      }
    }
  }

  return stack.isEmpty(); // Якщо стек порожній, дужки збалансовані
}

console.log(isBalancedBrackets("()")); // true
console.log(isBalancedBrackets("()[]{}")); // true
console.log(isBalancedBrackets("([)]")); // false


// Задача 2, розрахунок виразу за допомогою стеку
function rpn_function(input) {
  const stack = new Stack(); // Створюємо стек
  const operators = ["+", "-", "*", "/"]; // Оператори
  const operands_and_operators = input.split(" "); // Розділяємо вхідний рядок на операнди та оператори
  console.log('operators', operators) 
  console.log('operands', operands_and_operators)

  for (const operand_or_operator of operands_and_operators) { // Перебираємо операнди
    if (!isNaN(operand_or_operator)) { // Якщо операнд є оператором
      stack.push(+operand_or_operator); // Додаємо операнд до стеку
    } else if (operators.includes(operand_or_operator)) { // Якщо операнд є оператором
      const operand1 = stack.pop(); // Отримуємо перший операнд
      const operand2 = stack.pop(); // Отримуємо другий операнд
    

      let result; //  результат
      switch (operand_or_operator) { // Обчислюємо результат
        case "+": // Додавання
          result = operand2 + operand1; // Додаємо операнди
          break;
        case "-": // Віднімання
          result = operand2 - operand1; // Віднімаємо операнди
          break;
        case "*": // Множення
          result = operand2 * operand1; // Множимо операнди
          break;
        case "/": // Ділення
          result = operand2 / operand1; // Ділимо операнди
          break;
      }

      stack.push(result); // Додаємо результат до стеку
    }
  }

  return stack.pop(); // Повертаємо результат
}

console.log(rpn_function("2 3 + 5 *")) // 25


// Задача 3, перевірка арифметичного виразу
function isArithmeticExpressionValid(expression) {
  const stack = new Stack(); // Створюємо стек
  const openBrackets = "({["; // Відкриті дужки
  const closeBrackets = ")}]"; // Закриті дужки
  const matches = { ")": "(", "}": "{", "]": "[" }; // Пари дужок
  const operators = ["+", "-", "*", "/"]; // Оператори

  let lastChar = ''; // Для перевірки операторів

  for (let i = 0; i < expression.length; i++) { // Перебираємо кожен символ у вхідному рядку
    let char = expression[i];

    // Перевірка на оператори на початку або після іншого оператора
    if (operators.includes(char)) {
      if (i === 0 || operators.includes(lastChar)) {
        return false; // Якщо оператор на початку або після іншого оператора
      }
    }

    // Перевірка на закриті дужки, чи є відповідна відкрита
    if (closeBrackets.includes(char)) {
      if (stack.isEmpty() || stack.pop() !== matches[char]) {
        return false;
      }
    }

    // Перевірка на відкриті дужки
    if (openBrackets.includes(char)) {
      stack.push(char);
    }

    lastChar = char; // Оновлюємо останній символ
  }

  // Повертаємо true, якщо стек порожній (дужки збалансовані)
  return stack.isEmpty();
}

console.log(isArithmeticExpressionValid("3 + (2 * 5)"));  // true
console.log(isArithmeticExpressionValid("3 + (2 * 5"));   // false
console.log(isArithmeticExpressionValid("(3 + 2) * 5)")); // false
console.log(isArithmeticExpressionValid("3 + 2 * 5"));    // true