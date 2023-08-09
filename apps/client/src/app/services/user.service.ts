import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, shareReplay, take, tap, throwError } from 'rxjs';
import { User } from '@money-sprouts/shared/domain';
import { ApiService } from './api.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable().pipe(
    tap(user => console.log('Emission from currentUser$: ', user)),
    shareReplay(1)
  );
  loading = new BehaviorSubject<boolean>(false);

   // Declare users$ as an Observable using shareReplay and cache last emitted value
   private users$ = this.api.getUsers().pipe(
    tap(users => console.log('Fetched users: ', users)), 
    catchError(err => {
      console.error("Error fetching users:", err);
      return throwError(() => err); 
    }),
    shareReplay(1)
  );

  constructor(
    private http: HttpClient,
    private api: ApiService) {
      const savedUser = localStorage.getItem('selectedUser');
      if (savedUser) {
        this.currentUserSubject.next(JSON.parse(savedUser));
      }
    }

  // fetch all users and use tap to store them locally
  getUsers(): Observable<User[]> {
    return this.users$;
  }

  getUserByUsername(username: string): void {
    this.users$.subscribe(users => {
      const user = users.find(user => user.name === username);
      // currentUserSubject only emits new value if user is not the same as the current one
      if(!this.currentUserSubject.getValue() || (user && user.id !== this.currentUserSubject.getValue().id)){
        this.currentUserSubject.next(user);
      }
    });
  }

  setUser(user: User) {
    console.log("Storing selected user in local storage: ", JSON.stringify(user));
    localStorage.setItem('selectedUser', JSON.stringify(user));
    console.log("Setting user:", user);
    this.currentUserSubject.next(user);
  }

  getAvatarForUser(user: User | null): string {
    if (!user) return '';
    
    switch (user.name) {
      case 'Thea':
        return 'assets/images/avatar_female.png';
      case 'Robert':
        return 'assets/images/avatar_male.png';
      default:
        return '';
    }
  }

  logoutOrDeselectUser() {
    this.loading.next(true);
    localStorage.removeItem('selectedUser');
    this.currentUserSubject.next(null);
    this.loading.next(false);
  }
}

export const usersResolver: ResolveFn<User[]> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> => {
        return inject(UserService).getUsers();
    };
