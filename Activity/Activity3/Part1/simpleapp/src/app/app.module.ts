import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { InfoComponent } from './info/info.component';
import { ListArtistsComponent } from './list-artists/list-artists.component';
import { ListAlbumsComponent } from './list-albums/list-albums.component';
import { DisplayAlbumComponent } from './display-album/display-album.component';
import { EditAlbumComponent } from './edit-album/edit-album.component';
import { DeleteAlbumComponent } from './delete-album/delete-album.component';
import { FormsModule } from '@angular/forms';
import { CreateAlbumComponent } from './create-album/create-album.component';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    InfoComponent,
    ListArtistsComponent,
    ListAlbumsComponent,
    DisplayAlbumComponent,
    EditAlbumComponent,
    DeleteAlbumComponent,
    CreateAlbumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
