import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent)
  },
  {
    path: 'posts',
    loadComponent: () => import('./pages/posts/posts.component').then(m => m.PostsComponent)
  },
  {
    path: 'posts/:userId',
    loadComponent: () => import('./pages/user-posts/user-posts.component').then(m => m.UserPostsComponent)
  },
  {
    path: 'todos/:userId',
    loadComponent: () => import('./pages/user-todos/user-todos.component').then(m => m.UserTodosComponent)
  },
  {
    path: 'promotions',
    loadComponent: () => import('./pages/promotions/promotions.component').then(m => m.PromotionsComponent)
  },
  {
    path: '**',
    redirectTo: '/users'
  }
];