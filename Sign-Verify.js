const crypto = require('crypto')
const fs = require('fs')

const private_key = fs.readFileSync('private.pem', 'utf-8');
const public_key = fs.readFileSync('public.pem', 'utf-8');
const pdf = fs.readFileSync('decoded.pdf', 'utf-8');

const signer = crypto.createSign('sha256');
signer.update(pdf);
signer.end();

const signature = signer.sign(private_key);
const signature_hex = signature.toString('hex');

const verifier = crypto.createVerify('sha256');
verifier.update(pdf);
verifier.end();

const verified = verifier.verify(public_key, signature);


console.log(JSON.stringify({
    signature: signature_hex,
    verified: verified,
}, null, 2));