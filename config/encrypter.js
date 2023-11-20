const crypto=require('crypto');

module.exports={
    isPasswordMatched(candidate,hash){
        const myPasswordHashed=crypto.createHash('md5').update(candidate).digest('hex');
        console.log(myPasswordHashed+' = '+hash)
        return (myPasswordHashed===hash);
    },
    encrypt(pass){
        return crypto.createHash('md5').update(pass).digest('hex');
    }
}