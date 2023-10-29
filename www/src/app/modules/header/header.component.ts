import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumsService } from '../shared/albums.service';
import { SearchComponent } from './search/search.component';
import { FormControl, FormGroup } from '@angular/forms';
import { LocalStorageService } from '../shared/local-storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isHomeRoute: boolean = false;
  public searchForm: FormGroup;
  
  constructor(
    private router: Router,
    private albumsService: AlbumsService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
  }

  /**
   * When the user clicks on the logo, 
   * we want to reset the search form
   */
  onLogoClick() {
    this.albumsService.albumsChanged.next(null);
    this.albumsService.artistsChanged.next(null);
    this.searchForm.reset();
    this.localStorageService.removeData('artistId');
    this.localStorageService.removeData('searchTerm');
    this.router.navigate(['/']);
  }

  checkIsHome() {
    this.isHomeRoute = this.router.url === '/';
  }
}
