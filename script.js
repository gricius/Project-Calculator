let result = document.getElementById("result");
let expression = "";

function calculate(value) {
    if (value === "=" || value === "Enter") {
        if (isValidExpression()) {
            evaluateExpression();
        }
    } else if (value === "C") {
        clearResult();
    } else if (value === "&larr;") {
        deleteLastChar();
    } else if (value === ".") {
        if (!expression.includes(".")) {
            expression += value;
            result.value = expression;
        }
    } else if (isOperator(value)) {
        if (!endsWithOperator() && expression !== "") {
            expression += value;
            result.value = expression;
        }
    } else {
        expression += value;
        result.value = expression;
    }
}

function isValidExpression() {
    return expression !== "" && !endsWithOperator();
}


function evaluateExpression() {
    try {
        result.value = eval(expression);
        expression = "";
    } catch (error) {
        result.value = "Error";
    }
}

function clearResult() {
    result.value = "";
    expression = "";
}

function deleteLastChar() {
    expression = expression.slice(0, -1);
    result.value = expression;
}

function isOperator(value) {
    return value === "+" || value === "-" || value === "*" || value === "/";
}

function endsWithOperator() {
    return isOperator(expression.slice(-1));
}

function handleKeyboardInput(event) {
    const key = event.key;
    if (key >= "0" && key <= "9") {
        calculate(key);
    } else if (isOperator(key)) {
        if (!endsWithOperator() && expression !== "") {
            calculate(key);
        }
    } else if (key === "=" || key === "Enter") {
        evaluateExpression();
    } else if (key === "Backspace") {
        deleteLastChar();
    } else if (key === "Escape") {
        clearResult();
    } else if (key === ".") {
        if (!expression.includes(".")) {
            calculate(key);
        }
    }
}

// Event listeners
document.addEventListener("keydown", handleKeyboardInput);
