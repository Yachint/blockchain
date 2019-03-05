const QuickEncrypt = require('quick-encrypt')
const crypto = require('crypto');
var eccrypto = require('eccrypto');
const fs = require('fs');
 
let keys = QuickEncrypt.generate(1024) // Use either 2048 bits or 1024 bits.
console.log(keys) // Generated Public Key and Private Key pair
let publicKey = keys.public      // " -----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAIXlXZs+0FoIGBc5pjnZZxtvIzdDFtNi3SVi6vf2J...... "
let privateKey = keys.private   // " -----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAIXlXZs+0FoIGBc5pjnZZxtvIzdDFtNi3SVi6vf2J...... "
let privECDA = crypto.randomBytes(32);
console.log('Type :', typeof(privECDA));
let pubECDA = eccrypto.getPublic(privECDA);

const writeECDAPrivate = fs.writeFileSync('private_ECDA.pem', privECDA);
const writeECDAPublic = fs.writeFileSync('public_ECDA.pem', pubECDA);
const writePubKey = fs.writeFileSync('public.pem', publicKey);
const writePrivKey = fs.writeFileSync('private.pem', privateKey);


let encryptedText = QuickEncrypt.encrypt('ImeanIt', publicKey )
console.log(encryptedText) // This will print out the ENCRYPTED text, for example : " 01c066e00c660aabadfc320621d9c3ac25ccf2e4c29e8bf4c...... "

let decryptedText = QuickEncrypt.decrypt( encryptedText, privateKey)
console.log(decryptedText) // This will print out the DECRYPTED text, which is " This is some super top secret text! "

// const signer = crypto.createSign('RSA-SHA512');
// signer.update('Imeanit');
// const signature = signer.sign(privateKey, 'hex');
// console.log('Signed with Private key :', signature);

// console.log('Verifying...');

// const verifier = crypto.createVerify('RSA-SHA512');
// const publicKeyBuf = new Buffer.from(publicKey, 'utf-8');
// const signatureBuf = new Buffer.from(signature, 'hex');
// const result = verifier.verify(publicKeyBuf, signatureBuf);
// console.log('Output :', result);