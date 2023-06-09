import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Music Collection';
  version = '1.0';

  constructor(private router: Router) {}

  displayVersion() {
    alert('Version: ' + this.version);
  }

  displayArtistList() {
    this.router.navigate(['list-artists']);
  }

  displayAlbumList() {
    this.router.navigate(['list-albums']);
  }
}
