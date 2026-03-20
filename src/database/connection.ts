import mysql from 'mysql2/promise';

export const connection = () => {
  try {
    const dbUrl = process.env.DATABASE_URL || 'mysql://root:1234@127.0.0.1:3306/connec_dev';
    return mysql.createPool(dbUrl);
  } catch (error) {
    console.error('Error ao conectar ao banco de dados:', error);
    throw error;
  }
};
