import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Album } from '../../../../models/album.model';
import { DataStorageService } from 'src/app/modules/shared/data-storage.service';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AlbumsService } from 'src/app/modules/shared/albums.service';
import { LocalStorageService } from 'src/app/modules/shared/local-storage';
import { ActivationStart, Router } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  @Input() album!: Album;
  @Input() albumId: number;
  @ViewChild(AlbumDetailComponent) albumDetail!: AlbumDetailComponent;
  showDetails: boolean = false;

  constructor(
    private dataStorageService: DataStorageService,
    private localStorageService: LocalStorageService,
    private albumsService: AlbumsService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    const artistId = this.localStorageService.getData('artistId');
    const searchTerm = this.localStorageService.getData('searchTerm');
    if (this.albumId === this.album.id) {
      this.getAlbumDetails();
    }
  }

  onClick() {
    this.dataStorageService.fetchAlbumDetail(this.album.id).subscribe((albumDetail) => {
      if (albumDetail) {
        this.albumDetail.dialog.nativeElement.showModal();
      }
    });
  }

  getAlbumDetails() {
    this.dataStorageService.fetchAlbumDetail(this.album.id).subscribe((albumDetail) => {
      if (albumDetail) {
        this.albumDetail.dialog.nativeElement.showModal();
      }
    });
  }
}
