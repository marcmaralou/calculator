const numbers = document.querySelectorAll("[data-numbers]") // taking buttons made and storing them into their respective variables
const operations = document.querySelectorAll("[data-operations]")
const equals = document.querySelector("[data-equals]")
const del = document.querySelector("[data-delete]")
const allClear = document.querySelector("[data-allClear]")
const previousOperandText = document.querySelector("[data-previousOperand]")
const currentOperandText = document.querySelector("[data-currentOperand]")

class Calculator {
    constructor (previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.clear() // clearing calculator when it's made, without this, first number is undefined
    }

    clear() {
        this.currentOperand = "" // sets currentOperand to nothing
        this.previousOperand = "" // sets previousOperand to nothing
        this.operation = undefined // sets operation to nothing
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1) // takes current operand and slices off the last element
    }

    append(number) {
        if (number == "." && this.currentOperand.includes(".")) { // checking if number has "." to avoid putting multiple
            return
        }
        else if (this.currentOperand == "" && number == ".") { // if the currentOperand is empty, and you click .
            return this.currentOperand = "0" + number.toString() // returns 0. for aesthetic reasons
        }
        else {
            return this.currentOperand = this.currentOperand.toString() + number.toString() // convert to string to concatenate
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand == "") { // if there is no current operand, do nothing
            return
        }
        if (this.previousOperand !== "") { // if the previous operand is not empty, then compute previous operation before moving on to new one
            this.compute()
        }
        this.operation = operation // operation argument is established so it can be used
        this.previousOperand = this.currentOperand // setting previous operand to current operand
        this.currentOperand = "" // clearing out current operand
    }

    compute() {
        let computation // result of compute function
        const previous = parseFloat(this.previousOperand) // converting to string then to float
        const current = parseFloat(this.currentOperand) // converting to string then to float
        if (isNaN(previous) || isNaN(current)) { // if there is no number (true), then return to not run function
            return
        }
        switch (this.operation) { // allowing to do bunch of if statements on same object
            case "÷":
                computation = previous / current
                break
            case "x":
                computation = previous * current
                break
            case "-":
                computation = previous - current
                break
            case "+":
                computation = previous + current
                break
            default:
                return
        }
        this.currentOperand = computation // sets result to currentOperand
        this.operation = undefined // operation is undefined now that it is conmplete
        this.previousOperand = "" // clears out previousOperand
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString() // converting number to string
        const integerDigits = parseFloat(stringNumber.split(".")[0]) // taking string and splitting it at decimal, taking array before .
        const decimalDigits = stringNumber.split(".")[1] // same thing as above, but taking array after .
        let integerDisplay
        if (isNaN(integerDigits)) { // if array before . is NaN, then there's nothing there
            integerDisplay = "" // set to empty string since nothing is there
        }
        else {
            integerDisplay = integerDigits.toLocaleString("en", { // converting number to the english standard of numbers with commas
                maximumFractionDigits: 0 // not decimal places after this number since it's everything before .
            })
        }
        if (decimalDigits != null) { // if there are decimal places, then do this
            return `${integerDisplay}.${decimalDigits}` // returning the number
        }
        else {
            return integerDisplay // if there are no decimal places, then return the integerDispaly established earlier
        }
    }

    update() {
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand) // passing in currentOp to format it right, then showing it
        if (this.operation != null) { // if there is a selected operation
            return this.previousOperandText.innerText = `${this.previousOperand} ${this.operation}` // put number with operation on top
        }
        else { // if this.operation does not exist
            return this.previousOperandText.innerText = "" // show nothing
        }
    }
}

const calculator = new Calculator(previousOperandText, currentOperandText) // making a new calculator

numbers.forEach(number => { // for each number button
    number.addEventListener("click", () => { // on click for each one run these functions
        calculator.append(number.innerText) // inner text of each number is used as argument for append function
        calculator.update() // updating display
    })
})

operations.forEach(button => { // for each operation button
    button.addEventListener("click", () => { // fun these functions on click
        calculator.chooseOperation(button.innerText) // inner text of operation button is passed into function
        calculator.update() // updating display
    })
})

equals.addEventListener("click", equals => { // waiting for click on equals button
    calculator.compute() // on click runs compute function in calc class
    calculator.update() // updating display
})

allClear.addEventListener("click", allClear => { // waiting for click on ac button
    calculator.clear() // on click runs clear function in calc class
    calculator.update() // updating display
})

del.addEventListener("click", del => { // waiting for click on delete button
    calculator.delete() // on click run delete function
    calculator.update() // updating display
})