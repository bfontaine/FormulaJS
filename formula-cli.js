#!/usr/bin/env nodejs

var f = require('./formula'),
    args = process.argv;

args.shift(); // remove 'node'

if (args.length === 1) {
    console.log("Usage: "+args[0]+" FILE");
}
else {
    console.log(f.main(args));
}
