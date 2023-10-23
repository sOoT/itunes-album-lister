import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumListComponent } from './albums/album-list/album-list.component';
import { AlbumDetailComponent } from './albums/album-detail/album-detail.component';
import { SearchComponent } from './search/search.component';
import { AlbumComponent } from './albums/album-list/album/album.component';

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
