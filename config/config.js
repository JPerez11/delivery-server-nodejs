const promise=require('bluebird');
const options={
    promiseLib:promise,
    query:(e)=>{}
};

const pgp =require('pg-promise')(options);
const types =pgp.pg.types;
types.setTypeParser(1114,function(strinValue){
    return strinValue;
});

const databaseConfig={
    'host':'localhost',
    'port':5432,
    'database':'delivery_db',
    'user':'postgres',
    'password':'postgres'
};
const db=pgp(databaseConfig);
module.exports=db;









