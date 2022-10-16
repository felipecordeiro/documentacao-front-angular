import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Assets } from './models/assets.model';
import { CoincapResponse } from './models/coincap-response.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardCoincapService {

  constructor(private http: HttpClient) { }

  getAllAssets(): Observable<Assets[]> {
      return this.http.get<CoincapResponse<Assets>>(environment.coincapApi + '/assets')
      .pipe(
        map(r => r.data)
      )
  }
  
}
