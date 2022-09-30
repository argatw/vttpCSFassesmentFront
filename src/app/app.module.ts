import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { OrdersComponent } from './components/orders.component';
import { PizzaService } from './pizza.service';

const aRoutes: Routes = [
  {path: '', component: MainComponent },
  // {path: 'orders/:email', component: OrdersComponent},
  {path: 'orders', component: OrdersComponent},

  // catch all
  {path: '**', redirectTo:'/', pathMatch: 'full'},
]

@NgModule({
  declarations: [
    AppComponent, MainComponent, OrdersComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, 
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(aRoutes, {useHash: true})
  ],

  providers: [PizzaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
