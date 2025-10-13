// Multi-language support for SabiBoss
// Languages: English, Hausa, Pidgin

export type Language = 'en' | 'ha' | 'pidgin';

export interface Translations {
  [key: string]: {
    en: string;
    ha: string;
    pidgin: string;
  };
}

export const translations: Translations = {
  // Navigation
  dashboard: { en: 'Dashboard', ha: 'Dashboard', pidgin: 'Dashboard' },
  inventory: { en: 'Inventory', ha: 'Kaya', pidgin: 'Stock' },
  sales: { en: 'Sales', ha: 'Tallace-tallace', pidgin: 'Sales' },
  expenses: { en: 'Expenses', ha: 'Kashe kuɗi', pidgin: 'Expenses' },
  customers: { en: 'Customers', ha: 'Abokan ciniki', pidgin: 'Customers' },
  loans: { en: 'Loans', ha: 'Rancen kuɗi', pidgin: 'Loans' },
  tips: { en: 'Tips', ha: 'Shawarwari', pidgin: 'Tips' },
  profile: { en: 'Profile', ha: 'Bayanan mai amfani', pidgin: 'Profile' },
  
  // Auth
  login: { en: 'Login', ha: 'Shiga', pidgin: 'Enter' },
  signup: { en: 'Sign Up', ha: 'Yi rajista', pidgin: 'Register' },
  logout: { en: 'Logout', ha: 'Fita', pidgin: 'Comot' },
  phone: { en: 'Phone Number', ha: 'Lambar waya', pidgin: 'Phone Number' },
  password: { en: 'Password', ha: 'Kalmar wucewa', pidgin: 'Password' },
  fullName: { en: 'Full Name', ha: 'Cikakken suna', pidgin: 'Your Name' },
  businessName: { en: 'Business Name', ha: 'Sunan kasuwanci', pidgin: 'Business Name' },
  
  // Dashboard
  totalSales: { en: 'Total Sales', ha: 'Jimlar tallace-tallace', pidgin: 'Total Sales' },
  totalExpenses: { en: 'Total Expenses', ha: 'Jimlar kashe kuɗi', pidgin: 'Total Expenses' },
  profit: { en: 'Profit', ha: 'Riba', pidgin: 'Profit' },
  stockAlerts: { en: 'Stock Alerts', ha: 'Sanarwar kaya', pidgin: 'Low Stock' },
  
  // Common
  add: { en: 'Add', ha: 'Ƙara', pidgin: 'Add' },
  edit: { en: 'Edit', ha: 'Gyara', pidgin: 'Edit' },
  delete: { en: 'Delete', ha: 'Share', pidgin: 'Delete' },
  save: { en: 'Save', ha: 'Ajiye', pidgin: 'Save' },
  cancel: { en: 'Cancel', ha: 'Soke', pidgin: 'Cancel' },
  total: { en: 'Total', ha: 'Jimla', pidgin: 'Total' },
  date: { en: 'Date', ha: 'Kwanan wata', pidgin: 'Date' },
  amount: { en: 'Amount', ha: 'Adadi', pidgin: 'Amount' },
  description: { en: 'Description', ha: 'Bayani', pidgin: 'Description' },
  loading: { en: 'Loading...', ha: 'Ana lodi...', pidgin: 'Dey load...' },
  
  // Actions
  recordSale: { en: 'Record Sale', ha: 'Yi rikodin tallace-tallace', pidgin: 'Record Sale' },
  recordVoice: { en: 'Record Voice', ha: 'Yi rikodin murya', pidgin: 'Record Voice' },
  sendWhatsApp: { en: 'Send WhatsApp', ha: 'Aika WhatsApp', pidgin: 'Send WhatsApp' },
  upgradePlan: { en: 'Upgrade to Premium', ha: 'Haɓaka zuwa Premium', pidgin: 'Upgrade to Premium' },
  
  // Subscription
  freeTier: { en: 'Free Tier', ha: 'Kyauta', pidgin: 'Free Plan' },
  premiumTier: { en: 'Premium (₦500/month)', ha: 'Premium (₦500/wata)', pidgin: 'Premium (₦500/month)' },
  upgradeToPremium: { en: 'Upgrade to Premium', ha: 'Haɓaka zuwa Premium', pidgin: 'Upgrade to Premium' },
  
  // Offline
  offlineMode: { en: 'Offline Mode', ha: 'Aikin layi ba tare da', pidgin: 'No Internet' },
  syncing: { en: 'Syncing...', ha: 'Ana daidaitawa...', pidgin: 'Syncing...' },
};

export const getTranslation = (key: string, lang: Language): string => {
  return translations[key]?.[lang] || key;
};
