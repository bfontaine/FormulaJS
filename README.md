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
```

Features
--------

* Floats & integers, negative and positive numbers
* basic operations (`+`, `-`, `/`, `*`) and power (`^`)
* constants (`E`, `PI`)
* some syntaxic sugar (e.g. `(…)(…)` instead of `(…)*(…)`), various alternatives
  for some operations (e.g. `⋅` or `×` instead of `*`, `÷` instead of `/`).

Formula Examples
----------------

```
-2+3
((42-5)(12*3+2))^3
3.1415*18
```
