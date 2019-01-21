const Lzma = require('lz-string');

var str = "This is my compression test.";
console.log("Size of sample is: " + str.length);
var compressed = Lzma.compress(str);
console.log("Size of compressed sample is: " + compressed.length);
str = Lzma.decompress(compressed);
console.log("Sample is: " + str);