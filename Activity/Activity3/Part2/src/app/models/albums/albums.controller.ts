import { Request, RequestHandler, Response } from 'express';
import { Album } from './albums.model';
import { Track } from '../tracks/tracks.model';
import * as AlbumDao from './albums.dao';
import * as TracksDao from '../tracks/tracks.dao';
import { OkPacket } from 'mysql';

export const readAlbums: RequestHandler = async (req: Request, res: Response) => {
    try {
        let albums;
        let albumId = parseInt(req.params.id as string);

        console.log('albumId', albumId);
        if(Number.isNaN(albumId)) {
            albums = await AlbumDao.readAlbums();
        } else {
            albums = await AlbumDao.readAlbumsByAlbumId(albumId);
        }
        await TracksDao.readTracks(albumId);

        res.status(200).json(albums);
    } catch (error) {
        console.error('[albums.controller][readAlbums][error]', error);
        res.status(500).json({error: 'There was an error while trying to read albums'});
    }
};

export const readAlbumByArtist: RequestHandler = async (req: Request, res: Response) => {
    try {
        const albums = await AlbumDao.readAlbumByArtist(req.params.artist);

        await readTracks(albums, res);
    } catch (error) {
        console.error('[albums.controller][readAlbumByArtist][error]', error);
        res.status(500).json({error: 'There was an error while trying to read albums by artist'});
    }
};


export const readAlbumsByDescriptionSearch: RequestHandler = async (req: Request, res: Response) => {
    try {
        console.log('search', req.params.search);
        const albums = await AlbumDao.readAlbumByDescriptionSearch('%' + req.params.search + '%');

        await readTracks(albums, res);

        res.status(200).json(albums);
    } catch (error) {
        console.error('[albums.controller][readAlbumsByDescriptionSearch][error]', error);
        res.status(500).json({error: 'There was an error while trying to read albums by description search'});
    }
};

export const readAlbumsByArtistSearch: RequestHandler = async (req: Request, res: Response) => {
    try {
        console.log('search', req.params.search);
        const albums = await AlbumDao.readAlbumsByArtistSearch('%' + req.params.search + '%');

        await readTracks(albums, res);

        res.status(200).json(albums);
    } catch (error) {
        console.error('[albums.controller][readAlbumsByArtistSearch][error]', error);
        res.status(500).json({error: 'There was an error while trying to read albums by artist search'});
    }
};

export const createAlbum: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await AlbumDao.createAlbum(req.body);

        console.log('req.body', req.body);

        console.log('album', okPacket);

        req.body.tracks.forEach(async (track: Track, index: number) => {
            try{
                await TracksDao.createTrack(track, index, okPacket.insertId);
            } catch (error) {
                console.error('[albums.controller][createAlbum][error]', error);
                res.status(500).json({error: 'There was an error while trying to create album'});
            }
        });
        res.status(200).json(okPacket);
    } catch (error) {
        console.error('[albums.controller][createAlbum][error]', error);
        res.status(500).json({error: 'There was an error while trying to create album'});
    }
};

export const updateAlbum: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await AlbumDao.updateAlbum(req.body);

        console.log('req.body', req.body);

        console.log('album', okPacket);

        req.body.tracks.forEach(async (track: Track, index: number) => {
            try{
                await TracksDao.updateTrack(track);
            } catch (error) {
                console.error('[albums.controller][updateAlbum][error]', error);
                res.status(500).json({error: 'There was an error while trying to update album'});
            }
        });

        res.status(200).json(okPacket);
    } catch (error) {
        console.error('[albums.controller][updateAlbum][error]', error);
        res.status(500).json({error: 'There was an error while trying to update album'});
    }
};

async function readTracks(albums: Album[], res: Response<any, Record<string, any>>) {
    for(let i = 0; i < albums.length; i++) {
        try {
            const tracks = await TracksDao.readTracks(albums[i].albumId);
            albums[i].tracks = tracks;
        } catch (error) {
            console.error('[albums.controller][readTracks][error]', error);
            res.status(500).json({error: 'There was an error while trying to read tracks'});
        }
    }
}

export const deleteAlbum: RequestHandler = async (req: Request, res: Response) => {
    try {
        let albumId = parseInt(req.params.id as string);

        console.log('albumId', albumId);
        if(!Number.isNaN(albumId)){
            const response = await AlbumDao.deleteAlbum(albumId);

            res.status(200).json(response);
        } else {
            throw new Error('Invalid albumId');
        }
    } catch (error) {
        console.error('[albums.controller][deleteAlbum][error]', error);
        res.status(500).json({error: 'There was an error while trying to delete album'});
        }
    }