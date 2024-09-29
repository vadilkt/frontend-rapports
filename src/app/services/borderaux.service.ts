import {HttpClient} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BorderauxService {
  readonly path = '/backend/bordereaux';
  private http = inject(HttpClient);
  private rapports = signal<any>([]);

  search(): Observable<any[]> {
    return this.http.get<any[]>(`${this.path}`);
  }

  read(id: string): Observable<any> {
    return this.http.get<any>(`${this.path}/${id}`);
  }

  export(id: string, format: string) {
    const httpOptions = {
      'responseType': 'arraybuffer' as 'json'
      //'responseType'  : 'blob' as 'json'        //This also worked
    };

    return this.http.get<any>(`${this.path}/${id}/generate?format=${format}`, httpOptions);
  }
}

