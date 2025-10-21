import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Todo, User } from '../../models/interfaces';

@Component({
  selector: 'app-user-todos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-todos.component.html',
  styleUrls: ['./user-todos.component.css']
})
export class UserTodosComponent implements OnInit {
  todos: Todo[] = [];
  user: User | undefined;
  userId!: number;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params['userId'];
      this.loadUserData();
    });
  }

  loadUserData() {
    this.loading = true;

    this.apiService.getUserById(this.userId).subscribe(user => {
      this.user = user;
    });

    this.apiService.getTodosByUserId(this.userId).subscribe(todos => {
      this.todos = todos;
      this.loading = false;
    });
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}