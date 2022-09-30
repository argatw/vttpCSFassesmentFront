// Implement the methods in PizzaService for Task 3
// Add appropriate parameter and return type 

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Order, User } from "./models";

@Injectable()
export class PizzaService {

  constructor(private http: HttpClient) { }

  // POST /api/order
  // Add any required parameters or return type
  // createOrder(/* add any required parameters */) { 
  // }
  createOrder(orderDetails:Order) { 
    return this.http.post(`/api/order`,orderDetails)
    // return this.http.post(environment.baseurl + 'orders',orderDetails );
  }

  // GET /api/order/<email>/all
  // Add any required parameters or return type
  getOrders(email:string) { 
    return firstValueFrom(
      this.http.get<any>(`/api/order/`+email)
      // return this.http.get<any>(environment.baseurl + 'orders/'+email );
    )

  }

}
