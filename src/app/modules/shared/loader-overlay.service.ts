import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderOverlayService {
  public loading = new Subject<boolean>();
  private _loading: boolean = false;

  constructor() {}

  set loadingStatus(status: boolean) {
    this._loading = status;
    this.loading.next(status);
  }

  get loadingStatus(): boolean {
    return this._loading;
  }
}