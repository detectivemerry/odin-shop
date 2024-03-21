const mariadb = require('mariadb')

const pool = mariadb.createPool({
  host: process.env.MARIADB_HOST,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASS,
  database: process.env.MARIADB_DATABASE
});

export default pool;

//export default async function getUsers( testObject ){
//  console.log(testObject);
//   return await pool.query('SELECT * from users');
//}
//export async function handler(req, res) {
//  const conn = await pool.getConnection();
//  const rows = await conn.query('SELECT * FROM users');
//  conn.release();
//  res.status(200).json(rows);
//}