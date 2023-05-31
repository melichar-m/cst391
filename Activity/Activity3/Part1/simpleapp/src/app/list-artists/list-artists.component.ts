import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicServiceService } from '../service/music-service.service';
import { Artist } from '../models/artists.model';



@Component({
  selector: 'app-list-artists',
  templateUrl: './list-artists.component.html',
  styleUrls: ['./list-artists.component.css']
})
export class ListArtistsComponent implements OnInit{
  ngOnInit()
  {
      this.route.queryParams.subscribe(params => {
      console.log("Getting data....");
      this.artists = this.service.getArtists();
    });
  }

  selectedArtist: Artist = {} as Artist;
  artists: Artist[] = [];
  constructor(private route: ActivatedRoute, private service: MusicServiceService) {}

  onSelectArtist(artist: Artist) {
      this.selectedArtist = artist;
    }
}
