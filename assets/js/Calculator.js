(function () {
    'use strict';
    
    var Calculator = (function () {
        var input; // should be kept private
        
        var Calculator = function () {};

        Calculator.prototype = {
            getInput: function () {
                return input;
            },

            setInput: function (value) {
                input = value;
            },

            isString: function (value) {
                return typeof value === 'string' ? true : false;
            },

            sanitize: function (value) {
                // check if input is a string
                if (this.isString(value)) {
                    // return a clean string, only containing 0-9, (, ), modulus and arithmetic
                    return value.replace(new RegExp(/[^0-9\.()%*/+-]/, 'g'), '');
                }

                return '';
            },

            hasNumbers: function (value) {
                var matches = value.match(/\d/g);

                return matches && 0 < matches.length ? true : false;
            },

            isBalanced: function (value) {
                // check for occurrences, variables are assigned null if no matches
                var opened = value.match(/\(/g),
                    closed = value.match(/\)/g);

                // check if there are any opening (
                if (opened) {
                    // check if has any )
                    if (closed) {
                        return opened.length === closed.length ? true : false;
                    }

                    return false;
                } else if (closed) { // checked already for opening (, check if has any )
                    return false;
                }

                // there are no ( or )
                return true;
            },

            evaluate: function (value) {
                // custom "eval" function
                if (this.isString(value)) {
                    return new Function('return ' + value)();
                }

                return '';
            },

            calculate: function (value, callback) {
                if (typeof value === 'undefined') {
                    value = this.getInput();
                } else {
                    this.setInput(value);
                }

                // sanitize the input
                var sanitizedValue = this.sanitize(value);

                // check if input has any numbers and the parentheses are balanced
                if (this.hasNumbers(sanitizedValue) && this.isBalanced(sanitizedValue)) {
                    this.setInput(sanitizedValue);

                    try {
                        // return the calculation if no error is thrown.
                        return this.evaluate(sanitizedValue);
                    } catch (err) {
                        console.warn('error, cannot calculate input: ' + sanitizedValue);
                    }
                }

                // no results, don't return a value
                return;
            }
        };

        return Calculator;
    }());

    if (Calculator) {
        window.Calculator = Calculator;
    }
}());