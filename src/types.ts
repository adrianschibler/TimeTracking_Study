export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
}

export interface TimeEntry {
  id: string;
  userId: string;
  date: string; // ISO date string (YYYY-MM-DD)
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  description: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}
