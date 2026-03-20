import mysql from 'mysql2/promise';

export const connection = () => {
  try {
 
    return mysql.createPool({
      host: '127.0.0.1',
      user: 'root',
      password: '1234',
      database: 'connect_dev',
      port: 3306,
      waitForConnections: true,
      connectionLimit: 10,
    });
  } catch (error) {
    console.error('Error ao conectar ao banco de dados:', error);
    throw error;
  }
};
