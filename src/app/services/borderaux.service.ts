import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BorderauxService {
  private http = inject(HttpClient);
  private rapports = signal<any>([]);
  readonly path = '/backend/bordereaux';

  search(): Observable<any[]> {
    return this.http.get<any[]>(`${this.path}`);
  }

  read(id: string): Observable<any> {
    return this.http.get<any>(`${this.path}/${id}`);
  }

  exportReport(id: string, format: 'pdf' | 'word'): Observable<Blob> {
    const exportUrl = `${this.path}/${id}/generate?format=${format}`;
    return this.http.get(exportUrl, { responseType: 'blob' });
  }
}

