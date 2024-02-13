

import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'edunify_db'
});

export default async function handler(req, res) {
  try {
    const [rows] = await db.query('SELECT id, name, address, city, image FROM schools');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
