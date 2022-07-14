const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'dbmysql',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)
var peopleList = []

const create_table = `CREATE TABLE IF NOT EXISTS people(id int auto_increment primary key, name varchar(255) not null)`
connection.query(create_table, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });

const sql_people = `SELECT name from people`
connection.query(sql_people, function(err, rows, fields) {
    if (err) throw err;
    console.log('Registro ' + rows[0].name)
    peopleList = rows
});
  
const sql = `INSERT INTO people(name) values('Pedro')`
connection.query(sql)

connection.end()


app.get('/', (req,res) => {
    var html_return = '<h1>Full Cycle</h1>'
    peopleList.forEach(function(people) {
        html_return = html_return + people.name+'<br> '
    })
    res.send(html_return)
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})
