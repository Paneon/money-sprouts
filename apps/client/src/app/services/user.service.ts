import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';

export interface User {
  username: string;
  avatar: string;
}

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
    const currentUser = this.userSubject.getValue();
    if (currentUser && currentUser.username === username) {
      // Return the current user without making a network request if the user is already present
      return of(currentUser);
    }
    return this.users$.pipe(
      map((users) => users?.find((user) => user.username === username) || null),
      tap((user) => {
        if (user) {
          this.setUser(user);
        }
      })
    );
  }
}
