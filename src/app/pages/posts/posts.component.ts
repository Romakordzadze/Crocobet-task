import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Post, User } from '../../models/interfaces';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  users: User[] = [];
  loading: boolean = true;
  selectedPost: Post | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    
    this.apiService.getUsers().subscribe(users => {
      this.users = users;
      
      this.apiService.getPosts().subscribe(posts => {
        this.posts = posts;
        this.loading = false;
      });
    });
  }

  getUserName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  }

  openPostDetail(post: Post) {
    this.selectedPost = post;
  }

  closePostDetail() {
    this.selectedPost = null;
  }
}