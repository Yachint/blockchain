// var b = new Buffer.from('JavaScript');
// var s = b.toString('base64');
// console.log(s);

// var d = new Buffer.from(s,'base64')
// var g = b.toString();
// console.log(g);

//Key Generation
const hash = require('./hash');
const QuickEncrypt = require('quick-encrypt')
let keys = QuickEncrypt.generate(1024)
console.log(keys);
let publicKey = keys.public
let privateKey = keys.private 


//PDF to byte conversion
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


//MAIN---------------------------------------------------
var base64str = pdf_encode('test.pdf');
console.log(base64str);
var hashed = hash("", base64str);
console.log('Hashed :',hashed);
//Encrypting file with public key
let encryptedFile = QuickEncrypt.encrypt(hashed, publicKey );
console.log(encryptedFile);

//Decrypting with Private key
let decryptedFile = QuickEncrypt.decrypt( encryptedFile, privateKey)
console.log('De-Hashed :',decryptedFile);

//pdf_decode(decryptedFile, 'PubDecoded.pdf');
