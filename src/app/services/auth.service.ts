import { Observable, BehaviorSubject } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

export const ANONYMOUS_USER: User = {
  id: undefined,
  email: ''
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private userSubject: BehaviorSubject<User> = new BehaviorSubject(
    ANONYMOUS_USER
  );

  userObservable: Observable<User> = this.userSubject.asObservable();

  isLoggedInObservable: Observable<boolean> = this.userObservable.pipe(
    map(user => !!user.id)
  );

  isLoggedOutObservable: Observable<boolean> = this.isLoggedInObservable.pipe(
    map(isLoggedIn => !isLoggedIn)
  );

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
