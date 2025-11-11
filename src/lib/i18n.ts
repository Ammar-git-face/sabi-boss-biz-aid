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
  name: { en: 'Name', ha: 'Suna', pidgin: 'Name' },
  email: { en: 'Email', ha: 'Imel', pidgin: 'Email' },
  category: { en: 'Category', ha: 'Nau\'i', pidgin: 'Category' },
  quantity: { en: 'Quantity', ha: 'Adadi', pidgin: 'Quantity' },
  price: { en: 'Price', ha: 'Farashin', pidgin: 'Price' },
  product: { en: 'Product', ha: 'Samfur', pidgin: 'Product' },
  customer: { en: 'Customer', ha: 'Abokin ciniki', pidgin: 'Customer' },
  optional: { en: 'Optional', ha: 'Na zaɓi', pidgin: 'Optional' },
  search: { en: 'Search', ha: 'Nema', pidgin: 'Search' },
  
  // Actions
  recordSale: { en: 'Record Sale', ha: 'Yi rikodin tallace-tallace', pidgin: 'Record Sale' },
  recordVoice: { en: 'Record Voice', ha: 'Yi rikodin murya', pidgin: 'Record Voice' },
  sendWhatsApp: { en: 'Send WhatsApp', ha: 'Aika WhatsApp', pidgin: 'Send WhatsApp' },
  upgradePlan: { en: 'Upgrade to Premium', ha: 'Haɓaka zuwa Premium', pidgin: 'Upgrade to Premium' },
  
  // Subscription
  freeTier: { en: 'Free Tier', ha: 'Kyauta', pidgin: 'Free Plan' },
  premiumTier: { en: 'Premium (₦500/month)', ha: 'Premium (₦500/wata)', pidgin: 'Premium (₦500/month)' },
  
  // Offline
  offlineMode: { en: 'Offline Mode', ha: 'Aikin layi ba tare da', pidgin: 'No Internet' },
  syncing: { en: 'Syncing...', ha: 'Ana daidaitawa...', pidgin: 'Syncing...' },
  
  // Profile & Settings
  manageInfo: { en: 'Manage your business information', ha: 'Sarrafa bayanan kasuwancin ku', pidgin: 'Manage your business info' },
  upgradeToPremium: { en: 'Upgrade to Premium', ha: 'Haɓaka zuwa Premium', pidgin: 'Upgrade to Premium' },
  premiumDescription: { en: 'Get SMS reminders, advanced analytics, cloud backup, and more for just ₦500/month', ha: 'Sami tunatarwar SMS, bincike mai zurfi, da sauransu a ₦500 kowane wata', pidgin: 'Get SMS reminder, better analytics, cloud backup, and more for just ₦500/month' },
  
  // Loans & Savings
  loansAndSavings: { en: 'Loans & Savings', ha: 'Rancen kuɗi da Ajiya', pidgin: 'Loans & Savings' },
  manageFinances: { en: 'Manage your business finances', ha: 'Sarrafa kuɗin kasuwancin ku', pidgin: 'Manage your business money' },
  businessLoan: { en: 'Business Loan', ha: 'Rancen Kasuwanci', pidgin: 'Business Loan' },
  availableCredit: { en: 'Available Credit', ha: 'Kuɗin da ake da shi', pidgin: 'Available Credit' },
  requestLoan: { en: 'Request Loan', ha: 'Nemi rancen kuɗi', pidgin: 'Request Loan' },
  currentLoan: { en: 'Current Loan', ha: 'Rancen yanzu', pidgin: 'Current Loan' },
  interestRate: { en: 'Interest Rate', ha: 'Riba', pidgin: 'Interest Rate' },
  totalDue: { en: 'Total Due', ha: 'Jimlar bashi', pidgin: 'Total Due' },
  monthlyPayment: { en: 'Monthly Payment', ha: 'Biyan kowane wata', pidgin: 'Monthly Payment' },
  dueDate: { en: 'Due Date', ha: 'Ranar biyan', pidgin: 'Due Date' },
  paymentProgress: { en: 'Payment Progress', ha: 'Ci gaba da biya', pidgin: 'Payment Progress' },
  savingsWallet: { en: 'Savings Wallet', ha: 'Jakar Ajiya', pidgin: 'Savings Wallet' },
  totalSaved: { en: 'Total Saved', ha: 'Jimlar ajiyan kuɗi', pidgin: 'Total Saved' },
  addToSavings: { en: 'Add to Savings', ha: 'Ƙara zuwa Ajiya', pidgin: 'Add to Savings' },
  savingsPlan: { en: 'Savings Plan', ha: 'Tsarin Ajiya', pidgin: 'Savings Plan' },
  weeklyTarget: { en: 'Weekly Target', ha: 'Manufar mako', pidgin: 'Weekly Target' },
  remainingToGoal: { en: 'Remaining to Goal', ha: 'Ragowar zuwa manufa', pidgin: 'Remaining to Goal' },
  estimatedTime: { en: 'Estimated Time', ha: 'Lokacin da aka kiyasta', pidgin: 'Estimated Time' },
  loanType: { en: 'Loan Type', ha: 'Nau\'in Rancen', pidgin: 'Loan Type' },
  moneyBorrowed: { en: 'Money Borrowed', ha: 'Kuɗin da aka Rance', pidgin: 'Money wey you borrow' },
  moneyLent: { en: 'Money Lent', ha: 'Kuɗin da aka Ba', pidgin: 'Money wey you lend' },
  lenderName: { en: 'Lender Name', ha: 'Sunan Mai Ba da Rancen', pidgin: 'Person wey lend you money' },
  borrowerName: { en: 'Borrower Name', ha: 'Sunan Mai Karɓan Rancen', pidgin: 'Person wey borrow money' },
  submitRequest: { en: 'Submit Request', ha: 'Ƙaddamar da Buƙata', pidgin: 'Send Request' },
  saveOffline: { en: 'Save Offline', ha: 'Ajiye Offline', pidgin: 'Save Offline' },
  offlineRequests: { en: 'Offline Requests', ha: 'Buƙatun Offline', pidgin: 'Offline Requests' },
  pendingSync: { en: 'Pending Sync', ha: 'Ana Jira Sync', pidgin: 'Dey wait to sync' },
  transactionHistory: { en: 'Transaction History', ha: 'Tarihin Ma\'amala', pidgin: 'Transaction History' },
  noLoansYet: { en: 'No loans recorded yet', ha: 'Babu Rancen da aka Rubuta Tukuna', pidgin: 'No loan yet' },
  totalBorrowed: { en: 'Total Borrowed', ha: 'Jimlar da aka Rance', pidgin: 'Total wey you borrow' },
  totalLent: { en: 'Total Lent', ha: 'Jimlar da aka Ba', pidgin: 'Total wey you lend' },
  pendingRepayment: { en: 'Pending Repayment', ha: 'Biyan da Ake Jira', pidgin: 'Money wey remain' },
  borrowed: { en: 'Borrowed', ha: 'An Rance', pidgin: 'Borrowed' },
  lent: { en: 'Lent', ha: 'An Ba', pidgin: 'Lent' },
  repaid: { en: 'Repaid', ha: 'An Biya', pidgin: 'Paid back' },
  
  // Tips
  businessTips: { en: 'Business Tips', ha: 'Shawarwarin Kasuwanci', pidgin: 'Business Tips' },
  smartAdvice: { en: 'Smart advice for Nigerian entrepreneurs', ha: 'Shawarwari masu wayo don \'yan kasuwa na Najeriya', pidgin: 'Smart advice for Nigerian business people' },
  tipOfDay: { en: 'Tip of the Day', ha: 'Shawarar Yau', pidgin: 'Tip of the Day' },
  essentialTips: { en: 'Essential Business Tips', ha: 'Muhimman Shawarwarin Kasuwanci', pidgin: 'Essential Business Tips' },
  wordsOfWisdom: { en: 'Words of Wisdom', ha: 'Kalmomin Hikima', pidgin: 'Words of Wisdom' },
};

export const getTranslation = (key: string, lang: Language): string => {
  return translations[key]?.[lang] || key;
};
