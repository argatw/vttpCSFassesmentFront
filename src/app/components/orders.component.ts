import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  email!: string

  constructor(private aRoute: ActivatedRoute, private title: Title) { }

  ngOnInit(): void {

    this.email = this.aRoute.snapshot.params['email']
    this.title.setTitle(`Orders for: ${this.email}`)
  }

}
