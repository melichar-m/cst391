import express from 'express';
import albumsRouter from './albums/albums.routes';
import artistsRouter from './artists/artists.routes';
import logger from './middleware/logger.middleware';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const port = 3001;

app.use('/', [albumsRouter, artistsRouter]);

app.listen(port, () => {
    console.log(`Example app listening on at http://localhost:${port}`)
});

if (process.env.NODE_ENV !== 'production') {
    app.use(logger);
    console.log(process.env.GREETING + ' in dev mode')
}

//parse json bodies
app.use(express.json());
//parse url-encoded bodies
app.use(express.urlencoded({ extended: true }));

//enable all cors requests
app.use(cors());

//adding set of security middleware
app.use(helmet());