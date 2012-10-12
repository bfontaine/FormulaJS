%lex
%%

\n+                     /* skip lines */
\s+                     /* skip spaces */

\b\d+?(?:[\.,]\d+)?\b   return 'NUMBER'

"("                     return 'OPEN_BRACKET'
")"                     return 'CLOSE_BRACKET'

\b[a-z]\b               return 'VARIABLE'

"+"                     return 'PLUS'
[-−]                    return 'MINUS'
[*×⋅]                   return 'TIMES' 
[/÷]                    return 'DIVIDE'
"^"                     return 'POW'

"¹"                     return 'POW1'
"²"                     return 'POW2'
"³"                     return 'POW3'

<<EOF>>                 return 'EOF'

.                       return 'INVALID'

/lex

%left 'PLUS' 'MINUS'
%left 'TIMES' 'DIVIDE'
%right 'POW'
%left 'POW1' 'POW2' 'POW3'

%start formula

%{
    var _f = require('./formulalib');
%}

%%

formula
  : expression EOF
      { 
        console.log($1.toString());
      }
  ;

value
    : number
        { $$ = $1 }
    | variable
        { $$ = $1 }
    ;

number
    : 'NUMBER'
        { $$ = +$1.replace(',', '.') }
    ;

variable
    : 'VARIABLE'
        { $$ = "$1" }
    ;

bracket_expression
    : 'OPEN_BRACKET' expression 'CLOSE_BRACKET'
        { $$ = ($2) }
    ;

expression
    : bracket_expression
        { $$ = $1 }
    
    | value
        { $$ = (new _f.Formula($1)) }

    | 'MINUS' expression
        { $$ = (new _f.Formula(0)).minus($2) }

    | expression 'PLUS' expression
        { $$ = $1.add($3) }
    
    | expression 'MINUS' expression
        { $$ = $1.minus($3) }
    
    | expression 'TIMES' expression
        { $$ = $1.times($3) }
    
    | expression 'DIVIDE' expression
        { $$ = $1.divided_by($3) }
    
    | expression 'POW' expression
        { $$ = $1.pow($3) }

    /* syntaxic sugars */

    /* A¹ → A */
    | expression 'POW1'
        { $$ = $1 }

    /* A² → A^2 */
    | expression 'POW2'
        { $$ = $1.pow(new _f.Formula(2)) }

    /* A³ → A^3 */
    | expression 'POW3'
        { $$ = $1.pow(new _f.Formula(3)) }

    /* A(…) → A*(…) */
    | value bracket_expression
        { $$ = (new _f.Formula($1)).times($2) }

    /* (…)(…) → (…)*(…) */
    | bracket_expression bracket_expression
        { $$ = $1.times($2) }
    ;

