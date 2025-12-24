import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HomeService {
    http = inject(HttpClient);
    private readonly url = environment.URL;

    getAllEstados(): Observable<any> {
        return this.http.get<any>(this.url + '/catalogs/estados', {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    getAllMunicipiosByID(id: number): Observable<any> {
        return this.http.get<any>(this.url + `/catalogs/municipios/${id}`, {
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
