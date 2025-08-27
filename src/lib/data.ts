import type { Rack, User } from '@/types';

// In a real app, this would be a real database.
// This is exported so other parts of the mock app can access it.
export const mockUserDatabase: { [key: string]: User } = {
  'user-1': {
    uid: 'user-1',
    id: 'user-1',
    name: 'Admin User',
    email: 'admin@rackup.com',
    mobile: '1234567890',
    whatsapp: '911234567890',
    businessName: 'RackUp HQ',
    avatarUrl: 'https://placehold.co/100x100.png',
    password: 'password123',
    isAdmin: true,
  },
  'user-2': {
    uid: 'user-2',
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    mobile: '0987654321',
    whatsapp: '910987654321',
    avatarUrl: 'https://placehold.co/100x100.png',
    password: 'password123'
  },
};


export const mockUsers: Omit<User, 'uid' | 'password'>[] = [
  {
    id: 'user-1',
    name: 'Admin User',
    email: 'admin@rackup.com',
    mobile: '1234567890',
    businessName: 'RackUp HQ',
    avatarUrl: 'https://placehold.co/100x100.png',
    isAdmin: true,
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    mobile: '0987654321',
    avatarUrl: 'https://placehold.co/100x100.png',
  },
];

export const mockRacks: Rack[] = [
  {
    id: 'rack-1',
    title: 'Prime Aisle End-Cap in High-Traffic Supermarket',
    description: 'Excellent visibility at the end of a busy aisle. Perfect for new product launches. Comes with optional branding panels. High footfall guaranteed.',
    owner: {
        id: 'user-1',
        name: 'Admin User',
        avatarUrl: 'https://placehold.co/100x100.png',
        businessName: 'RackUp HQ'
    },
    location: 'Downtown, Metro City',
    pincode: '110001',
    weeklyRent: 2500,
    dailyFootfall: 1200,
    weeklyFootfall: 8400,
    dailySales: 15000,
    weeklySales: 105000,
    photos: [
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
    ],
    status: 'Available',
    category: 'Food & Grocery',
  },
  {
    id: 'rack-2',
    title: 'Boutique Front Window Shelf',
    description: 'Charming shelf space in the front window of a trendy boutique. Ideal for artisanal goods, jewelry, or accessories. Attracts fashion-conscious shoppers.',
    owner: {
        id: 'user-2',
        name: 'Jane Smith',
        avatarUrl: 'https://placehold.co/100x100.png'
    },
    location: 'Arts District, Creative Town',
    pincode: '400050',
    weeklyRent: 1800,
    dailyFootfall: 400,
    weeklyFootfall: 2800,
    dailySales: 8000,
    weeklySales: 56000,
    photos: ['https://placehold.co/600x400.png'],
    status: 'Available',
    category: 'Fashion & Apparel',
  },
  {
    id: 'rack-3',
    title: 'Checkout Counter Display at Cafe',
    description: 'Compact display space right at the checkout counter. Perfect for impulse buys like snacks, drinks, or small gift items. Constant queue of customers.',
    owner: {
        id: 'user-1',
        name: 'Admin User',
        avatarUrl: 'https://placehold.co/100x100.png',
        businessName: 'RackUp HQ'
    },
    location: 'Central Park, Metro City',
    pincode: '110001',
    weeklyRent: 900,
    dailyFootfall: 800,
    weeklyFootfall: 5600,
    dailySales: 5000,
    weeklySales: 35000,
    photos: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    status: 'Rented',
    category: 'Food & Grocery',
  },
  {
    id: 'rack-4',
    title: 'Full Gondola in Electronics Store',
    description: 'A full gondola rack in a busy electronics hub. Suitable for gadgets, mobile accessories, or gaming merchandise. High-intent buyers.',
    owner: {
        id: 'user-2',
        name: 'Jane Smith',
        avatarUrl: 'https://placehold.co/100x100.png'
    },
    location: 'Tech Hub, Silicon Valley',
    pincode: '560034',
    weeklyRent: 3500,
    dailyFootfall: 950,
    weeklyFootfall: 6650,
    dailySales: 25000,
    weeklySales: 175000,
    photos: ['https://placehold.co/600x400.png'],
    status: 'Pending Approval',
    category: 'Electronics & Appliances',
  },
    {
    id: 'rack-5',
    title: 'Shelf in Organic Food Mart',
    description: 'A dedicated shelf in a popular organic food store. Great for healthy snacks, supplements, or eco-friendly products. Targets health-conscious consumers.',
    owner: {
        id: 'user-1',
        name: 'Admin User',
        avatarUrl: 'https://placehold.co/100x100.png',
        businessName: 'RackUp HQ'
    },
    location: 'Greenway, Wellness City',
    pincode: '600028',
    weeklyRent: 1500,
    dailyFootfall: 600,
    weeklyFootfall: 4200,
    dailySales: 10000,
    weeklySales: 70000,
    photos: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    status: 'Available',
    category: 'Food & Grocery',
  },
  {
    id: 'rack-6',
    title: 'Bookstore Entrance Display Stand',
    description: 'A standalone display stand near the entrance of a popular bookstore. Excellent for magazines, stationery, or author promotions.',
    owner: {
        id: 'user-2',
        name: 'Jane Smith',
        avatarUrl: 'https://placehold.co/100x100.png'
    },
    location: 'University Area, Scholar Town',
    pincode: '400098',
    weeklyRent: 1200,
    dailyFootfall: 700,
    weeklyFootfall: 4900,
    dailySales: 6000,
    weeklySales: 42000,
    photos: ['https://placehold.co/600x400.png'],
    status: 'Rented',
    category: 'Books, Stationery & Gifts',
  },
];


export const locations = [
	{ state: 'Andhra Pradesh', cities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Kurnool'] },
	{ state: 'Arunachal Pradesh', cities: ['Itanagar', 'Tawang', 'Pasighat', 'Ziro', 'Bomdila'] },
	{ state: 'Assam', cities: ['Guwahati', 'Dibrugarh', 'Jorhat', 'Silchar', 'Tezpur'] },
	{ state: 'Bihar', cities: ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga'] },
	{ state: 'Chhattisgarh', cities: ['Raipur', 'Bilaspur', 'Durg', 'Bhilai', 'Korba'] },
	{ state: 'Goa', cities: ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda'] },
	{ state: 'Gujarat', cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'] },
	{ state: 'Haryana', cities: ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Karnal'] },
	{ state: 'Himachal Pradesh', cities: ['Shimla', 'Manali', 'Dharamshala', 'Mandi', 'Solan'] },
	{ state: 'Jharkhand', cities: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh'] },
	{ state: 'Karnataka', cities: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi', 'Belagavi'] },
	{ state: 'Kerala', cities: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kollam', 'Thrissur'] },
	{ state: 'Madhya Pradesh', cities: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain'] },
	{ state: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'] },
	{ state: 'Manipur', cities: ['Imphal', 'Thoubal', 'Churachandpur', 'Ukhrul', 'Senapati'] },
	{ state: 'Meghalaya', cities: ['Shillong', 'Tura', 'Jowai', 'Nongstoin', 'Williamnagar'] },
	{ state: 'Mizoram', cities: ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip', 'Kolasib'] },
	{ state: 'Nagaland', cities: ['Kohima', 'Dimapur', 'Mokokchung', 'Wokha', 'Tuensang'] },
	{ state: 'Odisha', cities: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Sambalpur', 'Puri'] },
	{ state: 'Punjab', cities: ['Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Bathinda'] },
	{ state: 'Rajasthan', cities: ['Jaipur', 'Udaipur', 'Jodhpur', 'Kota', 'Ajmer'] },
	{ state: 'Sikkim', cities: ['Gangtok', 'Namchi', 'Gyalshing', 'Mangan', 'Rangpo'] },
	{ state: 'Tamil Nadu', cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'] },
	{ state: 'Telangana', cities: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam'] },
	{ state: 'Tripura', cities: ['Agartala', 'Udaipur', 'Dharmanagar', 'Kailashahar', 'Belonia'] },
	{ state: 'Uttar Pradesh', cities: ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Noida'] },
	{ state: 'Uttarakhand', cities: ['Dehradun', 'Haridwar', 'Rishikesh', 'Nainital', 'Haldwani'] },
	{ state: 'West Bengal', cities: ['Kolkata', 'Siliguri', 'Asansol', 'Durgapur', 'Howrah'] },
	{ state: 'Jammu & Kashmir', cities: ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Udhampur'] }
];

export const businessCategories = [
    { main: 'Food & Grocery', sub: ['Supermarkets & Hypermarkets', 'Convenience Stores', 'Kirana Stores', 'Organic/Natural Food Stores', 'Specialty Foods (bakery, dairy, meat, seafood, sweets)'] },
    { main: 'Fashion & Apparel', sub: ['Men’s Clothing', 'Women’s Clothing', 'Kids’ & Infants’ Wear', 'Footwear & Accessories', 'Ethnic Wear / Designer Boutiques'] },
    { main: 'Electronics & Appliances', sub: ['Consumer Electronics (mobiles, TVs, laptops)', 'Home Appliances (refrigerators, washing machines)', 'Mobile & Gadget Accessories', 'Repair & Service Outlets'] },
    { main: 'Health & Beauty', sub: ['Pharmacies / Chemists', 'Wellness & Nutrition Stores', 'Cosmetics & Personal Care', 'Salons & Spas', 'Ayurvedic / Herbal Products'] },
    { main: 'Home & Living', sub: ['Furniture & Home Decor', 'Kitchenware & Dining', 'Home Furnishings (curtains, beddings, carpets)', 'Lighting & Electricals', 'Hardware & Tools'] },
    { main: 'Jewelry & Luxury Goods', sub: ['Gold, Silver & Diamond Stores', 'Imitation Jewelry', 'Watches & Luxury Accessories'] },
    { main: 'Books, Stationery & Gifts', sub: ['Bookstores', 'Stationery & Office Supplies', 'Gift Shops & Souvenirs', 'Toys & Games'] },
    { main: 'Sports & Fitness', sub: ['Sports Equipment & Apparel', 'Fitness Gear & Supplements', 'Outdoor & Adventure Gear'] },
    { main: 'Automotive & Accessories', sub: ['Vehicle Showrooms', 'Spare Parts & Accessories', 'Car/Bike Care & Service Shops'] },
    { main: 'Departmental & Variety Stores', sub: ['Department Stores', 'Discount Stores', 'Dollar/Value Shops'] },
    { main: 'Entertainment & Leisure', sub: ['Music & Gaming Shops', 'Hobby Stores (art, craft, collectibles)', 'Pet Stores & Accessories'] },
    { main: 'Services (Retail-Oriented)', sub: ['Dry Cleaning & Laundry', 'Courier & Logistics', 'Printing & Photocopying', 'Travel & Ticketing Agents'] }
];
