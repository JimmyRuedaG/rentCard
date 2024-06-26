import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstadisticaAlquilerComponent } from './components/estadistica-alquiler/estadistica-alquiler.component';
import { ConsultaTablaComponent } from './components/consulta-tabla/consulta-tabla.component';
import { HttpClientModule } from '@angular/common/http';
import { AlquilerService } from './service/alquiler.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ConsultaTablaComponent,
    EstadisticaAlquilerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [AlquilerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
