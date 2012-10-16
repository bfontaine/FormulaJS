#!/usr/bin/env nodejs

var f    = require('./formula'),
    fs   = require('fs'),
    args = process.argv,
    source;

args.shift(); // remove 'node'

if (args.length === 1) {
    console.log("Usage:\n\t"+args[0]+" <formula>\n\t"+args[0]+" -f <file>");
    process.exit(-1);
}

if (args[1] && fs.existsSync(args[1])) {
    source = fs.readFileSync(require('path').resolve(args[1]), "utf8");
}
else {
    source = args.slice(1).join(' ');
}

console.log(f.parser.parse(source));
