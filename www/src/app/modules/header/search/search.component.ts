import { AfterViewInit, Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataStorageService } from '../../shared/data-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
  @Input() searchForm: FormGroup;

  constructor(
    private dataStorageService: DataStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    
  }

  onSubmit(): void {
    this.router.navigate(['/albums']);
    this.dataStorageService.fetchAlbums(this.searchForm.value.search).subscribe();
  }
}
