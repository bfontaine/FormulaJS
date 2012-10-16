
var constants = {
    E  : Math.E,
    PI : Math.PI
};

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
        // non computable formulas
    };

    this.add        = this.op.bind(this, function sum(a,b){return a+b});
    this.minus      = this.op.bind(this, function substraction(a,b){return a-b});
    this.times      = this.op.bind(this, function times(a,b){return a*b});
    this.pow        = this.op.bind(this, Math.pow.bind(Math));
    this.divided_by = this.op.bind(this, function divide(a,b){return a/b});

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

