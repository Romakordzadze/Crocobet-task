import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Post, User } from '../../models/interfaces';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  posts: Post[] = [];
  user: User | undefined;
  userId!: number;
  loading: boolean = true;
  selectedPost: Post | null = null;

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

    this.apiService.getPostsByUserId(this.userId).subscribe(posts => {
      this.posts = posts;
      this.loading = false;
    });
  }

  openPostDetail(post: Post) {
    this.selectedPost = post;
  }

  closePostDetail() {
    this.selectedPost = null;
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}