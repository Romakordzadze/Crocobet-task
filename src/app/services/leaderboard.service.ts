import { Injectable } from '@angular/core';
import { LeaderboardEntry, WeekType } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  
  // გენერირება შემთხვევითი სტრინგის
  private generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // გენერირება შემთხვევითი რიცხვის
  private generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // შემთხვევითი week type-ის არჩევა
  private getRandomWeekType(): WeekType {
    const weeks: WeekType[] = ['I', 'II', 'III', 'IV'];
    return weeks[Math.floor(Math.random() * weeks.length)];
  }

  // ლიდერბორდის მონაცემების გენერირება
  generateLeaderboardData(): LeaderboardEntry[] {
    const entries: LeaderboardEntry[] = [];
    const weeks: WeekType[] = ['I', 'II', 'III', 'IV'];
    
    // თითოეული კვირისთვის მინიმუმ 12 ჩანაწერი
    weeks.forEach(week => {
      const entriesPerWeek = this.generateRandomNumber(12, 15);
      
      for (let i = 1; i <= entriesPerWeek; i++) {
        entries.push({
          customerId: this.generateRandomNumber(10000, 99999),
          loginName: `user_${this.generateRandomString(6)}`,
          place: i,
          week: week
        });
      }
    });

    return entries;
  }

  // ფილტრაცია კვირის მიხედვით
  filterByWeek(entries: LeaderboardEntry[], week: WeekType | 'ALL'): LeaderboardEntry[] {
    if (week === 'ALL') {
      return entries;
    }
    return entries.filter(entry => entry.week === week);
  }

  // სორტირება place-ის მიხედვით
  sortByPlace(entries: LeaderboardEntry[]): LeaderboardEntry[] {
    return [...entries].sort((a, b) => a.place - b.place);
  }
}