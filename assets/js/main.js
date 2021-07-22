const billInput = document.getElementById('bill');
const tipBtn = document.querySelectorAll('.percentBtn');
const tipCustom = document.querySelector('.percentCustom');
const peopleInput = document.getElementById('people');
const errorMsg = document.querySelector('.error-msg');
const results = document.querySelectorAll('.screenValue');
const resetBtn = document.querySelector('.resetBtn');


let billValue = 0.0; // Starter value of bill input
let tipValue = 0.15; // Starter value of tip btn
let peopleValue = 1; // Starter value of number of people

function validFloat(k) {
    var regex = /^[0-9]*\.?[0-9]*$/;
    return k.match(regex);
}

function validInt(k){
    var regex = /^[0-9]*$/;
    return k.match(regex);
}

// Bill input change ',' to '.' and regex
billInput.addEventListener('input', function valueofBill() {
    if(billInput.value.includes(',')) {
        billInput.value = billInput.value.replace(',', '.');
    }
    if(!validFloat(billInput.value)) {
        billInput.value = billInput.value.substring(0, billInput.value.length-1);
    }

    billValue = parseFloat(billInput.value);
    calculateTip();
})

// tip btn toggle active when is clicked
function handleClick(e){
    tipBtn.forEach(btn => {
        btn.classList.remove('btn-active');

        if(e.target.innerHTML == btn.innerHTML) {
            btn.classList.add('btn-active');
            tipValue = parseFloat(btn.innerHTML)/100;
        }
    })

    tipCustom.value = '';
    calculateTip();
}
tipBtn.forEach(btn => {
    btn.addEventListener('click', handleClick);
});

// custom tip btn regex & active state
tipCustom.addEventListener('input', function valueOfCustomTip() {
    if(!validInt(tipCustom.value)) {
        tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length-1)
    }
    tipValue = parseFloat(tipCustom.value/100);

    tipBtn.forEach(btn => {
        btn.classList.remove('btn-active');
    })
    if(tipCustom.value !== ''){
        calculateTip();
    }
})

// people input regex and toggle error message
peopleInput.addEventListener('input', function valueOfPeople() {
    if(!validInt(peopleInput.value)) {
        peopleInput.value = peopleInput.value.substring(0, peopleInput.value.length-1)
    }
    peopleValue = parseFloat(peopleInput.value);

    if(peopleValue <= 0){
        errorMsg.style.opacity = 1;
        peopleInput.classList.add('error-border');
    } else {
        errorMsg.style.opacity = 0;
        peopleInput.classList.remove('error-border');
    }

    calculateTip();
})

// calculate & innerHtml results
function calculateTip() {
    if(peopleValue >= 1) {
        let tipResult = billValue * tipValue / peopleValue;
        let totalResult = billValue * (tipValue + 1) / peopleValue;
        results[0].innerHTML = '$' + tipResult.toFixed(2); // Tip amount/pers
        results[1].innerHTML = '$' + totalResult.toFixed(2); // Total/pers
    }
}

// reset btn 
resetBtn.addEventListener('click', function reset(){
    billInput.value = '0.0';
    tipBtn[2].click();
    peopleInput.value = '1';
    errorMsg.style.opacity = 0;
    peopleInput.classList.remove('error-border');
    results[0].innerHTML = '$0.0';
    results[1].innerHTML = '$0.0';

})

