import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { User, Post, Todo } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  // Users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        return of([]);
      })
    );
  }

  getUserById(id: number): Observable<User | undefined> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching user:', error);
        return of(undefined);
      })
    );
  }

  // Posts
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`).pipe(
      catchError(error => {
        console.error('Error fetching posts:', error);
        return of([]);
      })
    );
  }

  getPostsByUserId(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts?userId=${userId}`).pipe(
      catchError(error => {
        console.error('Error fetching user posts:', error);
        return of([]);
      })
    );
  }

  // Todos
  getTodosByUserId(userId: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/todos?userId=${userId}`).pipe(
      catchError(error => {
        console.error('Error fetching todos:', error);
        return of([]);
      })
    );
  }

  // Helper method to get user name by ID
  getUserName(userId: number): Observable<string> {
    return this.getUserById(userId).pipe(
      map(user => user ? user.name : 'Unknown User')
    );
  }
}