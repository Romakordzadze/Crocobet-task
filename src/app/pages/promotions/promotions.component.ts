import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeaderboardService } from '../../services/leaderboard.service';
import { LeaderboardEntry, WeekType } from '../../models/interfaces';

@Component({
  selector: 'app-promotions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  // Wheel properties
  sectors = Array(10).fill(0);
  rotation = 0;
  targetSector: number | null = null;
  isSpinning = false;
  errorMessage = '';
  successMessage = '';

  // Leaderboard properties
  leaderboardData: LeaderboardEntry[] = [];
  filteredLeaderboard: LeaderboardEntry[] = [];
  weekFilters: (WeekType | 'ALL')[] = ['ALL', 'I', 'II', 'III', 'IV'];
  activeFilter: WeekType | 'ALL' = 'ALL';

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit() {
    this.initializeLeaderboard();
  }

  // Wheel Methods
  getSectorPath(index: number): string {
    const angle = 36; // 360 / 10
    const startAngle = index * angle - 90;
    const endAngle = startAngle + angle;
    
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = 150 + 145 * Math.cos(startRad);
    const y1 = 150 + 145 * Math.sin(startRad);
    const x2 = 150 + 145 * Math.cos(endRad);
    const y2 = 150 + 145 * Math.sin(endRad);
    
    return `M 150,150 L ${x1},${y1} A 145,145 0 0,1 ${x2},${y2} Z`;
  }

  getSectorColor(index: number): string {
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];
    return colors[index % colors.length];
  }

  getSectorTextX(index: number): number {
    const angle = 36 * index + 18 - 90;
    const rad = (angle * Math.PI) / 180;
    return 150 + 100 * Math.cos(rad);
  }

  getSectorTextY(index: number): number {
    const angle = 36 * index + 18 - 90;
    const rad = (angle * Math.PI) / 180;
    return 150 + 100 * Math.sin(rad) + 5;
  }

  spinWheel() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.targetSector || this.targetSector < 1 || this.targetSector > 10) {
      this.errorMessage = 'აღნიშნული სექტორი ვერ მოიძებნა';
      return;
    }

    this.isSpinning = true;
    
    const sectorAngle = (this.targetSector - 1) * 36;
    const sectorCenter = sectorAngle + 18;

    const currentRotation = this.rotation % 360;
    

    const targetAngle = -sectorCenter;

    let angleDifference = (currentRotation - targetAngle) % 360;
    if (angleDifference < 0) angleDifference += 360;

    const spins = 5;
    const additionalRotation = 360 * spins + angleDifference;
    
 
    this.rotation = this.rotation - additionalRotation;

    setTimeout(() => {
      this.isSpinning = false;
      this.successMessage = `ბორბალი გაჩერდა სექტორზე: ${this.targetSector}`;
    }, 3000);
  }

  // Leaderboard Methods
  initializeLeaderboard() {
    this.leaderboardData = this.leaderboardService.generateLeaderboardData();
    this.filteredLeaderboard = this.leaderboardData;
  }

  filterLeaderboard(week: WeekType | 'ALL') {
    this.activeFilter = week;
    this.filteredLeaderboard = this.leaderboardService.filterByWeek(this.leaderboardData, week);
    this.filteredLeaderboard = this.leaderboardService.sortByPlace(this.filteredLeaderboard);
  }
}