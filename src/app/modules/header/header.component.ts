import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumsService } from '../shared/albums.service';
import { SearchComponent } from './search/search.component';
import { FormControl, FormGroup } from '@angular/forms';

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
    private albumsService: AlbumsService
  ) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
  }

  onLogoClick() {
    this.albumsService.albumsChanged.next(null);
    this.albumsService.artistsChanged.next(null);
    this.searchForm.reset();
    this.router.navigate(['/']);
  }

  checkIsHome() {
    this.isHomeRoute = this.router.url === '/';
  }
}
