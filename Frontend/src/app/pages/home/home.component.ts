import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ZonesService } from '../../services/zones.service';
import { Place } from '../../interfaces/place';
import { Zone } from '../../interfaces/zone';
import { NotificationService } from '../../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { AddModalComponent } from '../../components/add-modal/add-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit {
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
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadZones();
  }

  loadZones(): void {
    this.isLoadingZones = true;
    this.placeService.getZones().subscribe({
      next: (zones) => {
        console.log('Zones loaded:', zones);
        this.zones = zones;
        this.filteredZones = zones;
        this.isLoadingZones = false;
      },
      error: (error) => {
        console.log('Errore nel caricamento delle zone');
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
          console.log('Errore nel caricamento dei luoghi');
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

  openGoogleMaps(latitude: string | number, longitude: string | number): void {
    const lat = typeof latitude === 'string' ? parseFloat(latitude) : latitude;
    const lng =
      typeof longitude === 'string' ? parseFloat(longitude) : longitude;

    if (!isNaN(lat) && !isNaN(lng)) {
      const url = `https://www.google.com/maps?q=${lat},${lng}`;
      window.open(url, '_blank');
    } else {
      console.error('Invalid coordinates:', { latitude, longitude });
    }
  }

  openModal(): void {
    this.dialog.open(AddModalComponent, {
      width: '400px',
    });
  }
}
