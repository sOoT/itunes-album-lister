import { Component, OnDestroy, OnInit } from '@angular/core';
import * as beatlesResults from '../../../data/beatles.json';
import { Result, Results } from 'src/app/interfaces/result.interface';
import { Album } from '../../../models/album.model';
import { AlbumsService } from '../albums.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit, OnDestroy {
  data: Results = beatlesResults;
  albums: Album[];
  subscription: Subscription;

  constructor(
    private albumsService: AlbumsService
  ) {}

  ngOnInit(): void {
    this.subscription = this.albumsService.albumsChanged
      .subscribe((albums: Album[]) => {
        this.albums = albums;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
