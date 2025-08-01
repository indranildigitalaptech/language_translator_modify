const mysql      = require('mysql');
const connection2 = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'admin#123',
  database : 'tunecutter_db_aug1'
});
 
connection2.connect(function(err) {
  if (err) {
    console.error('😞error connecting: ' + err.stack);
    return;
  }
 
  console.log('🤘🏻🔥connected successful as id ' + connection2.threadId);
});

module.exports = connection2;