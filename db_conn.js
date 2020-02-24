const mysql=require('mysql');
const db=mysql.createConnection({
    host: 'remotemysql.com',
    user: 'HF2sbV7fMv',
    password: 'um1x8wxAh1',
    database: 'HF2sbV7fMv',
    port:3306,
});
db.connect((err) => {
    if(err){
        throw err;
    }else{
        console.log("database connected");
    }
});
global.db=db;