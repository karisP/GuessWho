"use strict";
const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432 ,
    database: "guesswho",
    ssl: false
});

const getCharacters = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM harrypotter ORDER BY id ASC', (error, results) => {
          console.log(error, results);
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

module.exports = {
    getCharacters
};