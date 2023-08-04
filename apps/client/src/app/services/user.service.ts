import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, take, map, of, tap } from 'rxjs';
import { User } from '@money-sprouts/shared/domain';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] | null;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private api: ApiService) {
      this.getUsers();
    }

  private getUsers(): void {
    this.api.getUsers().subscribe(users => this.users =users);
  }

  // fetch all users
  getUserByUsername(username: string): void {
    const user = this.users.find(user => user.name === username);
    this.currentUserSubject.next(user);
  }

  setUser(user: User) {
    this.currentUserSubject.next(user);
  }
}
