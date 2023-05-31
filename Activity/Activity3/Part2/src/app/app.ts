import express, { Request, Response } from 'express';
import albumsRouter from './models/albums/albums.routes';
import artistsRouter from './models/artists/artists.routes';
import logger from '../middleware/logger.middleware';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(helmet());

console.log(process.env.MY_SQL_DB_HOST);

if(process.env.NODE_ENV !== 'production') {
    app.use(logger);
    console.log(process.env.GREETING + ' in dev mode');
}

app.listen(port, () => {
    console.log(`Example app listening on at http://localhost:${port}`)
});

app.use('/', [albumsRouter, artistsRouter]);