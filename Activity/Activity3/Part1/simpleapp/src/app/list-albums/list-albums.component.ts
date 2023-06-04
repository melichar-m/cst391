import { Component, Input } from '@angular/core';
import { MusicServiceService } from '../service/music-service.service';
import { Artist } from '../models/artists.model';
import { Album } from './../models/albums.model';

@Component({
  selector: 'app-list-albums',
  templateUrl: './list-albums.component.html',
  styleUrls: ['./list-albums.component.css'],
  
})
export class ListAlbumsComponent {
  @Input() artist: Artist = {} as Artist;
  albums: Album[] = [];
  constructor(private musicService: MusicServiceService) {}
  selectedAlbum: Album | null = null;

  ngOnInit() {
    this.musicService.getAlbums((albums: Album[]) => {
      this.albums = albums;
    });    
  }
  public onSelectAlbum(album: Album)
  {
    this.selectedAlbum = album;
  }
}
