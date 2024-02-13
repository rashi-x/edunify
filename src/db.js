// edunify/src/db.js

import mysql from 'mysql2/promise';


export async function connect() {
  const connection = await mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: '', 
    database: 'edunify_db' 
  });
  return connection;
}
