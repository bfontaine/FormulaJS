/**
 * FormulaLib.js – This file is part of FormulaJS
 *
 * Author: Baptiste Fontaine
 * Licence: MIT
 * URL: https://github.com/bfontaine/FormulaJS
 *
 * This contains the standard library of FormulaJS, the parser/interpreter
 * cannot work without it.
 *
 **/

var constants = {
    E  : Math.E,
    PI : Math.PI
};

var ops = {
    sum       : function (a,b) { return a+b },
    substract : function (a,b) { return a-b },
    times     : function (a,b) { return a*b },
    divide    : function (a,b) { return a/b },

    pow       : Math.pow.bind(Math)
};

/* 
 * When a formula has one or more unknown values in it,
 * this is used as a (binary) tree of operations to represent it,
 * e.g.:
 *    x+2:
 *         ops.sum
 *        /   \
 *       x     2
 */
var Operation = function(op, left, right) {
    if ((left.value !== undefined) && (right.value !== undefined)) {
        return new Formula(op(left, right));
    }

    this.is_operation = true;

    this.op = op;
    this.left = left;
    this.right = right;

    //TODO
};

/*
 * Formula – The main object of the library. Only this object is exported.
 *
 * cst: true if `arg` is a constant
 */
var Formula = function(arg, cst) {

    this.is_formula = true;

    if (cst && arg in constants) {
        arg = constants[arg];
    }

    var number   = 'number',
        constant = 'constant',
        variable = 'variable';

    if (typeof arg === 'number') {
        this.type  = number;
        this.value = arg;
        this.name  = ''+arg;
    }
    else if (typeof arg === 'string') {
        this.type  = cst ? constant : variable;
        this.value = undefined;
        this.name  = arg;
    }
    else if ((typeof arg === 'object') && arg.is_formula) {
        for (var key in arg) {
            if (arg.hasOwnProperty(key)) {
                this[key] = arg[key];
            }
        }
    }
    else {
        throw new Error(''+arg+" is not a valid formula.");
    }

    this.op = function op(fn, other) {
        if ((this.value !== undefined) && (other.value !== undefined)) {
            this.value = fn(this.value, other.value);
            return this;
        }


        // TODO use a tree to store variables & numbers, i.e.
        // non computable formulas (cf Operation)
    };

    this.add        = this.op.bind(this, ops.sum);
    this.minus      = this.op.bind(this, ops.substract);
    this.times      = this.op.bind(this, ops.times);
    this.pow        = this.op.bind(this, ops.pow);
    this.divided_by = this.op.bind(this, ops.divide);

    this.compute = function compute() {
        if (this.type === 'number')
            return this.value;

        return NaN; //TODO
    };

    this.toString = function toString() {
        // TODO
        return ''+this.compute();
    }

};

if (typeof exports !== 'undefined') {
    exports.Formula = Formula;
} else {
    window.Formula = Formula;
}

