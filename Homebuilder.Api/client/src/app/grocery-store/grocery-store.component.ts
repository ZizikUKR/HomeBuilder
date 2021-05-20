import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grocery-store',
  templateUrl: './grocery-store.component.html',
  styleUrls: ['./grocery-store.component.scss']
})
export class GroceryStoreComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
