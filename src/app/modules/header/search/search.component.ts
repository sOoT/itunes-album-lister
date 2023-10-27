import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataStorageService } from '../../shared/data-storage.service';
import { Router } from '@angular/router';
import { AlbumsService } from '../../shared/albums.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;

  constructor(
    private dataStorageService: DataStorageService,
    private router: Router,
    private albumsService: AlbumsService
  ) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
  }

  onSubmit(): void {
    this.router.navigate(['/']);
    this.dataStorageService.fetchAlbums(this.searchForm.value.search).subscribe();
  }
}
