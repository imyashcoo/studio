


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


export type Bid = {
  id: string;
  rackId: string;
  rackTitle: string;
  bidder: {
    id: string;
    name: string;
  };
  ownerId: string;
  amount: number; // Proposed weekly rent
  tenure: number; // in weeks
  status: 'Pending' | 'Accepted' | 'Rejected';
};

export type PremiumInquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  website: string;
  goal: string;
  location: string;
  budget: string;
  numberOfRacks: number;
  message: string;
};
