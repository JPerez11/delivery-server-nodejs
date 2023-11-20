const db=require('../config/config');
const crypto=require('crypto');

const User={};

User.getAll=()=>{
    const sql=`
    SELECT 
        * 
    FROM 
        delivery.users
        `;
    return db.manyOrNone(sql);
};
 

User.findById=(id, callback)=>{
    const sql=`
    SELECT 
        id,
        email,
        name,
        lastname,
        phone, 
        password,
        session_token
    FROM 
        delivery.users
    WHERE id=$1
        `;
    return db.oneOrNone(sql,id).then(user => callback(null, user));
};

User.findByEmail=(email)=>{
    const sql=`
    SELECT 
        id,
        email,
        name,
        lastname,
        phone, 
        password,
        session_token
    FROM 
        delivery.users
    WHERE email=$1
        `;
    return db.oneOrNone(sql,email);
};
User.findByPhone=(phone)=>{
    const sql=`
    SELECT 
        id,
        email,
        name,
        lastname,
        phone, 
        password,
        session_token
    FROM 
        delivery.users
    WHERE phone=$1
        `;
    return db.oneOrNone(sql,phone);
};

User.create=(user)=>{
    
const sql=`
INSERT INTO 
    delivery.users(
    email ,
    name ,
    lastname ,
    phone ,
    image ,
    password ,
    created_at ,
    updated_at 
    )VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id
`;

return db.oneOrNone(sql,[
    user.email ,
    user.name ,
    user.lastname ,
    user.phone ,
    user.image ,
    user.password,
    new Date(),
    new Date()

]);

};

module.exports=User;