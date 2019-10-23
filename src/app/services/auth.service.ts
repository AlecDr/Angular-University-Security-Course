import { Observable, BehaviorSubject } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { User } from '../model/user';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export const ANONYMOUS_USER: User = {
  id: undefined,
  email: ''
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;

  userObservable: Observable<User>;
  isLoggedInObservable: Observable<boolean>;
  isLoggedOutObservable: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject(ANONYMOUS_USER);

    http.get<User>('/api/user').subscribe(user => {
      user
        ? this.userSubject.next(user)
        : this.userSubject.next(ANONYMOUS_USER);

      console.log(user);
    });

    this.userObservable = this.userSubject.asObservable();
    this.isLoggedInObservable = this.userObservable.pipe(
      map(user => !!user.id)
    );
    this.isLoggedOutObservable = this.isLoggedInObservable.pipe(
      map(isLoggedIn => !isLoggedIn)
    );
  }

  private checkAuthStatus(): boolean {
    return;
  }

  signUp(email: string, password: string) {
    return this.http
      .post<User>('/api/signup', {
        email,
        password
      })
      .pipe(
        shareReplay(),
        tap((user: User) => {
          this.userSubject.next(user);
        })
      );
  }
}
