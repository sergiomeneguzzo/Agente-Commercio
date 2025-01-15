import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ZonesService } from '../../services/zones.service';
import { Place } from '../../interfaces/place';
import { Zone } from '../../interfaces/zone';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit, OnDestroy {
  zones: Zone[] = [];
  places: Place[] = [];
  selectedZone: Zone | null = null;
  isLoadingZones = true;
  isLoadingPlaces = false;
  searchTerm = '';
  filteredZones: Zone[] = [];

  private destroyed$ = new Subject<void>();

  constructor(
    private placeService: ZonesService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadZones();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  loadZones(): void {
    this.isLoadingZones = true;
    this.placeService
      .getZones()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (zones) => {
          this.zones = zones;
          this.filteredZones = zones;
          this.isLoadingZones = false;
        },
        error: (error) => {
          this.notificationService.errorMessage(
            'Errore nel caricamento delle zone'
          );
          this.isLoadingZones = false;
        },
      });
  }

  loadPlacesByZone(zoneId: string): void {
    this.isLoadingPlaces = true;
    this.placeService
      .getPlacesByZone(zoneId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (places) => {
          this.places = places;
          this.isLoadingPlaces = false;
        },
        error: (error) => {
          this.notificationService.errorMessage(
            'Errore nel caricamento dei luoghi'
          );
          this.isLoadingPlaces = false;
        },
      });
  }

  selectZone(zone: Zone): void {
    this.selectedZone = zone;
    if (zone.id) {
      this.loadPlacesByZone(zone.id);
    }
  }

  backToZones(): void {
    this.selectedZone = null;
    this.places = [];
  }

  filterZones(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredZones = this.zones.filter(
      (zone) =>
        zone.Cap.toLowerCase().includes(searchTerm) ||
        (typeof zone.Agent === 'object' &&
          zone.Agent.username?.toLowerCase().includes(searchTerm))
    );
  }

  getAgentInfo(agent: string | any): string {
    if (typeof agent === 'string') return agent;
    return agent.username || 'N/A';
  }
}
