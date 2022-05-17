/* HTML tag variables */
const total = document.getElementById('total')
const tipButtons = document.getElementById('tips')
const tip = document.getElementById('tip')
const bill = document.getElementById('bill')
const people = document.getElementById('people')
const reset = document.getElementById('reset')
const custom = document.getElementById('custom')

//warnings
const warningBill = document.getElementById('warning-bill')
const warningTip = document.getElementById('warning-tip')
const warningPeople = document.getElementById('warning-people')


/* warnings */
const warn = (type, warning) => {
    let input = eval("warning" + type)
    input.textContent = warning
}


/* page refresh actions */
window.onload = function () {
    bill.value = ''
    people.value = ''
    custom.value = ''
}


/* click reset even listener */
reset.addEventListener('click', _ => {
    removeBackgroundButton()
    resetValues()
    resetVariables()
    setValues()
    removeWarnings()
})


/* variables */
let value = 0
let valueTip = 0
let percentage = 0
let numberOfPeople = 0
let billValue = 0


/* reset the variables */
const resetVariables = _ => {
    value = 0
    valueTip = 0
    percentage = 0
    numberOfPeople = 0
    billValue = 0
}


const resetValues = _ => {
    bill.value = ''
    people.value = ''
    custom.value = ''
    bill.classList.remove('warning')
    people.classList.remove('warning')
    bill.classList.remove('succes')
    people.classList.remove('succes')
}


const removeWarnings = _ => {
    warn("Bill", "")
    warn("People", "")
    warn("Tip", "")
}


/* event listeners for input field */
bill.addEventListener('input', event => {
    value = bill.value
    setCosts(event.srcElement.id)
})


people.addEventListener('input', event => {
    numberOfPeople = people.value
    setCosts(event.srcElement.id)
})


/* check for setting prices/costs */
const setCosts = id => {
    if(id === "people") {
        securityCheckPeople()
    }

    if(id === "bill") {
        securityCheckBill()
    }
}


/* button actions */
for(let index = 0; index < tipButtons.children.length; index++) {
    let tipButton = tipButtons.children[index]
    /* adds event listeners to text input */
    if(tipButton.placeholder == "Custom") {
        ['input', 'click'].forEach(event => tipButton.addEventListener(event, _ => {
            changeButtonBackground(tipButton)
            percentage = getPercentageCustom(tipButton)
            securityCheckCustom(tipButton)
        }))
    } else {
        /* adds event listener to button */
        tipButton.addEventListener('click', _ => {
            changeButtonBackground(tipButton)
            percentage = getPercentageButton(tipButton)
            setValues()
        })
    }
}




/* security checks */
const inputLengthBill = 99999
const inputLengthPeople = 99
const securityCheckCustom = tipButton => {
    if(isNaN(tipButton.value) || tipButton.value === "" || percentage < 0 || percentage > 100) {
        if(percentage > 100) {
            tipButton.value = percentage.slice(0, -1)
            percentage = tipButton.value
            setValues()
            warn("Tip", "Max 100%")
            return
        }
        percentage = 0
        if(tipButton.value === "") {
            warn("Tip", "")
            setValues()
        } else {
            warn("Tip", "This is not a valid number!")
            setValuesZero()
        }
    } else {
        warn("Tip", "")
        setValues()
    }
}



const securityCheckBill = _ => {
    const splitArrayBill = Number(bill).toString().split('.')
    if(isNaN(value) || value === "" || value < 1 || value > inputLengthBill) {
        bill.classList.remove('succes')
        bill.classList.add('warning')

        if(value == 0 && value !== "") {
            warn("Bill", "Can't be zero")
            return
        }

        if(value > inputLengthBill) {
            warn("Bill", `Max ${inputLengthBill}!`)
            bill.value = bill.value.slice(0, -1)
            value = bill.value
            return
        }

        if(value === "") {
            bill.classList.remove('warning')
            warn("Bill", "")
        } else {
            warn("Bill", "This is not a valid number!")
        }

        setValuesZero()
    } else {
        bill.classList.remove('warning')
        bill.classList.add('succes')
        warn("Bill", "")
        setValues()
    }
}



const securityCheckPeople = _ => {
    if(isNaN(numberOfPeople) || numberOfPeople === "" || numberOfPeople < 1 || numberOfPeople > inputLengthPeople) {
        people.classList.remove('succes')
        people.classList.add('warning')

        if(numberOfPeople == 0 && numberOfPeople !== "") {
            warn("People", "Can't be zero")
            return
        }

        if(numberOfPeople > inputLengthPeople) {
            warn("People", `Max ${inputLengthPeople}!`)
            people.value = numberOfPeople.slice(0, -1)
            return
        }

        if(numberOfPeople === "") {
            people.classList.remove('warning')
            warn("People", "")
        } else {
            warn("People", "This is not a valid number!")
        }

        numberOfPeople = 0
        setValues()
    } else {
        people.classList.remove('warning')
        people.classList.add('succes')
        warn("People", "")
        setValues()
    }
}



/* get percentage */
const getPercentageButton = tipButton => {
    let percentageString = tipButton.textContent
    return percentageString.slice(0, -1)
}

const getPercentageCustom = tipButton => {
    return tipButton.value
}


/* background button */
const changeButtonBackground = tipButton => {
    removeBackgroundButton()
    tipButton.classList.add('button-selected')
}


const removeBackgroundButton = _ => {
    for(let index = 0; index < tipButtons.children.length; index++) {
        tipButtons.children[index].classList.remove('button-selected')
    }
}


/* calculations */
const zeroValue = 0
const calculateTip = _ => {
    if(numberOfPeople == 0) {
        valueTip = zeroValue.toFixed(2)
    } else {
        let sumTip = value / 100 * percentage / numberOfPeople
        valueTip = sumTip.toFixed(2)
    }
}

const calculateBill = _ => {
    if(numberOfPeople == 0) {
        billValue = zeroValue.toFixed(2)
    } else {
        let sumBill = value / numberOfPeople + +valueTip
        billValue = sumBill.toFixed(2)
    }
}


/* set values */
const setValuesZero = _ => {
    total.textContent = '$0.00'
    tip.textContent = '$0.00'
}

const setValues = _ => {
    if(isNaN(value) || isNaN(numberOfPeople) || isNaN(percentage)) {
        return
    }
    calculateTip()
    calculateBill()
    tip.textContent = `$${valueTip}`
    total.textContent = `$${billValue}`
}