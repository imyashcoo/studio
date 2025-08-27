

export type Rack = {
  id: string;
  title: string;
  description: string;
  owner: {
    id:string;
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
  status: 'Available' | 'Rented' | 'Pending Approval' | 'Rejected';
  category: string;
};

export type User = {
  id?: string;
  uid: string;
  name: string | null;
  email: string | null;
  mobile: string | null;
  whatsapp?: string | null;
  businessName?: string;
  avatarUrl?: string | null;
  password?: string; // This is only used for the mock DB, not for client-side state
  isAdmin?: boolean;
};


