const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'admin#123',
  database : 'legisrevamp_new1'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('😞error connecting: ' + err.stack);
    return;
  }
 
  console.log('🤘🏻🔥connected successful as id ' + connection.threadId);
});

module.exports = connection;