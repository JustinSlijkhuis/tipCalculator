/* HTML tag variabeles */
const total = document.getElementById('total')
const tipButtons = document.getElementById('tips')
const tip = document.getElementById('tip')
const bill = document.getElementById('bill')
const people = document.getElementById('people')
const reset = document.getElementById('reset')
const custom = document.getElementById('custom')


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
    resetVariabeles()
    setCosts()
})


/* variabeles */
let value = 0
let valueTip = 0
let percentage = 0
let numberOfPeople = 0
let billValue = 0


/* reset the variabeles */
const resetVariabeles = _ => {
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


/* event listeners for input field */
bill.addEventListener('input', event => {
    value = bill.value
    setCosts(event.srcElement.id)
})


people.addEventListener('input', event => {
    numberOfPeople = people.value
    setCosts(event.srcElement.id)
})


const inputLength = 5
/* check for setting prices/costs */
const setCosts = id => {
    if(id === "people") {
        if(isNaN(numberOfPeople) || numberOfPeople === "" || numberOfPeople < 0) {
            people.classList.remove('succes')
            if(numberOfPeople === "") {
                people.classList.remove('warning')
            } else {
                people.classList.add('warning')
            }
            numberOfPeople = 0
            setValues()
        } else {
            people.classList.remove('warning')
            people.classList.add('succes')
            setValues()
        }
    }

    if(id === "bill") {
        if(isNaN(value) || value === "" || value < 0) {
            bill.classList.remove('succes')
            if(value === "") {
                bill.classList.remove('warning')
            } else {
                bill.classList.add('warning')
            }
            setValuesZero()
        } else {
            bill.classList.remove('warning')
            bill.classList.add('succes')
            setValues()
        }
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
            if(isNaN(tipButton.value) || tipButton.value === "" || percentage < 0) {
                percentage = 0
                setValuesZero()
            } else {
                setValues()
            }
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


/* get percentage */
const getPercentageButton = tipButton => {
    let percentageString = tipButton.innerHTML
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
    total.innerHTML = '$0.00'
    tip.innerHTML = '$0.00'
}

const setValues = _ => {
    calculateTip()
    calculateBill()
    tip.innerHTML = `$${valueTip}`
    total.innerHTML = `$${billValue}`
}