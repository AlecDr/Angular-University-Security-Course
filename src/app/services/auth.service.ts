import { Observable, BehaviorSubject } from 'rxjs';
import { map, shareReplay, tap, filter } from 'rxjs/operators';
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
  private userSubject: BehaviorSubject<User> = new BehaviorSubject(undefined);

  userObservable: Observable<User> = this.userSubject
    .asObservable()
    .pipe(filter(user => !!user));

  isLoggedInObservable: Observable<boolean> = this.userObservable.pipe(
    map(user => !!user.id)
  );
  isLoggedOutObservable: Observable<boolean> = this.isLoggedInObservable.pipe(
    map(isLoggedIn => !isLoggedIn)
  );

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    this.http.get<User>('/api/user').subscribe(
      user => {
        this.userSubject.next(user);
      },
      error => {
        this.userSubject.next(ANONYMOUS_USER);
      }
    );
  }

  logout(): Observable<any> {
    return this.http.post('/api/logout', null).pipe(
      shareReplay(),
      tap(() => {
        this.userSubject.next(ANONYMOUS_USER);
      })
    );
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

  signIn(email: string, password: string) {
    return this.http
      .post<User>('/api/signin', {
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
