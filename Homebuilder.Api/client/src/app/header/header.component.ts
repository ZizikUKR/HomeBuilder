import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class HeaderComponent implements OnInit {
  toggleView: boolean = false;

  constructor(private router: Router, private _eref: ElementRef) { }

  ngOnInit() {
  }

  toggleViewMenu() {
    this.toggleView = !this.toggleView;
  }
  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.toggleView = false;
    }
  }
}
