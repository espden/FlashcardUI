import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  navigateToHome() {
    this._router.navigate(['']);
  }

  navigateToStudy() {
    this._router.navigate(['/study']);
  }

  navigateToFlashcards() {
    this._router.navigate(['/view']);
  }

}