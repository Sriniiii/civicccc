export type UserRole = 'citizen' | 'authority' | 'ngo';

export type IssueStatus = 'reported' | 'assigned' | 'in_progress' | 'resolved';

export type IssueCategory = 
  | 'pothole' 
  | 'garbage' 
  | 'streetlight' 
  | 'waterlogging' 
  | 'drainage' 
  | 'roadwork' 
  | 'water_supply' 
  | 'electricity' 
  | 'other';

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  latitude: number;
  longitude: number;
  address: string;
  photos: string[];
  upvotes: number;
  comments_count: number;
  reported_by: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
}

export interface Comment {
  id: string;
  issue_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'issue_update' | 'assignment' | 'resolution' | 'comment' | 'upvote';
  read: boolean;
  created_at: string;
}
