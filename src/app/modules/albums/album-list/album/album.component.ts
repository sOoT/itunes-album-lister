import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Album } from '../../../../models/album.model';
import { DataStorageService } from 'src/app/modules/shared/data-storage.service';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { LoaderOverlayService } from 'src/app/modules/shared/loader-overlay.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  @Input() album!: Album;
  @ViewChild(AlbumDetailComponent) albumDetail!: AlbumDetailComponent;
  showDetails: boolean = false;

  constructor(private dataStorageService: DataStorageService) {}
  
  ngOnInit(): void {
    
  }

  onClick() {
    this.dataStorageService.fetchAlbumDetail(this.album.id).subscribe();
    this.albumDetail.dialog.nativeElement.showModal();
  }
}
