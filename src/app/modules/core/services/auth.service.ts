import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { GetUserResponse, User, UserModel } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  user = new BehaviorSubject<User | null>(null);

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(userData: UserModel): Observable<User[]> {
    return this.httpClient.get<GetUserResponse[]>(`${this.apiUrl}/users`).pipe(
      map((userArray) =>
        userArray.filter(
          (user: { username: string; password: string }) =>
            user.username === userData.username &&
            user.password === userData.password
        )
      ),
      map((userArray) =>
        userArray.map(
          (user: { email: string; username: string }) =>
            new User(user.email, user.username)
        )
      )
    );
  }
}
