
export type Rack = {
  id: string;
  title: string;
  description: string;
  owner: {
    id: string;
    name: string;
    avatarUrl: string;
    businessName?: string;
  };
  location: string;
  pincode: string;
  weeklyRent: number;
  dailyFootfall: number;
  weeklyFootfall: number;
  dailySales: number;
  weeklySales: number;
  photos: string[];
  status: 'Available' | 'Rented';
  category: string;
};

export type User = {
  uid: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  businessName?: string;
  avatarUrl: string | null;
};
