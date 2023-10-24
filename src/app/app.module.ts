import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { AlbumsComponent } from './modules/albums/albums.component';
import { AlbumListComponent } from './modules/albums/album-list/album-list.component';
import { AlbumDetailComponent } from './modules/albums/album-detail/album-detail.component';
import { SearchComponent } from './modules/header/search/search.component';
import { AlbumComponent } from './modules/albums/album-list/album/album.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlbumsComponent,
    AlbumListComponent,
    AlbumDetailComponent,
    SearchComponent,
    AlbumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
