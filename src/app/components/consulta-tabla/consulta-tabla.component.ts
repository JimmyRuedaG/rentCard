import { Component, OnInit } from '@angular/core';
import { AlquilerService } from 'src/app/service/alquiler.service';

@Component({
  selector: 'app-consulta-tabla',
  templateUrl: './consulta-tabla.component.html',
  styleUrls: ['./consulta-tabla.component.css'],
})
export class ConsultaTablaComponent implements OnInit {
  // Arreglo que almacenará todos los alquileres
  alquileres: any[] = [];
  // Arreglo que almacenará los alquileres filtrados
  filteredAlquileres: any[] = [];
  // Variable para almacenar la fecha de inicio del filtro
  startDate: string = '';
  // Variable para almacenar la fecha de fin del filtro
  endDate: string = '';
  // Variable para almacenar mensajes de error relacionados con las fechas
  errorFecha: string = '';

  // Constructor que inyecta el servicio AlquilerService
  constructor(private dataService: AlquilerService) {}

  // Método que se ejecuta al inicializar el componente para cargar los alquileres
  ngOnInit(): void {
    this.fetchAlquileres();
  }

  // Cargar los datos para mostrar en la tabla
  fetchAlquileres(): void {
    this.dataService.getAlquileres().subscribe(
      (data) => {
        // Asignar los alquileres obtenidos del servicio al arreglo alquileres
        this.alquileres = data;
        // Mostrar todos los alquileres inicialmente
        this.filteredAlquileres = [...this.alquileres];
      },
      (error) => {
        // Manejo de errores al obtener los alquileres
        console.error('Error fetching alquileres:', error);
      }
    );
  }

  // Aplicar filtro
  applyFilter(): void {
    // Verificar si no se han seleccionado ambas fechas
    if (!this.startDate || !this.endDate) {
      // Mostrar todos los alquileres si no hay filtro aplicado
      this.filteredAlquileres = [...this.alquileres];
      // Limpiar mensaje de error
      this.errorFecha = '';
      return;
    }

    // Convertir las fechas de inicio y fin a objetos Date para comparación
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    // Validar que la fecha de inicio no sea mayor que la fecha de fin
    if (start > end) {
      this.errorFecha =
        'La fecha de inicio no puede ser mayor que la fecha de fin';
      this.filteredAlquileres = [...this.alquileres];
      return;
    }

    // Filtrar los alquileres según el rango de fechas seleccionado
    this.filteredAlquileres = this.alquileres.filter((alquiler) => {
      // Convertir la fecha del alquiler a objeto Date
      const alquilerDate = new Date(alquiler.fechaAlquiler);
      // Aplicar filtro por rango de fechas
      return alquilerDate >= start && alquilerDate <= end;
    });
    // Limpiar mensaje de error si no hubo problema con las fechas
    this.errorFecha = '';
  }

  // Método para limpiar el filtro y mostrar todos los alquileres originales
  clearFilter(): void {
    this.filteredAlquileres = [...this.alquileres];
    this.startDate = '';
    this.endDate = '';
    this.errorFecha = '';
  }
}
