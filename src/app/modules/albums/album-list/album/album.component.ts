import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Album } from '../../../../models/album.model';
import { DataStorageService } from 'src/app/modules/shared/data-storage.service';
import { AlbumDetailComponent } from './album-detail/album-detail.component';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  @Input() album!: Album;
  @ViewChild(AlbumDetailComponent) albumDetail!: AlbumDetailComponent;
  showDetails: boolean = false;

  constructor(
    private dataStorageService: DataStorageService
  ) {}
  
  ngOnInit(): void {
  }

  onClick() {
    this.dataStorageService.fetchAlbumDetail(this.album.id).subscribe((albumDetail) => {
      if (albumDetail) {
        this.albumDetail.dialog.nativeElement.showModal();
      }
    });
  }
}
