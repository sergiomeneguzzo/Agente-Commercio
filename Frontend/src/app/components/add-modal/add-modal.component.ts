import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ZonesService } from '../../services/zones.service';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-modal',
  standalone: false,
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.scss',
})
export class AddModalComponent {
  cap: string = '';
  currentUser$: Observable<any>;

  constructor(
    private dialogRef: MatDialogRef<AddModalComponent>,
    private zonesService: ZonesService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  close(): void {
    this.dialogRef.close();
  }

  addZone(): void {
    if (!this.cap) {
      this.notificationService.errorMessage('CAP non valido');
      return;
    }

    this.currentUser$.subscribe((user) => {
      if (user) {
        this.zonesService.addZone({ Agent: user.id, Cap: this.cap }).subscribe({
          next: (response) => {
            this.notificationService.successMessage(
              'Zona aggiunta con successo'
            );
            this.dialogRef.close();
          },
          error: (error) => {
            this.notificationService.errorMessage(
              "Errore nell'aggiunta della zona"
            );
          },
        });
      } else {
        this.notificationService.errorMessage('Utente non autenticato');
      }
    });
  }
}
