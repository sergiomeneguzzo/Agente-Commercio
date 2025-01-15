import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from '../interfaces/place';
import { apiUrl } from '../../../secrets';
import { HttpClient } from '@angular/common/http';
import { Zone } from '../interfaces/zone';

@Injectable({
  providedIn: 'root',
})
export class ZonesService {
  constructor(private http: HttpClient) {}

  getZones(): Observable<Zone[]> {
    return this.http.get<Zone[]>(`${apiUrl}/zones`);
  }

  getPlacesByZone(zoneId: string): Observable<Place[]> {
    return this.http.get<Place[]>(`${apiUrl}/places/placesbyZone/${zoneId}`);
  }

  addZone(zone: { Agent: string; Cap: string }): Observable<any> {
    return this.http.post(`${apiUrl}/zones`, zone);
  }
}
