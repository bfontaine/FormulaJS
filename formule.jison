%lex
%%

/* inspired of:
        http://timothee-bernard.fr/creons-notre-propre-langage-et-son-compilateur-javascript.html */

\n+                     /* skip lines */
\s+                     /* skip spaces */

\b[0-9]+?\b             return 'NUMBER'

"("                     return 'OPEN_BRACKET'
")"                     return 'CLOSE_BRACKET'

\b[a-z]\b               return 'VARIABLE'

"+"                     return 'PLUS'
[-−]                    return 'MINUS'
[*×⋅]                   return 'TIMES' 
[/÷]                    return 'DIVIDE'
"^"                     return 'POW'

<<EOF>>                 return 'EOF'

.                       return 'INVALID'

/lex

%left 'PLUS' 'MINUS'
%left 'TIMES' 'DIVIDE'
%left 'POW'

%start formule

%%

formule
  : expression EOF
      { 
        var fs = require('fs');

        var file_name = process.argv.slice(2) + ".js";

        var content = "var _f = require('./formulelib');console.log("+$1+".toString());";

        fs.writeFile(file_name, content, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("Success, saved in "+ file_name + ".");
            }
        }); 

        return $1; 
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
        { $$ = $1 }
    ;

variable
    : 'VARIABLE'
        { $$ = '"' + $1 + '"' }
    ;

expression
    : 'OPEN_BRACKET' expression 'CLOSE_BRACKET'
        { $$ = '(' + $2 + ')' }
    
    | value
        { $$ = '(new _f.Formule(' + $1 + '))' }
    
    | expression 'PLUS' expression
        { $$ = $1 + ".add(" + $3 + ")" }
    
    | expression 'MINUS' expression
        { $$ = $1 + ".minus(" + $3 + ")" }
    
    | expression 'TIMES' expression
        { $$ = $1 + ".times(" + $3 + ")" }
    
    | expression 'DIVIDE' expression
        { $$ = $1 + ".divided_by(" + $3 + ")" }
    
    | expression 'POW' expression
        { $$ = $1 + ".pow(" + $3 + ")" }
    ;

