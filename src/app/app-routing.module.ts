import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './modules/albums/albums.component';
import { AlbumDetailComponent } from './modules/albums/album-detail/album-detail.component';
import { AlbumListComponent } from './modules/albums/album-list/album-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
  { path: 'albums', component: AlbumsComponent, children: [
    { path: '', component: AlbumListComponent },
    { path: ':id', component: AlbumDetailComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
