
export interface User {
  id: string;
  email: string;
  username: string;
  role: 'student' | 'club' | 'admin';
  createdAt: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  venue: string;
  date: string;
  time: string;
  totalSeats: number;
  availableSeats: number;
  ticketPrice: number;
  tags: string[];
  clubId: string;
  clubName: string;
  imageUrl?: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  eventId: string;
  numberOfSeats: number;
  bookingDate: string;
  event: Event;
}

export interface AuthUser {
  user: User;
  token: string;
}
