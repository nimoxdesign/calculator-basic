(function () {
    'use strict';
    
    // initialize new Calculator
    var calculator = new Calculator();
    
    var calculatorModule = document.querySelector('.calculator.module'),
        // gather the controls into their respective variables
        calculatorFunctionalBtns = document.querySelectorAll('.btn-calculator--operator, .btn-calculator--number, .btn-calculator--seperator, .btn-calculator--parenthesis'),

        calculatorMinimize = document.getElementById('calculator-minimize'),
        calculatorMaximize = document.getElementById('calculator-maximize'),
        calculatorClose = document.getElementById('calculator-close'),
        
        calculatorInput = document.getElementById('calculator-input'),

        calculatorProcessor = document.getElementById('calculator-process'),
        calculatorClear = document.getElementById('calculator-clear'),

        calculatorErrors = document.getElementById('calculator-errors'),
        calculatorError = document.getElementById('calculator-error');

    // check if there are any buttons
    if (!~calculatorFunctionalBtns.length) {
        return;
    }
    
    // loop over each button, assigning a listener for click events
    calculatorFunctionalBtns.forEach(function (elem) {
        elem.addEventListener('click', function (ev) {
            // get the data-value
            var btnValue = ev.target.getAttribute('data-value');

            // concatenate the data-value with the input's value
            calculatorInput.value += btnValue;
        });
    });

    // listen if calculator should calculate
    calculatorProcessor.addEventListener('click', function (ev) {
        // set the input, just so it does not have to be passed to the calculator more than once
        calculator.setInput(calculatorInput.value);
        var result = calculator.calculate();

        // if the calculation failed, undefined is returned
        if (typeof result === 'undefined') {
            calculatorErrors.style.display = 'block';
            calculatorError.innerHTML = 'Error calculating: ' + calculator.getInput();
            calculatorInput.value = 'ERROR';

            return;
        }

        // calculation succeeded, make sure errors field is not displayed
        calculatorErrors.style.display = '';

        // replace the input's value with the new calculation
        calculatorInput.value = result;
    });

    // listen for clearing the calculator input
    calculatorClear.addEventListener('click', function (ev) {
        calculatorInput.value = '';
    });
        
    calculatorMinimize.addEventListener('click', function (ev) {
        calculatorModule.classList.remove('is-closed');
        calculatorModule.classList.remove('is-maximized');
        calculatorModule.classList.toggle('is-minimized');
    });
        
    calculatorMaximize.addEventListener('click', function (ev) {
        calculatorModule.classList.remove('is-closed');
        calculatorModule.classList.remove('is-minimized');
        calculatorModule.classList.toggle('is-maximized');
    });
        
    calculatorClose.addEventListener('click', function () {
        calculatorModule.classList.remove('is-minimized');
        calculatorModule.classList.remove('is-maximized');
        calculatorModule.classList.toggle('is-closed');
    });
}());
