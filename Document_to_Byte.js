// var b = new Buffer.from('JavaScript');
// var s = b.toString('base64');
// console.log(s);

// var d = new Buffer.from(s,'base64')
// var g = b.toString();
// console.log(g);

var fs = require('fs');

function pdf_encode(file){
    var pdfmap = fs.readFileSync(file);
    return Buffer.from(pdfmap).toString('base64');
}

function pdf_decode(base64str , file){
    var pdfmap = Buffer.from(base64str, 'base64');
    fs.writeFileSync(file, pdfmap);
    console.log('******** File created from base64 encoded string ********');

}

var base64str = pdf_encode('test.pdf');
console.log(base64str);
pdf_decode(base64str, 'decoded.pdf');
