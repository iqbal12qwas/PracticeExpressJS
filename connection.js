var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_db'
});

con.connect((err) => {
    if (!err) {
        console.log('DB Connection Success');
    } else {
        console.log('DB Connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
    }
});

module.exports = con;