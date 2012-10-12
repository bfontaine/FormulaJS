%lex
%%

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

/* … */
