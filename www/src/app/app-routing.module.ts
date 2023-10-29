import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './modules/albums/albums.component';
import { AlbumListComponent } from './modules/albums/album-list/album-list.component';
import { AlbumDetailComponent } from './modules/albums/album-list/album/album-detail/album-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'albums', component: AlbumsComponent, children: [
    { path: ':artistId', component: AlbumListComponent },
    { path: 'album/:albumId', component: AlbumDetailComponent, pathMatch: 'full' },
    { path: ':artistId/:albumId', component: AlbumDetailComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
