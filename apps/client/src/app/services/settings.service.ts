import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Settings {
  usernames: string[];
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
    return this.http.get<User[]>('/assets/settings.json');
  }
}