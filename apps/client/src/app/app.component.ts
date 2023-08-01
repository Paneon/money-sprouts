import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'money-sprouts-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Money Pig';
  private readonly destroy$ = new Subject();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.initialNavigation();
  }

  ngOnDestroy() {
    this.router.navigate(['']);
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
