const Blockchain = require('./lab2');
const bitcoin = new Blockchain();
bitcoin.createNewBlock("DepartmentA", "John Doe",
 "afec7b0b5bd3551bfd00d058ecdaed43be97e7279d23840b0ae8e1de7cb07b8b",
 200000,4465717853912318,5459646395863355);
console.log(bitcoin);
4465717853912318