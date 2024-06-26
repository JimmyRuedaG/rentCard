import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RentalService } from 'src/app/service/rental.service';

@Component({
  selector: 'app-rentals-dashboard',
  templateUrl: './estadistica-alquiler.component.html',
  styleUrls: ['./estadistica-alquiler.component.css'],
})
export class EstadisticaAlquilerComponent implements OnInit, OnDestroy {
  // Arreglo para almacenar alquileres por día
  rentalsPerDay: any[] = [];
  // Arreglo para almacenar alquileres por mes
  rentalsPerMonth: any[] = [];
  // Intervalo de actualización en milisegundos
  private refreshInterval = 60000;
  // Suscripción al timer para la actualización
  private timerSubscription: Subscription | undefined;

  // Inyección del servicio RentalService
  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    // Al inicializar el componente, obtiene los datos
    this.fetchData();

    // Configura la suscripción al timer para obtener datos cada refreshInterval milisegundos
    this.timerSubscription = timer(0, this.refreshInterval)
      .pipe(
        // Usa switchMap para cambiar al observable de estadísticas de alquiler
        switchMap(() => this.rentalService.getRentalsStatistics())
      )
      .subscribe((data) => {
        // Actualiza la lista de alquileres por día con los datos recibidos
        this.rentalsPerDay = data;
      });
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      // Al destruir el componente, cancela la suscripción al timer
      this.timerSubscription.unsubscribe();
    }
  }

  // Método privado para obtener los alquileres por día desde el servicio
  private fetchData(): void {
    this.rentalService.getRentalsStatistics().subscribe((data) => {
      // Actualiza la lista de alquileres por día con los datos recibidos
      this.rentalsPerDay = data;
    });
  }
}
