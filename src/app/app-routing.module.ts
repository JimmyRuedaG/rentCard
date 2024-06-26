import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaTablaComponent } from './components/consulta-tabla/consulta-tabla.component';
import { EstadisticaAlquilerComponent } from './components/estadistica-alquiler/estadistica-alquiler.component';

const routes: Routes = [
  { path: '', redirectTo: '/consultas', pathMatch: 'full' },
  { path: 'consultas', component: ConsultaTablaComponent },
  { path: 'estadistica', component: EstadisticaAlquilerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
