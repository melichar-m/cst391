import { Injectable } from '@angular/core';
import exampledata from '../../data/sample-music-data.json'
import { HttpClient } from '@angular/common/http';
import { Artist } from '../models/artists.model';
import { Album } from '../models/albums.model';

@Injectable({ providedIn: 'root' })
export class MusicServiceService {
  private host = 'http://localhost:3000/';

  albums: Album[] = exampledata;

  constructor(private http: HttpClient) {}

  public getArtists(callback: (artists: Artist[]) => void): void {
    this.http.get<Artist[]>(this.host + "/artists").
      subscribe((artists: Artist[]) => {
        callback(artists);
      },
      (error) => {
        console.log('Error fetching artists:', error);
      }
    );
  }

  public getAlbums(callback: (albums: Album[]) => void): void {
    this.http.get<Album[]>(this.host + "/albums").
      subscribe((albums: Album[]) => {
        callback(albums);
      },
      (error) => {
        console.log('Error fetching albums:', error);
      }
    );
  }

  public getAlbumsOfArtist(artistName: string, callback: (albums: Album[]) => void): void {
    let request = this.host + `/albums/${artistName}`
    console.log('request', request);
    this.http.get<Album[]>(this.host + `/artists/${artistName}/albums`).
      subscribe((albums: Album[]) => {
        callback(albums);
      },
      (error) => {
        console.log('Error fetching albums of artist:', error);
      }
    );
  }

  public createAlbum(album: Album, callback: () => void): void {
    this.http.post<Album>(this.host + "/albums", album)
      .subscribe((data) => {
          callback();
        });
  }
  

  public updateAlbum(album: Album, callback: () => void): void {
    this.http.put(this.host + `/albums/${album.albumId}`, album).
      subscribe(
      () => {
        callback();
      }
    );
  }

  public deleteAlbum(albumId: number, callback: () => void): void {
    this.http.delete(this.host + `/albums/${albumId}`).
      subscribe(
      () => {
        callback();
      },
      (error) => {
        console.log('Error deleting album:', error);
        callback();
      }
    );
  }
}
