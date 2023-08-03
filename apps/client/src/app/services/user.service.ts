import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { User } from '@money-sprouts/shared/domain';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSubject = new BehaviorSubject<User[] | null>(null);
  users$ = this.usersSubject.asObservable();

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[] | null> {
    const users = this.usersSubject.getValue();
    if (users !== null) {
      return of(users);
    }
    return this.http.get<User[]>('/assets/settings.json').pipe(
      tap((users) => {
        this.usersSubject.next(users);
      })
    );
  }

  setUser(user: User) {
    this.userSubject.next(user);
  }

  fetchUser(username: string): Observable<User | null> {
    return this.users$.pipe(
      map((users) => users?.find((user) => user.name === username) || null),
      tap((user) => {
        if (user) {
          this.setUser(user);
        }
      })
    );
  }
}
