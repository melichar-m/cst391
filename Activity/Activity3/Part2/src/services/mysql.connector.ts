import { query } from 'express';
import { Pool, createPool } from 'mysql';

let pool: Pool | null = null;

const initializeMySqlConnector = () => {
  try {
    pool = createPool({
      connectionLimit: parseInt(process.env.MYSQL_CONNECTION_LIMIT != undefined ? process.env.MYSQL_CONNECTION_LIMIT : ""),
      port: parseInt(process.env.MYSQL_PORT != undefined ? process.env.MYSQL_PORT : ""),
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'music',
    });

    console.debug('MySql Adapter pool generated successfully');
    console.log('process.env.DB_DATABASE', process.env.MY_SQL_DB_DATABASE);

    pool.getConnection((err: any, connection: { release: () => void; }) => {
      if (err) {
        console.error('Error connecting to MySql database', err);
        throw new Error('not able to connect to database');
      } else {
        console.log('connection made');
        connection.release();
      }
    });
  } catch (error) {
    console.error('[mysql.connector][initializeMySqlConnector][error]', error);
    throw new Error('failed to initialize mysql connector');
  }
};

export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
  try {
    if (!pool) {
      initializeMySqlConnector();
    }
    return new Promise<T>((resolve, reject) => {
      pool!.query(query, params, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  } catch (error) {
    console.error('[mysql.connector][execute][error]', error);
    throw new Error('failed to execute query');
  }
};
