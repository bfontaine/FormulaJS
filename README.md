FormulaJS
=========

This is an interpreter for basic formulas, based on an original idea by
[@tsalmon](//github.com/tsalmon/mybadmaths).

Install
-------

```sh
(sudo) npm install formula    # local
(sudo) npm install -g formula # global
```

Usage
-----

```sh
formula <file>
formula <formula>
```

Features
--------

* Floats & integers, negative and positive numbers
* basic operations (`+`, `-`, `/`, `*`) and power (`^`)
* constants (`E`, `PI`)
* some syntaxic sugar (e.g. `(…)(…)` instead of `(…)*(…)`), various alternatives
  for some operations (e.g. `⋅` or `×` instead of `*`, `÷` instead of `/`).


In the future, FormulaJS will be able to handle unknow variables and more
functions (log, cos/sin/tan, etc).

Examples
--------

```sh
formula -2+3                 # 1
formula "((42-5)(12*3+2))^3" # 2779431416
formula PI*1.5               # 4.71238898038469
```
