// User Model
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

// Post Model
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Todo Model
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Leaderboard Models
export type WeekType = 'I' | 'II' | 'III' | 'IV';

export interface LeaderboardEntry {
  customerId: number;
  loginName: string;
  place: number;
  week: WeekType;
}

// Helper type for User display in table
export interface UserTableData {
  id: number;
  name: string;
  phone: string;
  email: string;
  companyName: string;
}