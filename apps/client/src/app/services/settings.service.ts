import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface Settings {
  users: User[];
}

export interface User {
  username: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private http: HttpClient) { }

  getSettings(): Observable<Settings> {
    return this.http.get<Settings>('/assets/settings.json');
  }

  getUsers(): Observable<User[]> {
    return this.http.get<Settings>('/assets/settings.json').pipe(map(settings => settings.users));
  }
}