# FormulaJS

This is an interpreter for basic formulas, based on an original idea by
@tsalmon.

## Usage

    formula <file>
    formula <formula>

## Features

* Floats & integers, negative and positive numbers
* basic operations (`+`, `-`, `/`, `*`) and power (`^`)
* constants (`E`, `PI`)
* some syntaxic sugar (e.g. `(…)(…)` instead of `(…)*(…)`), various alternatives
  for some operations (e.g. `⋅` or `×` instead of `*`, `÷` instead of `/`).

## Examples

    formula -2+3                 # 1
    formula "((42-5)(12*3+2))^3" # 2779431416
    formula PI*1.5               # 4.71238898038469
