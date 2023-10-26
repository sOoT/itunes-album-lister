import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './modules/albums/albums.component';
import { AlbumDetailComponent } from './modules/albums/album-list/album/album-detail/album-detail.component';
import { AlbumListComponent } from './modules/albums/album-list/album-list.component';
import { FiltersComponent } from './modules/albums/album-list/filters/filters.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: AlbumsComponent, children: [
    { path: 'albums/:artistId', component: AlbumListComponent },
    { path: 'album/:artistId/:albumId', component: AlbumDetailComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
