import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from './model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userObservable: Observable<User>;
  isLoggedInObservable: Observable<boolean>;
  isLoggedOutObservable: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userObservable = this.authService.userObservable;
    this.isLoggedInObservable = this.authService.isLoggedInObservable;
    this.isLoggedOutObservable = this.authService.isLoggedOutObservable;
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
