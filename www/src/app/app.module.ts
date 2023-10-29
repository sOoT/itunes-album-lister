import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AlbumComponent } from './modules/albums/album-list/album/album.component';
import { AlbumDetailComponent } from './modules/albums/album-list/album/album-detail/album-detail.component';
import { AlbumListComponent } from './modules/albums/album-list/album-list.component';
import { AlbumsComponent } from './modules/albums/albums.component';
import { HeaderComponent } from './modules/header/header.component';
import { SearchComponent } from './modules/header/search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    AlbumDetailComponent,
    AlbumListComponent,
    AlbumsComponent,
    HeaderComponent,
    SearchComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
