export interface Business {
  id: number;
  name: string;
  category: string;
  rating: number;
  location: string;
  image: string;
  description: string;
  price_range: string;
  is_online: boolean;
}

export interface Post {
  id: number;
  business_id: number;
  business_name: string;
  business_logo: string;
  content: string;
  image: string;
  likes: number;
  created_at: string;
}

export interface Booking {
  id: number;
  user_id: number;
  business_id: number;
  slot: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}
