var formula = require('../formula');

describe("Single positive number", function() {

    it('should be 0', function() {
        expect(formula.parse('0')).toEqual('0');
    });

    it('should be 1', function() {
        expect(formula.parse('1')).toEqual('1');
    });

    it('should be 2', function() {
        expect(formula.parse('42')).toEqual('42');
    });
});

describe("Simple addition", function() {

    it('should be 0', function() {
        expect(formula.parse('0+0')).toEqual('0');
    });

    it('should be 1', function() {
        expect(formula.parse('1+0')).toEqual('1');
        expect(formula.parse('0+1')).toEqual('1');
    });

    it('should be 2', function() {
        expect(formula.parse('1+1')).toEqual('2');
        expect(formula.parse('0+2')).toEqual('2');
        expect(formula.parse('2+0')).toEqual('2');
    });

    it('should be 42', function() {
        expect(formula.parse('21+21')).toEqual('42');
        expect(formula.parse('0+42')).toEqual('42');
        expect(formula.parse('42+0')).toEqual('42');
        expect(formula.parse('41+1')).toEqual('42');
        expect(formula.parse('25+17')).toEqual('42');
    });

});

describe("Simple substraction", function() {

    it('should be 0', function() {
        expect(formula.parse('0-0')).toEqual('0');
        expect(formula.parse('0−0')).toEqual('0');
    });

    it('should be 1', function() {
        expect(formula.parse('1-0')).toEqual('1');
    });

    it('should be 2', function() {
        expect(formula.parse('3-1')).toEqual('2');
        expect(formula.parse('2-0')).toEqual('2');
    });

    it('should be 42', function() {
        expect(formula.parse('43-1')).toEqual('42');
        expect(formula.parse('42-0')).toEqual('42');
        expect(formula.parse('100-58')).toEqual('42');
    });

    it('should be -5', function() {
        expect(formula.parse('0-5')).toEqual('-5');
        expect(formula.parse('5-10')).toEqual('-5');
    });

});

describe("Simple multiplication", function() {

    it('should be 0', function() {
        expect(formula.parse('0*0')).toEqual('0');
        expect(formula.parse('0×0')).toEqual('0');
        expect(formula.parse('0⋅0')).toEqual('0');
    });

    it('should be 1', function() {
        expect(formula.parse('1*1')).toEqual('1');
    });

    it('should be 2', function() {
        expect(formula.parse('2*1')).toEqual('2');
        expect(formula.parse('1*2')).toEqual('2');
    });

    it('should be 42', function() {
        expect(formula.parse('21*2')).toEqual('42');
        expect(formula.parse('7*6')).toEqual('42');
        expect(formula.parse('3*14')).toEqual('42');
    });

    it('should be -5', function() {
        expect(formula.parse('1*-5')).toEqual('-5');
        expect(formula.parse('-5*1')).toEqual('-5');
    });

});

describe("Simple division", function() {

    it('should be 0', function() {
        expect(formula.parse('0/1')).toEqual('0');
        expect(formula.parse('0/45')).toEqual('0');
        expect(formula.parse('0÷45')).toEqual('0');
    });

    it('should be 1', function() {
        expect(formula.parse('1/1')).toEqual('1');
        expect(formula.parse('3/3')).toEqual('1');
    });

    it('should be 2', function() {
        expect(formula.parse('2/1')).toEqual('2');
        expect(formula.parse('4/2')).toEqual('2');
        expect(formula.parse('26/13')).toEqual('2');
    });

    it('should be 42', function() {
        expect(formula.parse('84/2')).toEqual('42');
    });

    it('should be -5', function() {
        expect(formula.parse('-5/1')).toEqual('-5');
        expect(formula.parse('10/-2')).toEqual('-5');
    });

});

describe("Simple power", function() {

    it('should be 1', function() {
        expect(formula.parse('1^1')).toEqual('1');
        
        expect(formula.parse('1¹')).toEqual('1');
        expect(formula.parse('1²')).toEqual('1');
        expect(formula.parse('1³')).toEqual('1');

        expect(formula.parse('1^99')).toEqual('1');
        expect(formula.parse('0^0')).toEqual('1');
        expect(formula.parse('99^0')).toEqual('1');
    });

    it('should be 2', function() {
        expect(formula.parse('2^1')).toEqual('2');
    });

    it('should be 4', function() {
        expect(formula.parse('2^2')).toEqual('4');
    });

    it('should be 32', function() {
        expect(formula.parse('2^5')).toEqual('32');
    });

    it('should be -5', function() {
        expect(formula.parse('-5^1')).toEqual('-5');
    });

});

describe("Multiple operations", function() {
    
    it('should be 1', function() {
        expect(formula.parse('1*1*1*1*1*1')).toEqual('1');
        expect(formula.parse('1/1*1/1*1+1-1')).toEqual('1');
        expect(formula.parse('1^1*1^1*1^1')).toEqual('1');
        expect(formula.parse('42/42+12-8-4')).toEqual('1');
    });

    it('should be 4', function() {
        expect(formula.parse('2^1+2^1')).toEqual('4');
        expect(formula.parse('2.5-0.5*3')).toEqual('1');
        expect(formula.parse('1^99+41-17/17+1')).toEqual('42');
    });
});

describe("Operations with float numbers", function() {
    
    it('should be 2.5', function() {
        expect(formula.parse('0+2.5')).toEqual('2.5');
        expect(formula.parse('0+2,5')).toEqual('2.5');
        expect(formula.parse('0.5+2')).toEqual('2.5');
        expect(formula.parse('2.5')).toEqual('2.5');
        expect(formula.parse('1⋅2+0.5')).toEqual('2.5');
    });

    it('should be 3.5', function() {
        expect(formula.parse('7/2')).toEqual('3.5');
    });
});

describe("Operations with brackets", function() {

    it ('should be 1', function() {
        expect(formula.parse('(1+1)/(2+1-1)')).toEqual('1');
        expect(formula.parse('(1)/(1)')).toEqual('1');
        expect(formula.parse('((1²+2)(1+1))/6')).toEqual('1');
    });

    it ('should be 42', function() {
        expect(formula.parse('((1+1)/(2+1-1))*42')).toEqual('42');
        expect(formula.parse('42(1)')).toEqual('42');
        expect(formula.parse('(20+1)⋅2')).toEqual('42');
        expect(formula.parse('((1+42)⋅(18-5))/13-1')).toEqual('42');
    });
});

describe("Operations with constants", function() {
    
    expect(formula.parse('PI')).toEqual(''+Math.PI);
    expect(formula.parse('2*PI')).toEqual(''+(2*Math.PI));

    expect(formula.parse('E')).toEqual(''+Math.E);
    expect(formula.parse('E+1')).toEqual(''+(Math.E+1));
});
