import React, { useState, useRef } from 'react';
import { 
  Wrench, 
  ShoppingCart, 
  Package, 
  Search, 
  Lock, 
  Printer, 
  Send, 
  Plus, 
  FileText, 
  Settings, 
  Layers,
  ShieldAlert,
  Trash2,
  Camera,
  Moon,
  Sun,
  Image as ImageIcon,
  Users,
  MessageSquare,
  Star,
  UserPlus,
  Edit,
  BarChart3,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Calendar,
  Download,
  Wallet,
  Database,
  FileSpreadsheet,
  Upload,
  X,
  GripVertical
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('job-note');
  const [shopLogo, setShopLogo] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Sidebar Tabs State for Drag & Drop Reordering
  const [tabsOrder, setTabsOrder] = useState([
    { id: 'job-note', label: 'Job Note (Repair)', icon: FileText, badge: null },
    { id: 'kanban', label: 'Repair Board', icon: Layers, badge: 'pendingCount' },
    { id: 'pos', label: 'Sales & Billing', icon: ShoppingCart, badge: null },
    { id: 'inventory', label: 'Inventory & Parts', icon: Package, badge: null },
    { id: 'search', label: 'IMEI / Job Tracker', icon: Search, badge: null },
    { id: 'customers', label: 'Customers', icon: Users, badge: null },
    { id: 'reports', label: 'Reports & Accounts', icon: BarChart3, badge: null },
    { id: 'backup', label: 'Backup & Export', icon: Database, badge: null }
  ]);

  const [draggedTabIndex, setDraggedTabIndex] = useState(null);

  // Camera States
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isImeiScannerOpen, setIsImeiScannerOpen] = useState(false);
  const videoRef = useRef(null);
  const imeiVideoRef = useRef(null);
  const canvasRef = useRef(null);

  // Customer Management State
  const [customerSearch, setCustomerSearch] = useState('');
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [selectedCustomerForFeedback, setSelectedCustomerForFeedback] = useState(null);
  const [newFeedbackText, setNewFeedbackText] = useState('');
  const [newCustomerRating, setNewCustomerRating] = useState(5);

  // Customer Edit & Delete States
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [deletingCustomer, setDeletingCustomer] = useState(null);

  // Reports Filter State (Sales presentation format: Day, Week, Month, Year)
  const [reportDateRange, setReportDateRange] = useState('Month');

  const [newCustomerForm, setNewCustomerForm] = useState({
    name: '',
    telephone: '',
    idNumber: '',
    email: '',
    address: '',
    notes: ''
  });

  const [customers, setCustomers] = useState([
    {
      id: 'CUST-1001',
      name: 'S R Anusha',
      telephone: '0774525671',
      idNumber: '198854210982',
      email: 'anusha@gmail.com',
      address: 'School Road, Kiriella',
      totalSpent: 3800,
      jobCount: 1,
      rating: 5,
      feedbackHistory: [
        { date: '2026/04/27', text: 'Prompt payment, polite customer. Requested 6 months warranty battery.', rating: 5 }
      ]
    },
    {
      id: 'CUST-1002',
      name: 'Kalaa',
      telephone: '0779951801',
      idNumber: '199276100234',
      email: 'kalaa.repairs@gmail.com',
      address: 'Idangoda, Kiriella',
      totalSpent: 6500,
      jobCount: 1,
      rating: 4,
      feedbackHistory: [
        { date: '2026/08/05', text: 'Regular customer for board repairs.', rating: 4 }
      ]
    }
  ]);

  const [jobNotes, setJobNotes] = useState([
    {
      id: '3036',
      date: '2026/04/27',
      customerName: 'S R Anusha',
      telephone: '0774525671',
      idNumber: '198854210982',
      deviceType: 'Mobile Phone',
      deviceModel: 'Apple iPhone 11 Pro',
      imei: '864201048291029',
      repairFault: 'Battery Replacement',
      estimatedCost: 3800,
      advancePaid: 2500,
      notes: 'Customer requested 6 Months warranty battery',
      receivedWith: {
        battery: true,
        charger: false,
        cover: true,
        backPanel: true,
        simCard: false,
        bag: false
      },
      status: 'Job Done',
      completedDate: '2026/04/30',
      returnDate: '2026/05/02',
      photoUrls: []
    },
    {
      id: '3175',
      date: '2026/08/05',
      customerName: 'Kalaa',
      telephone: '0779951801',
      idNumber: '199276100234',
      deviceType: 'Mobile Phone',
      deviceModel: 'Samsung M02s',
      imei: '358901092837162',
      repairFault: 'Over heating Msg',
      estimatedCost: 6500,
      advancePaid: 1000,
      notes: 'CPU reballing required. Check board carefully.',
      receivedWith: {
        battery: true,
        charger: false,
        cover: false,
        backPanel: true,
        simCard: false,
        bag: false
      },
      status: 'Job Pending',
      completedDate: '',
      returnDate: '',
      photoUrls: []
    }
  ]);

  const [inventory] = useState([
    { id: '101', name: 'Tempered Glass (Universal)', category: 'Accessories', price: 500, stock: 45, cost: 150 },
    { id: '102', name: 'USB-C Cable Fast Charge', category: 'Accessories', price: 1200, stock: 20, cost: 450 },
    { id: '103', name: 'ZTE A31 Battery Original', category: 'Spare Parts', price: 2800, stock: 5, cost: 1800 },
    { id: '104', name: 'Samsung M02s Display Assembly', category: 'Spare Parts', price: 5500, stock: 3, cost: 3800 },
    { id: '105', name: 'Redmi 12 8GB/128GB (Brand New)', category: 'Phones', price: 48500, stock: 2, cost: 44000 }
  ]);

  const [cart, setCart] = useState([]);
  const [courierFee, setCourierFee] = useState(0);
  const [repairSettlementId, setRepairSettlementId] = useState('');
  const [settledRepair, setSettledRepair] = useState(null);

  const laptopBrands = [
    'Lenovo', 'HP', 'Dell', 'Apple', 'ASUS', 'Acer', 'MSI', 'Microsoft', 
    'Razer', 'Samsung', 'LG', 'Huawei', 'Honor', 'Gigabyte', 'Infinix', 
    'Tecno', 'Xiaomi', 'Realme', 'Chuwi', 'Framework', 'Fujitsu', 'Panasonic', 
    'Vaio', 'Dynabook', 'Medion', 'Tuxedo', 'System76', 'Origin PC', 
    'Eluktronics', 'Clevo', 'Maingear', 'Falcon Northwest', 'Digital Storm', 
    'Schenker', 'Aftershock', 'Walton', 'Multilaser'
  ];

  const tabBrands = [
    'Apple', 'Samsung', 'Lenovo', 'Amazon', 'Xiaomi', 'Huawei', 'OnePlus', 
    'Microsoft', 'Google', 'Realme', 'Oppo', 'Vivo', 'Honor', 'Nokia', 'TCL', 
    'Asus', 'Acer', 'Panasonic', 'Sony', 'LG', 'Chuwi', 'Teclast', 'Alldocube', 
    'Blackview', 'Doogee', 'Oukitel'
  ];

  const brandModelsMap = {
    'Apple': [
      'iPhone 3G', 'iPhone 3GS', 'iPhone 4', 'iPhone 4s', 
      'iPhone 5', 'iPhone 5c', 'iPhone 5s', 
      'iPhone 6', 'iPhone 6 Plus', 'iPhone 6s', 'iPhone 6s Plus', 'iPhone SE (1st generation)', 
      'iPhone 7', 'iPhone 7 Plus', 
      'iPhone 8', 'iPhone 8 Plus', 
      'iPhone X', 'iPhone XS', 'iPhone XS Max', 'iPhone XR', 
      'iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max', 'iPhone SE (2nd generation)', 
      'iPhone 12 mini', 'iPhone 12', 'iPhone 12 Pro', 'iPhone 12 Pro Max', 
      'iPhone 13 mini', 'iPhone 13', 'iPhone 13 Pro', 'iPhone 13 Pro Max', 'iPhone SE (3rd generation)', 
      'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max', 
      'iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max', 
      'iPhone 16', 'iPhone 16 Plus', 'iPhone 16 Pro', 'iPhone 16 Pro Max', 'iPhone 16e', 
      'iPhone 17', 'iPhone Air', 'iPhone 17 Pro', 'iPhone 17 Pro Max', 'iPhone 17e', 
      'iPhone 18 Pro', 'iPhone 18 Pro Max', 'iPhone Duo'
    ],
    'Samsung': [
      'Galaxy S', 'Galaxy S II', 'Galaxy S III', 'Galaxy S4', 'Galaxy S5', 'Galaxy S6', 'Galaxy S6 Edge', 
      'Galaxy S7', 'Galaxy S7 Edge', 'Galaxy S8', 'Galaxy S8+', 'Galaxy S9', 'Galaxy S9+', 
      'Galaxy S10e', 'Galaxy S10', 'Galaxy S10+', 'Galaxy S10 5G', 'Galaxy S20', 'Galaxy S20+', 'Galaxy S20 Ultra', 
      'Galaxy S21', 'Galaxy S21+', 'Galaxy S21 Ultra', 'Galaxy S22', 'Galaxy S22+', 'Galaxy S22 Ultra', 
      'Galaxy S23', 'Galaxy S23+', 'Galaxy S23 Ultra', 'Galaxy S24', 'Galaxy S24+', 'Galaxy S24 Ultra', 
      'Galaxy S25', 'Galaxy S25+', 'Galaxy S25 Ultra', 'Galaxy S26', 'Galaxy S26+', 'Galaxy S26 Ultra', 
      'Galaxy Alpha', 'Galaxy A3', 'Galaxy A3 (2016)', 'Galaxy A3 (2017)', 'Galaxy A5', 'Galaxy A5 (2016)', 'Galaxy A5 (2017)', 
      'Galaxy A7', 'Galaxy A7 (2016)', 'Galaxy A7 (2017)', 'Galaxy A7 (2018)', 'Galaxy A6', 'Galaxy A6+', 
      'Galaxy A8 (2018)', 'Galaxy A8+ (2018)', 'Galaxy A9 (2018)', 'Galaxy A10', 'Galaxy A10e', 'Galaxy A10s', 
      'Galaxy A20', 'Galaxy A20e', 'Galaxy A20s', 'Galaxy A30', 'Galaxy A30s', 'Galaxy A40', 'Galaxy A50', 'Galaxy A50s', 'Galaxy A60', 'Galaxy A70', 'Galaxy A80', 'Galaxy A90 5G', 
      'Galaxy A11', 'Galaxy A21', 'Galaxy A21s', 'Galaxy A31', 'Galaxy A41', 'Galaxy A51', 'Galaxy A71', 
      'Galaxy A12', 'Galaxy A22', 'Galaxy A32', 'Galaxy A32 5G', 'Galaxy A42 5G', 'Galaxy A52', 'Galaxy A52s', 'Galaxy A72', 
      'Galaxy A13', 'Galaxy A23', 'Galaxy A33', 'Galaxy A53', 'Galaxy A73', 
      'Galaxy A14', 'Galaxy A24', 'Galaxy A34', 'Galaxy A54', 
      'Galaxy A15', 'Galaxy A15 5G', 'Galaxy A25', 'Galaxy A35', 'Galaxy A55', 
      'Galaxy A16', 'Galaxy A16 5G', 'Galaxy A26', 'Galaxy A36', 'Galaxy A56', 
      'Galaxy M10', 'Galaxy M20', 'Galaxy M30', 'Galaxy M40', 'Galaxy M01', 'Galaxy M01s', 'Galaxy M11', 'Galaxy M21', 'Galaxy M21s', 'Galaxy M31', 'Galaxy M31s', 'Galaxy M51', 
      'Galaxy M02', 'Galaxy M02s', 'Galaxy M12', 'Galaxy M22', 'Galaxy M32', 'Galaxy M32 5G', 'Galaxy M42 5G', 'Galaxy M52 5G', 'Galaxy M62', 
      'Galaxy M13', 'Galaxy M23', 'Galaxy M33', 'Galaxy M53', 'Galaxy M14', 'Galaxy M34', 'Galaxy M54', 
      'Galaxy M15', 'Galaxy M35', 'Galaxy M55', 'Galaxy M16', 'Galaxy M17', 'Galaxy M36', 'Galaxy M56', 
      'Galaxy J1', 'Galaxy J1 Ace', 'Galaxy J1 Ace Neo', 'Galaxy J1 (2016)', 'Galaxy J1 Nxt', 'Galaxy J1 Mini', 
      'Galaxy J2', 'Galaxy J2 (2016)', 'Galaxy J2 Pro', 'Galaxy J2 Prime', 'Galaxy J2 Core', 'Galaxy J2 Pure', 
      'Galaxy J3', 'Galaxy J3 Pro', 'Galaxy J3 (2017)', 'Galaxy J3 (2018)', 
      'Galaxy J4', 'Galaxy J4+', 'Galaxy J4 Core', 
      'Galaxy J5', 'Galaxy J5 Pro', 'Galaxy J5 Prime', 'Galaxy J5 (2016)', 'Galaxy J5 (2017)', 
      'Galaxy J6', 'Galaxy J6+', 
      'Galaxy J7', 'Galaxy J7 Pro', 'Galaxy J7 Prime', 'Galaxy J7 Max', 'Galaxy J7 Duo', 'Galaxy J7 (2016)', 'Galaxy J7 (2017)', 'Galaxy J7 (2018)', 
      'Galaxy J8',
      'Galaxy Fold', 'Galaxy Z Fold2', 'Galaxy Z Fold3', 'Galaxy Z Fold4', 'Galaxy Z Fold5', 'Galaxy Z Fold6', 'Galaxy Z Fold7', 'Galaxy Z Fold8', 
      'Galaxy Z Flip', 'Galaxy Z Flip 5G', 'Galaxy Z Flip3', 'Galaxy Z Flip4', 'Galaxy Z Flip5', 'Galaxy Z Flip6', 'Galaxy Z Flip7', 'Galaxy Z Flip8'
    ],
    'Xiaomi': [
      'Xiaomi Mi 1', 'Xiaomi Mi 2', 'Xiaomi Mi 3', 'Xiaomi Mi 4', 'Xiaomi Mi 5', 'Xiaomi Mi 6', 
      'Xiaomi Mi 8', 'Xiaomi Mi 9', 'Xiaomi Mi 10', 'Xiaomi Mi 10 Pro', 'Xiaomi Mi 10 Ultra', 
      'Xiaomi 11', 'Xiaomi 11 Pro', 'Xiaomi 11 Ultra', 
      'Xiaomi 12', 'Xiaomi 12 Pro', 'Xiaomi 12 Ultra', 
      'Xiaomi 13', 'Xiaomi 13 Pro', 'Xiaomi 13 Ultra', 
      'Xiaomi 14', 'Xiaomi 14 Pro', 'Xiaomi 14 Ultra', 
      'Xiaomi 15', 'Xiaomi 15 Pro', 'Xiaomi 15 Ultra', 
      'Xiaomi 16', 'Xiaomi 16 Pro', 'Xiaomi 16 Ultra', 
      'Xiaomi Mi MIX', 'Xiaomi MIX 2', 'Xiaomi MIX 3', 'Xiaomi MIX 4', 
      'Xiaomi MIX Fold', 'Xiaomi MIX Fold 2', 'Xiaomi MIX Fold 3', 'Xiaomi MIX Fold 4', 'Xiaomi MIX Flip', 
      'Xiaomi Civi', 'Xiaomi Civi 1S', 'Xiaomi Civi 2', 'Xiaomi Civi 3', 'Xiaomi Civi 4 Pro', 'Xiaomi Civi 5 Pro'
    ],
    'Huawei': [
      'Huawei Ascend P1', 'Huawei Ascend P2', 'Huawei Ascend P6', 'Huawei Ascend P7', 
      'Huawei P8', 'Huawei P9', 'Huawei P10', 'Huawei P20', 'Huawei P20 Pro', 
      'Huawei P30', 'Huawei P30 Pro', 'Huawei P40', 'Huawei P40 Pro', 'Huawei P40 Pro+', 
      'Huawei P50', 'Huawei P50 Pro', 'Huawei P50 Pocket', 'Huawei P60', 'Huawei P60 Pro', 'Huawei P60 Art', 
      'Huawei Pura 70', 'Huawei Pura 70 Pro', 'Huawei Pura 70 Ultra', 
      'Huawei Pura 80', 'Huawei Pura 80 Pro', 'Huawei Pura 80 Ultra', 
      'Huawei Mate 7', 'Huawei Mate 8', 'Huawei Mate 9', 'Huawei Mate 10', 'Huawei Mate 10 Pro', 
      'Huawei Mate 20', 'Huawei Mate 20 Pro', 'Huawei Mate 20 X', 
      'Huawei Mate 30', 'Huawei Mate 30 Pro', 'Huawei Mate 40', 'Huawei Mate 40 Pro', 
      'Huawei Mate 50', 'Huawei Mate 50 Pro', 'Huawei Mate 60', 'Huawei Mate 60 Pro', 'Huawei Mate 60 Pro+', 
      'Huawei Mate 70', 'Huawei Mate 70 Pro', 'Huawei Mate 70 Pro+', 
      'Huawei Mate X', 'Huawei Mate Xs', 'Huawei Mate X2', 'Huawei Mate Xs 2', 'Huawei Mate X3', 'Huawei Mate X5', 'Huawei Mate XT Ultimate', 
      'Huawei nova 3', 'Huawei nova 3i', 'Huawei nova 4', 'Huawei nova 5', 'Huawei nova 5i', 'Huawei nova 5T', 
      'Huawei nova 6', 'Huawei nova 7', 'Huawei nova 7 SE', 'Huawei nova 8', 'Huawei nova 8i', 
      'Huawei nova 9', 'Huawei nova 9 SE', 'Huawei nova 10', 'Huawei nova 10 Pro', 
      'Huawei nova 11', 'Huawei nova 11 Pro', 'Huawei nova 12', 'Huawei nova 12 Pro', 'Huawei nova 12 Ultra', 
      'Huawei nova 13', 'Huawei nova 13 Pro', 'Huawei nova 13 Ultra'
    ],
    'Oppo': [
      'Oppo Find 5', 'Oppo Find 7', 'Oppo Find X', 'Oppo Find X2', 'Oppo Find X2 Pro', 
      'Oppo Find X3', 'Oppo Find X3 Pro', 'Oppo Find X5', 'Oppo Find X5 Pro', 
      'Oppo Find X6', 'Oppo Find X6 Pro', 'Oppo Find X7', 'Oppo Find X7 Ultra', 
      'Oppo Find X8', 'Oppo Find X8 Pro', 'Oppo Find X8 Ultra', 
      'Oppo Find N', 'Oppo Find N2', 'Oppo Find N2 Flip', 'Oppo Find N3', 'Oppo Find N3 Flip', 'Oppo Find N5', 
      'Oppo Reno', 'Oppo Reno 2', 'Oppo Reno 2F', 'Oppo Reno 2Z', 
      'Oppo Reno 3', 'Oppo Reno 3 Pro', 'Oppo Reno 4', 'Oppo Reno 4 Pro', 'Oppo Reno 4F', 
      'Oppo Reno 5', 'Oppo Reno 5 Pro', 'Oppo Reno 5G', 'Oppo Reno 6', 'Oppo Reno 6 Pro', 'Oppo Reno 6Z', 
      'Oppo Reno 7', 'Oppo Reno 7 Pro', 'Oppo Reno 7Z', 'Oppo Reno 8', 'Oppo Reno 8 Pro', 'Oppo Reno 8T', 
      'Oppo Reno 9', 'Oppo Reno 9 Pro', 'Oppo Reno 10', 'Oppo Reno 10 Pro', 'Oppo Reno 10 Pro+', 
      'Oppo Reno 11', 'Oppo Reno 11 Pro', 'Oppo Reno 12', 'Oppo Reno 12 Pro', 'Oppo Reno 13', 'Oppo Reno 13 Pro', 'Oppo Reno 14', 'Oppo Reno 14 Pro', 
      'Oppo A1', 'Oppo A1x', 'Oppo A3', 'Oppo A3 Pro', 'Oppo A3x', 'Oppo A5', 'Oppo A5s', 'Oppo A8', 'Oppo A9', 
      'Oppo A12', 'Oppo A15', 'Oppo A15s', 'Oppo A16', 'Oppo A16k', 'Oppo A17', 'Oppo A17k', 'Oppo A18', 
      'Oppo A31', 'Oppo A32', 'Oppo A33', 'Oppo A35', 'Oppo A36', 'Oppo A38', 'Oppo A40', 
      'Oppo A53', 'Oppo A54', 'Oppo A55', 'Oppo A57', 'Oppo A58', 'Oppo A60', 
      'Oppo A73', 'Oppo A74', 'Oppo A76', 'Oppo A77', 'Oppo A78', 'Oppo A79', 
      'Oppo A91', 'Oppo A92', 'Oppo A93', 'Oppo A94', 'Oppo A95', 'Oppo A96', 'Oppo A98', 
      'Oppo F1', 'Oppo F1 Plus', 'Oppo F3', 'Oppo F3 Plus', 'Oppo F5', 'Oppo F7', 'Oppo F9', 'Oppo F9 Pro', 
      'Oppo F11', 'Oppo F11 Pro', 'Oppo F15', 'Oppo F17', 'Oppo F17 Pro', 'Oppo F19', 'Oppo F19 Pro', 'Oppo F19 Pro+', 
      'Oppo F21 Pro', 'Oppo F21s Pro', 'Oppo F23', 'Oppo F25 Pro', 'Oppo F27', 'Oppo F29 Pro'
    ],
    'Vivo': [
      'Vivo Xplay', 'Vivo X5', 'Vivo X5Pro', 'Vivo X6', 'Vivo X7', 'Vivo X9', 'Vivo X20', 'Vivo X21', 'Vivo X23', 'Vivo X27', 'Vivo X30', 
      'Vivo X50', 'Vivo X50 Pro', 'Vivo X50 Pro+', 'Vivo X60', 'Vivo X60 Pro', 'Vivo X60 Pro+', 'Vivo X70', 'Vivo X70 Pro', 'Vivo X70 Pro+', 
      'Vivo X80', 'Vivo X80 Pro', 'Vivo X90', 'Vivo X90 Pro', 'Vivo X90 Pro+', 'Vivo X100', 'Vivo X100 Pro', 'Vivo X100 Ultra', 
      'Vivo X200', 'Vivo X200 Pro', 'Vivo X200 Ultra', 'Vivo X Fold', 'Vivo X Fold+', 'Vivo X Fold2', 'Vivo X Fold3', 'Vivo X Fold3 Pro', 
      'Vivo V1', 'Vivo V1 Max', 'Vivo V3', 'Vivo V3Max', 'Vivo V5', 'Vivo V5 Lite', 'Vivo V5 Plus', 'Vivo V7', 'Vivo V7+', 'Vivo V9', 'Vivo V9 Pro', 
      'Vivo V11', 'Vivo V11 Pro', 'Vivo V15', 'Vivo V15 Pro', 'Vivo V17', 'Vivo V17 Pro', 'Vivo V19', 'Vivo V20', 'Vivo V20 SE', 'Vivo V20 Pro', 
      'Vivo V21', 'Vivo V21e', 'Vivo V23', 'Vivo V23 Pro', 'Vivo V23e', 'Vivo V25', 'Vivo V25 Pro', 'Vivo V25e', 'Vivo V27', 'Vivo V27 Pro', 'Vivo V27e', 
      'Vivo V29', 'Vivo V29 Pro', 'Vivo V29e', 'Vivo V30', 'Vivo V30 Pro', 'Vivo V30e', 'Vivo V40', 'Vivo V40 Pro', 'Vivo V40e', 'Vivo V50', 'Vivo V60', 'Vivo V70', 
      'Vivo Y11', 'Vivo Y12', 'Vivo Y15', 'Vivo Y17', 'Vivo Y19', 'Vivo Y20', 'Vivo Y20s', 'Vivo Y21', 'Vivo Y21s', 'Vivo Y22', 'Vivo Y27', 'Vivo Y28', 
      'Vivo Y30', 'Vivo Y31', 'Vivo Y33s', 'Vivo Y35', 'Vivo Y36', 'Vivo Y50', 'Vivo Y51', 'Vivo Y53', 'Vivo Y55', 'Vivo Y72', 'Vivo Y73', 'Vivo Y75', 'Vivo Y76', 'Vivo Y100', 'Vivo Y200'
    ],
    'Nokia': [
      'Nokia 105', 'Nokia 105 (2019)', 'Nokia 105 (2022)', 'Nokia 105 (2023)', 'Nokia 105 (2024)',
      'Nokia 105 4G', 'Nokia 105 4G (2023)', 'Nokia 105 4G (2024)',
      'Nokia 106', 'Nokia 106 (2023)', 'Nokia 106 4G', 'Nokia 106 4G (2023)',
      'Nokia 108', 'Nokia 108 4G (2024)',
      'Nokia 110', 'Nokia 110 (2023)', 'Nokia 110 4G', 'Nokia 110 4G (2023)', 'Nokia 110 4G (2024)', 'Nokia 110 Power',
      'Nokia 125', 'Nokia 125 (2020)',
      'Nokia 130', 'Nokia 130 (2023)', 'Nokia 130 Music',
      'Nokia 150', 'Nokia 150 (2020)', 'Nokia 150 (2023)', 'Nokia 150 Music',
      'Nokia 210', 'Nokia 210 4G',
      'Nokia 215', 'Nokia 215 4G', 'Nokia 215 4G (2024)', 'Nokia 215 4G (2026)',
      'Nokia 216', 'Nokia 220', 'Nokia 220 4G', 'Nokia 220 4G (2024)',
      'Nokia 225 4G', 'Nokia 225 4G (2024)',
      'Nokia 230', 'Nokia 230 (2024)',
      'Nokia 235 4G (2024)', 'Nokia 235 4G (2026)',
      'Nokia 2660 Flip', 'Nokia 2720 Flip',
      'Nokia 3210 (2024)',
      'Nokia 3310', 'Nokia 3310 (2017)', 'Nokia 3310 3G',
      'Nokia 5310', 'Nokia 5310 (2020)', 'Nokia 5310 (2024)',
      'Nokia 5710 XpressAudio',
      'Nokia 6300 4G',
      'Nokia 6310', 'Nokia 6310 (2021)', 'Nokia 6310 (2024)',
      'Nokia 800 Tough', 'Nokia 8000 4G', 'Nokia 8110 4G',
      'HMD 101 4G', 'HMD 102 4G', 'HMD 110 4G', 'HMD 215 4G 2nd Edition', 'HMD 235 4G 2nd Edition', 'HMD 2660 Flip Senior Edition', 'HMD 3210 4G',
      'Nokia 1', 'Nokia 1 Plus', 'Nokia 1.3', 'Nokia 1.4',
      'Nokia 2', 'Nokia 2.1', 'Nokia 2.2', 'Nokia 2.3', 'Nokia 2.4',
      'Nokia 3', 'Nokia 3.1', 'Nokia 3.1 Plus', 'Nokia 3.2', 'Nokia 3.4',
      'Nokia 4.2',
      'Nokia 5', 'Nokia 5.1', 'Nokia 5.1 Plus', 'Nokia 5.3', 'Nokia 5.4',
      'Nokia 6', 'Nokia 6.1', 'Nokia 6.1 Plus', 'Nokia 6.2',
      'Nokia 7 Plus', 'Nokia 7.1', 'Nokia 7.2',
      'Nokia 8', 'Nokia 8 Sirocco', 'Nokia 8.1', 'Nokia 8.3 5G',
      'Nokia 9 PureView',
      'Nokia C1', 'Nokia C01 Plus', 'Nokia C2', 'Nokia C2 2nd Edition', 'Nokia C20', 'Nokia C21', 'Nokia C21 Plus', 'Nokia C30', 'Nokia C31', 'Nokia C32', 'Nokia C12', 'Nokia C12 Pro', 'Nokia C22',
      'Nokia G10', 'Nokia G20', 'Nokia G11', 'Nokia G21', 'Nokia G22', 'Nokia G42 5G', 'Nokia G60 5G',
      'Nokia X10', 'Nokia X20', 'Nokia X30 5G', 'Nokia XR20', 'Nokia XR21',
      'HMD Pulse', 'HMD Pulse+', 'HMD Pulse Pro', 'HMD Crest 5G', 'HMD Crest Max 5G'
    ],
    'Google Pixel': [
      'Google Pixel', 'Google Pixel XL', 'Google Pixel 2', 'Google Pixel 2 XL', 
      'Google Pixel 3', 'Google Pixel 3 XL', 'Google Pixel 3a', 'Google Pixel 3a XL', 
      'Google Pixel 4', 'Google Pixel 4 XL', 'Google Pixel 4a', 'Google Pixel 4a (5G)', 
      'Google Pixel 5', 'Google Pixel 5a (5G)', 'Google Pixel 6', 'Google Pixel 6 Pro', 'Google Pixel 6a', 
      'Google Pixel 7', 'Google Pixel 7 Pro', 'Google Pixel 7a', 'Google Pixel Fold', 
      'Google Pixel 8', 'Google Pixel 8 Pro', 'Google Pixel 8a', 
      'Google Pixel 9', 'Google Pixel 9 Pro', 'Google Pixel 9 Pro XL', 'Google Pixel 9 Pro Fold', 'Google Pixel 9a', 
      'Google Pixel 10', 'Google Pixel 10 Pro', 'Google Pixel 10 Pro XL', 'Google Pixel 10 Pro Fold', 'Google Pixel 10a', 
      'Google Pixel 11', 'Google Pixel 11 Pro', 'Google Pixel 11 Pro XL', 'Google Pixel 11 Pro Fold'
    ],
    'OnePlus': [
      'OnePlus One', 'OnePlus 2', 'OnePlus X', 'OnePlus 3', 'OnePlus 3T', 
      'OnePlus 5', 'OnePlus 5T', 'OnePlus 6', 'OnePlus 6T', 
      'OnePlus 7', 'OnePlus 7 Pro', 'OnePlus 7T', 'OnePlus 7T Pro', 
      'OnePlus 8', 'OnePlus 8 Pro', 'OnePlus 8T', 
      'OnePlus 9', 'OnePlus 9 Pro', 'OnePlus 9R', 'OnePlus 9RT', 
      'OnePlus 10 Pro', 'OnePlus 10R', 'OnePlus 10T', 
      'OnePlus 11', 'OnePlus 11R', 'OnePlus 12', 'OnePlus 12R', 
      'OnePlus 13', 'OnePlus 13R', 'OnePlus 14', 
      'OnePlus Open', 'OnePlus Open 2', 
      'OnePlus Nord', 'OnePlus Nord N10 5G', 'OnePlus Nord N100', 'OnePlus Nord CE 5G', 
      'OnePlus Nord 2 5G', 'OnePlus Nord CE 2 5G', 'OnePlus Nord CE 2 Lite 5G', 'OnePlus Nord 2T', 
      'OnePlus Nord N20 5G', 'OnePlus Nord N20 SE', 'OnePlus Nord 3', 'OnePlus Nord CE 3 5G', 'OnePlus Nord CE 3 Lite 5G', 
      'OnePlus Nord N30 5G', 'OnePlus Nord 4', 'OnePlus Nord CE 4', 'OnePlus Nord CE 4 Lite', 'OnePlus Nord 5', 'OnePlus Nord CE 5'
    ],
    'Realme': [
      'Realme 1', 'Realme 2', 'Realme 2 Pro', 'Realme 3', 'Realme 3 Pro', 'Realme 3i', 
      'Realme 5', 'Realme 5 Pro', 'Realme 5i', 'Realme 6', 'Realme 6 Pro', 'Realme 6i', 'Realme 6s', 
      'Realme 7', 'Realme 7 Pro', 'Realme 7i', 'Realme 8', 'Realme 8 Pro', 'Realme 8i', 'Realme 8 5G', 
      'Realme 9', 'Realme 9 Pro', 'Realme 9 Pro+', 'Realme 9i', 'Realme 10', 'Realme 10 Pro', 'Realme 10 Pro+', 'Realme 10i', 
      'Realme 11', 'Realme 11 Pro', 'Realme 11 Pro+', 'Realme 12', 'Realme 12 Pro', 'Realme 12 Pro+', 'Realme 12x', 
      'Realme 13', 'Realme 13 Pro', 'Realme 13 Pro+', 'Realme 14', 'Realme 14 Pro', 'Realme 14 Pro+', 
      'Realme GT', 'Realme GT Neo', 'Realme GT Neo 2', 'Realme GT Neo 3', 'Realme GT Neo 5', 'Realme GT Neo 6', 
      'Realme GT 2', 'Realme GT 2 Pro', 'Realme GT 3', 'Realme GT 5', 'Realme GT 5 Pro', 'Realme GT 6', 'Realme GT 7 Pro', 
      'Realme X', 'Realme X2', 'Realme X2 Pro', 'Realme X3', 'Realme X3 SuperZoom', 'Realme X50', 'Realme X50 Pro', 
      'Realme C1', 'Realme C2', 'Realme C3', 'Realme C11', 'Realme C12', 'Realme C15', 'Realme C20', 'Realme C21', 'Realme C21Y', 
      'Realme C25', 'Realme C25s', 'Realme C30', 'Realme C31', 'Realme C33', 'Realme C35', 'Realme C51', 'Realme C53', 'Realme C55', 
      'Realme C61', 'Realme C63', 'Realme C67', 'Realme C71', 'Realme C75', 'Realme C85', 
      'Realme Note 50', 'Realme Note 60', 'Realme Note 70'
    ],
    'Asus': [
      'Asus ZenFone', 'Asus ZenFone 2', 'Asus ZenFone 3', 'Asus ZenFone 4', 'Asus ZenFone 5', 'Asus ZenFone 5z', 
      'Asus ZenFone 6', 'Asus ZenFone 7', 'Asus ZenFone 7 Pro', 'Asus ZenFone 8', 'Asus ZenFone 8 Flip', 
      'Asus Zenfone 9', 'Asus Zenfone 10', 'Asus Zenfone 11 Ultra', 'Asus Zenfone 12 Ultra', 
      'Asus ROG Phone', 'Asus ROG Phone II', 'Asus ROG Phone 3', 'Asus ROG Phone 3 Strix', 
      'Asus ROG Phone 5', 'Asus ROG Phone 5 Pro', 'Asus ROG Phone 5 Ultimate', 'Asus ROG Phone 5s', 'Asus ROG Phone 5s Pro', 
      'Asus ROG Phone 6', 'Asus ROG Phone 6 Pro', 'Asus ROG Phone 6D', 'Asus ROG Phone 6D Ultimate', 
      'Asus ROG Phone 7', 'Asus ROG Phone 7 Ultimate', 'Asus ROG Phone 8', 'Asus ROG Phone 8 Pro', 
      'Asus ROG Phone 9', 'Asus ROG Phone 9 Pro', 'Asus ROG Phone 9 Pro Edition'
    ],
    'Honor': [
      'Honor Magic', 'Honor Magic 2', 'Honor Magic 3', 'Honor Magic 3 Pro', 'Honor Magic 3 Pro+', 
      'Honor Magic 4', 'Honor Magic 4 Pro', 'Honor Magic 4 Ultimate', 'Honor Magic 5', 'Honor Magic 5 Pro', 
      'Honor Magic 5 Ultimate', 'Honor Magic 6', 'Honor Magic 6 Pro', 'Honor Magic 6 Ultimate', 
      'Honor Magic 7', 'Honor Magic 7 Pro', 'Honor Magic 7 Ultimate', 'Honor Magic 8', 'Honor Magic 8 Pro', 
      'Honor Magic 9', 'Honor Magic 9 Pro', 'Honor Magic 9 Pro Max', 'Honor Magic V', 'Honor Magic Vs', 
      'Honor Magic Vs2', 'Honor Magic V2', 'Honor Magic V3', 'Honor Magic V5', 
      'Honor 50', 'Honor 50 SE', 'Honor 50 Pro', 'Honor 60', 'Honor 60 SE', 'Honor 60 Pro', 
      'Honor 70', 'Honor 70 Lite', 'Honor 70 Pro', 'Honor 70 Pro+', 'Honor 80', 'Honor 80 SE', 
      'Honor 80 Pro', 'Honor 80 GT', 'Honor 90', 'Honor 90 Lite', 'Honor 90 Pro', 'Honor 90 GT', 
      'Honor 100', 'Honor 100 Pro', 'Honor 200', 'Honor 200 Lite', 'Honor 200 Pro', 'Honor 200 Smart', 
      'Honor 400', 'Honor 400 Lite', 'Honor 400 Pro', 'Honor 600', 'Honor 600 Lite', 'Honor 600 Pro', 
      'Honor X3', 'Honor X5', 'Honor X5 Plus', 'Honor X5b', 'Honor X5b Plus', 'Honor X5c', 'Honor X5c Plus', 
      'Honor X5d', 'Honor X5d Plus', 'Honor X6', 'Honor X6a', 'Honor X6b', 'Honor X6c', 'Honor X7', 'Honor X7a', 
      'Honor X7b', 'Honor X7c', 'Honor X7d', 'Honor X7e', 'Honor X8', 'Honor X8a', 'Honor X8b', 'Honor X8c', 
      'Honor X8d', 'Honor X9', 'Honor X9a', 'Honor X9b', 'Honor X9c', 'Honor X9d'
    ],
    'Lenovo': [
      'Lenovo A526', 'Lenovo A536', 'Lenovo A680', 'Lenovo A1000', 'Lenovo A2010', 'Lenovo A6000', 'Lenovo A6010', 'Lenovo A6600 Plus', 'Lenovo A7000', 'Lenovo A7010', 'Lenovo A850', 
      'Lenovo K3 Note', 'Lenovo K5 Note', 'Lenovo K6', 'Lenovo K6 Power', 'Lenovo K6 Note', 'Lenovo K8 Note', 'Lenovo K9 Note', 'Lenovo K10 Note', 'Lenovo K12', 'Lenovo K12 Pro', 'Lenovo K13', 'Lenovo K13 Note', 'Lenovo K14', 'Lenovo K14 Plus', 'Lenovo K15 Plus', 
      'Lenovo Z5', 'Lenovo Z5 Pro', 'Lenovo Z5s', 'Lenovo Z6', 'Lenovo Z6 Lite', 'Lenovo Z6 Pro', 
      'Lenovo Phab', 'Lenovo Phab Plus', 'Lenovo Phab 2', 'Lenovo Phab 2 Pro', 
      'Lenovo Vibe X', 'Lenovo Vibe X2', 'Lenovo Vibe X3', 'Lenovo Vibe Z', 'Lenovo Vibe Z2', 'Lenovo Vibe Z2 Pro', 'Lenovo Vibe P1', 'Lenovo Vibe P1m', 'Lenovo Vibe C', 'Lenovo Vibe K5', 'Lenovo Vibe K5 Plus', 
      'Lenovo P2', 'Lenovo P70', 'Lenovo P780', 
      'Lenovo Legion Phone Duel', 'Lenovo Legion Duel 2', 'Lenovo Legion Y70', 'Lenovo Legion Y90'
    ],
    'HTC': [
      'HTC Dream (T-Mobile G1)', 'HTC Magic', 'HTC Hero', 'HTC Tattoo', 'HTC Legend', 
      'HTC Desire', 'HTC Wildfire', 'HTC Aria', 'HTC Gratia', 'HTC Incredible S', 
      'HTC Desire S', 'HTC Wildfire S', 'HTC Sensation', 'HTC Sensation XE', 'HTC Sensation XL', 
      'HTC Evo 3D', 'HTC Explorer', 'HTC One X', 'HTC One S', 'HTC One V', 'HTC One X+', 
      'HTC One (M7)', 'HTC One Mini', 'HTC One Max', 'HTC Desire 300', 'HTC Desire 500', 
      'HTC Desire 600', 'HTC One (M8)', 'HTC One (E8)', 'HTC One Mini 2', 'HTC Desire 510', 
      'HTC Desire 610', 'HTC Desire 816', 'HTC Desire Eye', 'HTC One (M9)', 'HTC One A9', 
      'HTC One M9+', 'HTC Desire 626', 'HTC Desire 820', 'HTC 10', 'HTC 10 Lifestyle', 
      'HTC 10 Evo', 'HTC Bolt', 'HTC One A9s', 'HTC Desire 10 Pro', 'HTC U Ultra', 
      'HTC U Play', 'HTC U11', 'HTC U11 Life', 'HTC U11+', 'HTC U12+', 'HTC U12 Life', 
      'HTC U19e', 'HTC Exodus 1', 'HTC Desire 12', 'HTC Desire 12+', 'HTC Desire 19+', 
      'HTC Wildfire X', 'HTC U20 5G', 'HTC Desire 20 Pro', 'HTC Desire 20+', 'HTC Desire 21 Pro 5G', 
      'HTC Wildfire E', 'HTC Wildfire E2', 'HTC Wildfire E3', 'HTC Desire 22 Pro', 
      'HTC U23', 'HTC U23 Pro', 'HTC U24 Pro', 'HTC Wildfire E5 Plus'
    ],
    'Infinix': [
      'Infinix Zero', 'Infinix Zero 2', 'Infinix Zero 3', 'Infinix Zero 4', 'Infinix Zero 4 Plus', 
      'Infinix Zero 5', 'Infinix Zero 5 Pro', 'Infinix Zero 6', 'Infinix Zero 6 Pro', 
      'Infinix Zero 8', 'Infinix Zero 8i', 'Infinix Zero X', 'Infinix Zero X Pro', 'Infinix Zero X Neo', 
      'Infinix Zero 5G', 'Infinix Zero 5G 2023', 'Infinix Zero 20', 'Infinix Zero 30', 'Infinix Zero 30 5G', 
      'Infinix Zero 40', 'Infinix Zero 40 5G', 'Infinix Zero Ultra', 'Infinix Zero Flip',
      'Infinix Note 3', 'Infinix Note 4', 'Infinix Note 5', 'Infinix Note 5 Stylus', 'Infinix Note 6', 
      'Infinix Note 7', 'Infinix Note 7 Lite', 'Infinix Note 8', 'Infinix Note 8i', 
      'Infinix Note 10', 'Infinix Note 10 Pro', 'Infinix Note 10 Pro NFC', 
      'Infinix Note 11', 'Infinix Note 11s', 'Infinix Note 11 Pro', 
      'Infinix Note 12', 'Infinix Note 12i', 'Infinix Note 12 VIP', 'Infinix Note 12 Pro', 'Infinix Note 12 Pro 5G', 
      'Infinix Note 30', 'Infinix Note 30 5G', 'Infinix Note 30 Pro', 'Infinix Note 30 VIP', 
      'Infinix Note 40', 'Infinix Note 40 Pro', 'Infinix Note 40 Pro 5G', 'Infinix Note 40 Pro+ 5G', 
      'Infinix Note 50', 'Infinix Note 50 Pro', 'Infinix Note 60', 'Infinix Note 60 Pro', 'Infinix Note 60 Ultra',
      'Infinix Hot 4', 'Infinix Hot 4 Pro', 'Infinix Hot 5', 'Infinix Hot 6', 'Infinix Hot 6 Pro', 
      'Infinix Hot 7', 'Infinix Hot 7 Pro', 'Infinix Hot 8', 'Infinix Hot 9', 'Infinix Hot 9 Pro', 
      'Infinix Hot 10', 'Infinix Hot 10s', 'Infinix Hot 10 Play', 'Infinix Hot 10T', 
      'Infinix Hot 11', 'Infinix Hot 11s', 'Infinix Hot 11 Play', 
      'Infinix Hot 12', 'Infinix Hot 12 Play', 'Infinix Hot 12i', 'Infinix Hot 12 Pro', 
      'Infinix Hot 20', 'Infinix Hot 20 5G', 'Infinix Hot 20 Play', 'Infinix Hot 20s', 
      'Infinix Hot 30', 'Infinix Hot 30i', 'Infinix Hot 30 Play', 
      'Infinix Hot 40', 'Infinix Hot 40i', 'Infinix Hot 40 Pro', 
      'Infinix Hot 50', 'Infinix Hot 50i', 'Infinix Hot 50 Pro', 'Infinix Hot 50 Pro Plus', 
      'Infinix Hot 60', 'Infinix Hot 60i', 'Infinix Hot 60 Pro', 'Infinix Hot 60 Pro Plus', 
      'Infinix Hot 70', 'Infinix Hot 70 Pro', 'Infinix Hot 70 Pro 5G',
      'Infinix Smart 2', 'Infinix Smart 2 HD', 'Infinix Smart 3', 'Infinix Smart 3 Plus', 
      'Infinix Smart 4', 'Infinix Smart 4 Plus', 'Infinix Smart 5', 'Infinix Smart 5 Pro', 
      'Infinix Smart 6', 'Infinix Smart 6 HD', 'Infinix Smart 6 Plus', 
      'Infinix Smart 7', 'Infinix Smart 7 HD', 'Infinix Smart 8', 'Infinix Smart 8 Plus', 'Infinix Smart 8 Pro', 
      'Infinix Smart 9', 'Infinix Smart 20 HD',
      'Infinix GT 10 Pro', 'Infinix GT 20 Pro', 'Infinix GT 30 Pro', 'Infinix GT 30 Pro 5G+'
    ],
    'Itel': [
      'Itel A14', 'Itel A16', 'Itel A23', 'Itel A25', 'Itel A26', 'Itel A27', 'Itel A32F', 'Itel A33', 'Itel A35', 'Itel A36', 'Itel A37', 
      'Itel A48', 'Itel A49', 'Itel A58', 'Itel A60', 'Itel A70', 'Itel A80', 'Itel A90', 
      'Itel P36', 'Itel P37', 'Itel P38', 'Itel P40', 'Itel P55', 'Itel P55 5G', 'Itel P65', 
      'Itel S15', 'Itel S16', 'Itel S17', 'Itel S18', 'Itel S23', 'Itel S23+', 'Itel S24', 
      'Itel Vision 1', 'Itel Vision 2', 'Itel Vision 3', 'Itel Vision 5', 'Itel City 1', 
      'Itel It2160', 'Itel It5602', 'Itel Magic 2', 'Itel Magic 3', 'Itel Super Guru 4G', 'Itel Power 440'
    ],
    'Lava': [
      'Lava Agni 2 5G', 'Lava Agni 3 5G', 'Lava Agni 4', 'Lava Agni 4N 5G', 
      'Lava Blaze 5G', 'Lava Blaze 2', 'Lava Blaze 2 5G', 'Lava Blaze Pro 5G', 'Lava Blaze Curve 5G', 'Lava Blaze Curve SE', 'Lava Blaze Amoled 2', 'Lava Blaze Duo 2', 'Lava Blaze Duo 3', 
      'Lava Virat Curve', 'Lava Virat V1', 'Lava Virat V1 5G', 'Lava Virat V1 Pro 5G', 
      'Lava Bold N1 5G', 'Lava Bold N2', 'Lava Bold N2 5G', 'Lava Bold N2 Lite', 'Lava Bold N4 Lite', 'Lava Bold N4 Pro 5G', 
      'Lava Yuva 2', 'Lava Yuva 2 Pro', 'Lava Yuva 3', 'Lava Yuva 3 Pro', 'Lava Yuva 4 Pro', 'Lava Yuva 4 Pro 5G', 'Lava Yuva 5G', 
      'Lava Shark 2', 'Lava Shark 2 Pro', 'Lava Smart 4', 'Lava Smart 4 Plus', 'Lava Play Max', 'Lava Star 3', 
      'Lava Iris 400 Colour', 'Lava A67', 'Lava A88', 'Lava Z90', 'Lava Gem', 'Lava Gem 2025', 'Lava Hero Shakti 2026', 'Lava A2 Smart', 'Lava KKT 22'
    ],
    'Motorola': [
      'Motorola Edge', 'Motorola Edge (2021)', 'Motorola Edge (2022)', 'Motorola Edge (2023)', 'Motorola Edge (2024)', 'Motorola Edge (2025)', 'Motorola Edge (2026)',
      'Motorola Edge 20', 'Motorola Edge 20 Lite', 'Motorola Edge 20 Pro',
      'Motorola Edge 30', 'Motorola Edge 30 Fusion', 'Motorola Edge 30 Neo', 'Motorola Edge 30 Pro', 'Motorola Edge 30 Ultra',
      'Motorola Edge 40', 'Motorola Edge 40 Neo', 'Motorola Edge 40 Pro',
      'Motorola Edge 50 Fusion', 'Motorola Edge 50 Neo', 'Motorola Edge 50 Pro', 'Motorola Edge 50 Ultra',
      'Motorola Edge 60', 'Motorola Edge 60 Pro',
      'Motorola Edge 70', 'Motorola Edge 70 Plus', 'Motorola Edge 70 Pro', 'Motorola Edge 70 Max',
      'Motorola Razr (2019)', 'Motorola Razr 5G', 'Motorola Razr 40', 'Motorola Razr 40 Ultra', 'Motorola Razr 50', 'Motorola Razr 50 Ultra', 'Motorola Razr 70', 'Motorola Razr Fold', 'Motorola Razr Ultra', 'Motorola Razr+',
      'Moto G (2023)', 'Moto G (2024)', 'Moto G (2025)', 'Moto G (2026)',
      'Moto G Play (2023)', 'Moto G Play (2024)', 'Moto G Play (2025)', 'Moto G Play (2026)',
      'Moto G Power (2023)', 'Moto G Power (2024)', 'Moto G Power (2025)', 'Moto G Power (2026)', 'Moto G Power 5G',
      'Moto G Stylus (2023)', 'Moto G Stylus (2024)', 'Moto G Stylus (2025)', 'Moto G Stylus (2026)', 'Moto G Stylus 5G',
      'Moto G10', 'Moto G13', 'Moto G14', 'Moto G22', 'Moto G23', 'Moto G24',
      'Moto G30', 'Moto G31', 'Moto G32', 'Moto G34 5G',
      'Moto G41', 'Moto G42', 'Moto G45 5G',
      'Moto G50', 'Moto G51 5G', 'Moto G52', 'Moto G53 5G', 'Moto G54 5G', 'Moto G55', 'Moto G57',
      'Moto G60', 'Moto G62 5G',
      'Moto G71 5G', 'Moto G72', 'Moto G73 5G', 'Moto G75', 'Moto G77',
      'Moto G82 5G', 'Moto G84 5G', 'Moto G85', 'Moto G86', 'Moto G87',
      'Moto G Max',
      'Motorola ThinkPhone', 'Motorola ThinkPhone 25'
    ],
    'Nothing': [
      'Nothing Phone (1)', 'Nothing Phone (2)', 'Nothing Phone (2a)', 'Nothing Phone (2a) Plus', 
      'Nothing Phone (3)', 'Nothing Phone (3a)', 'Nothing Phone (3a) Pro', 'Nothing Phone (3a) Lite', 
      'Nothing Phone (4)', 'Nothing Phone (4a)', 'Nothing Phone (4a) Pro', 'Nothing Phone (4b)', 
      'CMF Phone 1', 'CMF Phone 2 Pro'
    ],
    'Sony': [
      'Sony Xperia Z', 'Sony Xperia Z1', 'Sony Xperia Z1 Compact', 'Sony Xperia Z2', 'Sony Xperia Z3', 'Sony Xperia Z3 Compact', 
      'Sony Xperia Z4', 'Sony Xperia Z5', 'Sony Xperia Z5 Compact', 'Sony Xperia Z5 Premium', 
      'Sony Xperia X', 'Sony Xperia X Performance', 'Sony Xperia X Compact', 
      'Sony Xperia XZ', 'Sony Xperia XZ Premium', 'Sony Xperia XZs', 'Sony Xperia XZ1', 'Sony Xperia XZ1 Compact', 
      'Sony Xperia XZ2', 'Sony Xperia XZ2 Compact', 'Sony Xperia XZ2 Premium', 'Sony Xperia XZ3', 
      'Sony Xperia 1', 'Sony Xperia 1 II', 'Sony Xperia 1 III', 'Sony Xperia 1 IV', 'Sony Xperia 1 V', 'Sony Xperia 1 VI', 'Sony Xperia 1 VII', 'Sony Xperia 1 VIII', 
      'Sony Xperia 5', 'Sony Xperia 5 II', 'Sony Xperia 5 III', 'Sony Xperia 5 IV', 'Sony Xperia 5 V', 
      'Sony Xperia 10', 'Sony Xperia 10 II', 'Sony Xperia 10 III', 'Sony Xperia 10 IV', 'Sony Xperia 10 V', 'Sony Xperia 10 VI', 'Sony Xperia 10 VII', 'Sony Xperia 10 VIII', 
      'Sony Xperia PRO', 'Sony Xperia PRO-I', 
      'Sony Xperia Ace', 'Sony Xperia Ace II', 'Sony Xperia Ace III', 
      'Sony Ericsson T100', 'Sony Ericsson T200', 'Sony Ericsson T300', 'Sony Ericsson T610', 'Sony Ericsson T630', 'Sony Ericsson T700', 'Sony Ericsson T707', 
      'Sony Ericsson K300i', 'Sony Ericsson K500i', 'Sony Ericsson K700i', 'Sony Ericsson K750i', 'Sony Ericsson K790i', 'Sony Ericsson K800i', 'Sony Ericsson K810i', 'Sony Ericsson K850i', 
      'Sony Ericsson W200i', 'Sony Ericsson W300i', 'Sony Ericsson W350i', 'Sony Ericsson W380i', 'Sony Ericsson W395', 'Sony Ericsson W550i', 'Sony Ericsson W580i', 'Sony Ericsson W595', 'Sony Ericsson W610i', 'Sony Ericsson W700i', 'Sony Ericsson W705', 'Sony Ericsson W800i', 'Sony Ericsson W810i', 'Sony Ericsson W880i', 'Sony Ericsson W900i', 'Sony Ericsson W910i', 'Sony Ericsson W950i', 'Sony Ericsson W960i', 'Sony Ericsson W980', 'Sony Ericsson W995', 
      'Sony Ericsson C510', 'Sony Ericsson C702', 'Sony Ericsson C901', 'Sony Ericsson C902', 'Sony Ericsson C903', 'Sony Ericsson C905', 
      'Sony Ericsson S302', 'Sony Ericsson S500i', 'Sony Ericsson S700i', 
      'Sony Ericsson J100i', 'Sony Ericsson J108i Cedar', 'Sony Ericsson Elm', 'Sony Ericsson Hazel', 'Sony Ericsson Naite', 
      'Sony Ericsson P800', 'Sony Ericsson P900', 'Sony Ericsson P910', 'Sony Ericsson P990i'
    ],
    'Tecno': [
      'Tecno Phantom X', 'Tecno Phantom X2', 'Tecno Phantom X2 Pro', 'Tecno Phantom X3', 
      'Tecno Phantom V Fold', 'Tecno Phantom V Fold2', 'Tecno Phantom V Flip', 'Tecno Phantom V Flip2', 
      'Tecno Camon 15', 'Tecno Camon 16', 'Tecno Camon 16 Premier', 'Tecno Camon 17', 'Tecno Camon 17 Pro', 
      'Tecno Camon 18', 'Tecno Camon 18 Premier', 'Tecno Camon 19', 'Tecno Camon 19 Pro', 'Tecno Camon 19 Neo', 
      'Tecno Camon 20', 'Tecno Camon 20 Pro', 'Tecno Camon 20 Pro 5G', 'Tecno Camon 20 Premier 5G', 
      'Tecno Camon 30', 'Tecno Camon 30 Pro', 'Tecno Camon 30 5G', 'Tecno Camon 30 Premier 5G', 
      'Tecno Camon 40', 'Tecno Camon 40 Pro', 'Tecno Camon 40 Premier 5G', 
      'Tecno Camon 50', 'Tecno Camon 50 Pro', 'Tecno Camon 50 Ultra 5G', 'Tecno Camon Slim', 
      'Tecno Pova', 'Tecno Pova 2', 'Tecno Pova 3', 'Tecno Pova 4', 'Tecno Pova 4 Pro', 
      'Tecno Pova 5', 'Tecno Pova 5 Pro', 'Tecno Pova 6', 'Tecno Pova 6 Pro', 'Tecno Pova 6 Neo', 
      'Tecno Pova 7', 'Tecno Pova 7 Pro', 'Tecno Pova 8', 'Tecno Pova 8 Pro', 'Tecno Pova Curve', 
      'Tecno Spark 6', 'Tecno Spark 7', 'Tecno Spark 8', 'Tecno Spark 9', 
      'Tecno Spark 10', 'Tecno Spark 10 Pro', 'Tecno Spark 20', 'Tecno Spark 20 Pro', 'Tecno Spark 20 Pro+', 
      'Tecno Spark 30', 'Tecno Spark 30 Pro', 'Tecno Spark 40', 'Tecno Spark 40 Pro', 'Tecno Spark 40 Pro+', 
      'Tecno Spark 50', 'Tecno Spark 50 Pro', 'Tecno Spark 50s', 
      'Tecno Spark Go', 'Tecno Spark Go 3', 
      'Tecno Pop 5', 'Tecno Pop 6', 'Tecno Pop 7', 'Tecno Pop 8', 'Tecno Pop 9', 'Tecno Pop 10', 'Tecno Pop 10 Pro', 'Tecno Pop X 5G'
    ],
    'ZTE': [
      'ZTE Blade A3', 'ZTE Blade A5', 'ZTE Blade A7', 'ZTE Blade A31', 'ZTE Blade A51', 'ZTE Blade A52', 'ZTE Blade A53', 'ZTE Blade A54', 
      'ZTE Blade A71', 'ZTE Blade A72', 'ZTE Blade A73', 'ZTE Blade A34', 'ZTE Blade A35', 
      'ZTE Blade V2020', 'ZTE Blade V30', 'ZTE Blade V40', 'ZTE Blade V40 Pro', 'ZTE Blade V40 Vita', 
      'ZTE Blade V50', 'ZTE Blade V50 Design', 'ZTE Blade V60', 'ZTE Blade V70', 
      'ZTE Axon 7', 'ZTE Axon 9 Pro', 'ZTE Axon 10 Pro', 'ZTE Axon 10s Pro', 'ZTE Axon 20 5G', 'ZTE Axon 30 5G', 
      'ZTE Axon 30 Ultra', 'ZTE Axon 30 Pro', 'ZTE Axon 40 Ultra', 'ZTE Axon 40 Pro', 'ZTE Axon 50 Ultra', 
      'ZTE Axon 60', 'ZTE Axon 60 Ultra', 'ZTE Axon 70', 
      'ZTE Nubia Z11', 'ZTE Nubia Z17', 'ZTE Nubia Z20', 'ZTE Nubia Z30 Pro', 'ZTE Nubia Z40 Pro', 
      'ZTE Nubia Z50', 'ZTE Nubia Z50 Ultra', 'ZTE Nubia Z60 Ultra', 'ZTE Nubia Z70 Ultra', 
      'ZTE Nubia Flip', 'ZTE Nubia Flip 2', 
      'ZTE Nubia Red Magic', 'ZTE Nubia Red Magic 3', 'ZTE Nubia Red Magic 5G', 'ZTE Nubia Red Magic 6', 
      'ZTE Nubia Red Magic 7', 'ZTE Nubia Red Magic 8 Pro', 'ZTE Nubia Red Magic 9 Pro', 'ZTE Nubia Red Magic 10 Pro'
    ]
  };

  const [formData, setFormData] = useState({
    customerName: '',
    telephone: '',
    idNumber: '',
    deviceType: 'Mobile Phone',
    deviceBrand: 'Apple',
    customBrand: '',
    deviceModel: brandModelsMap['Apple'][0],
    imei: '',
    repairFault: '',
    estimatedCost: '',
    advancePaid: '',
    notes: '',
    receivedWith: {
      battery: true,
      charger: false,
      cover: false,
      backPanel: true,
      simCard: false,
      bag: false
    },
    photoUrls: []
  });

  const [phoneError, setPhoneError] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [printType, setPrintType] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [printerPaperSize, setPrinterPaperSize] = useState('80mm');
  const [isDragging, setIsDragging] = useState(false);

  // Authentication State (Single PIN / Operator Login)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginPin, setLoginPin] = useState('');

  const currentDate = '2026/10/20';

  // Dynamic multipliers based on Day, Week, Month, Year
  const multiplier = reportDateRange === 'Day' ? 0.2 : reportDateRange === 'Week' ? 0.6 : reportDateRange === 'Month' ? 1.0 : 3.5;

  // Financial Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const repairBalance = settledRepair ? (settledRepair.estimatedCost - settledRepair.advancePaid) : 0;
  const grandTotal = subtotal + Number(courierFee || 0) + repairBalance;

  const totalRepairRevenue = Math.round(jobNotes.reduce((sum, job) => sum + (job.estimatedCost || 0), 0) * multiplier);
  const totalAdvancesCollected = Math.round(jobNotes.reduce((sum, job) => sum + (job.advancePaid || 0), 0) * multiplier);
  const totalPendingBalances = Math.round(jobNotes
    .filter(j => j.status === 'Job Pending')
    .reduce((sum, job) => sum + ((job.estimatedCost || 0) - (job.advancePaid || 0)), 0) * multiplier);

  const completedJobsCount = Math.max(1, Math.round(jobNotes.filter(j => j.status === 'Job Done').length * multiplier));
  const pendingJobsCount = jobNotes.filter(j => j.status === 'Job Pending').length;
  const failedJobsCount = jobNotes.filter(j => j.status === 'Job Fail').length;
  const cancelledJobsCount = jobNotes.filter(j => j.status === 'Job Cancelled').length;

  const totalInventoryStockCost = inventory.reduce((sum, item) => sum + (item.cost * item.stock), 0);
  const totalInventoryRetailValue = inventory.reduce((sum, item) => sum + (item.price * item.stock), 0);

  const totalCombinedIncome = totalRepairRevenue + totalAdvancesCollected;
  const maxChartValue = Math.max(totalAdvancesCollected, totalRepairRevenue, totalCombinedIncome, 1000);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'telephone') {
      const cleaned = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: cleaned }));
    } else if (name === 'idNumber') {
      const sliced = value.slice(0, 12);
      setFormData(prev => ({ ...prev, [name]: sliced }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (field) => {
    setFormData(prev => ({
      ...prev,
      receivedWith: {
        ...prev.receivedWith,
        [field]: !prev.receivedWith[field]
      }
    }));
  };

  const handleCreateJobNote = (e) => {
    e.preventDefault();
    if (formData.telephone.length !== 10) {
      setPhoneError('Telephone number must be exactly 10 digits.');
      return;
    } else {
      setPhoneError('');
    }

    const newId = (parseInt(jobNotes[0]?.id || '3000') + 1).toString();
    const newJob = {
      id: newId,
      date: currentDate,
      customerName: formData.customerName || 'Walk-in Customer',
      telephone: formData.telephone || 'N/A',
      idNumber: formData.idNumber || '-',
      deviceType: formData.deviceType || 'Mobile Phone',
      deviceModel: `${formData.deviceBrand === 'Other' ? formData.customBrand : formData.deviceBrand} ${formData.deviceModel}`.trim() || 'Unknown Device',
      imei: formData.imei || '-',
      repairFault: formData.repairFault || 'General Checkup',
      estimatedCost: parseFloat(formData.estimatedCost) || 0,
      advancePaid: parseFloat(formData.advancePaid) || 0,
      notes: formData.notes,
      receivedWith: formData.receivedWith,
      status: 'Job Pending',
      completedDate: '',
      returnDate: '',
      photoUrls: formData.photoUrls || []
    };

    setJobNotes([newJob, ...jobNotes]);
    setSelectedJob(newJob);
    setPrintType('thermal');
    
    setFormData({
      customerName: '',
      telephone: '',
      idNumber: '',
      deviceType: 'Mobile Phone',
      deviceBrand: 'Apple',
      customBrand: '',
      deviceModel: brandModelsMap['Apple'][0],
      imei: '',
      repairFault: '',
      estimatedCost: '',
      advancePaid: '',
      notes: '',
      receivedWith: {
        battery: true,
        charger: false,
        cover: false,
        backPanel: true,
        simCard: false,
        bag: false
      },
      photoUrls: []
    });
  };

  const handleStatusChange = (jobId, newStatus) => {
    setJobNotes(prev => prev.map(job => {
      if (job.id === jobId) {
        return { 
          ...job, 
          status: newStatus,
          completedDate: newStatus === 'Job Done' ? currentDate : job.completedDate
        };
      }
      return job;
    }));
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const handleLookupRepair = () => {
    const found = jobNotes.find(j => j.id === repairSettlementId || j.telephone === repairSettlementId);
    if (found) {
      setSettledRepair(found);
    } else {
      alert('Repair job not found!');
      setSettledRepair(null);
    }
  };

  const startCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Camera access denied or unavailable on this device.");
      setIsCameraOpen(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  const startImeiScanner = async () => {
    setIsImeiScannerOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (imeiVideoRef.current) {
        imeiVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Camera access denied or unavailable for IMEI scanner.");
      setIsImeiScannerOpen(false);
    }
  };

  const stopImeiScanner = () => {
    if (imeiVideoRef.current && imeiVideoRef.current.srcObject) {
      imeiVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setIsImeiScannerOpen(false);
  };

  const captureImeiFromCamera = () => {
    const simulatedScannedImei = "8642" + Math.floor(10000000000 + Math.random() * 90000000000).toString();
    setFormData(prev => ({ ...prev, imei: simulatedScannedImei }));
    stopImeiScanner();
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvasRef.current.toDataURL('image/jpeg');
      setFormData(prev => ({ ...prev, photoUrls: [...prev.photoUrls, dataUrl] }));
      stopCamera();
    }
  };

  const handleFileUpload = (file) => {
    if (file && formData.photoUrls.length < 3) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, photoUrls: [...prev.photoUrls, reader.result] }));
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0A1120] font-sans select-none p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-2xl mx-auto shadow-lg">
              LM
            </div>
            <h1 className="text-xl font-bold text-white tracking-wide">POS v2.0</h1>
            <p className="text-xs text-slate-400">Enter Access PIN to Open POS System (Demo PIN: 1234)</p>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            if (loginPin === '1234' || loginPin === '') {
              setIsLoggedIn(true);
            } else {
              alert('Incorrect PIN! Default PIN is 1234');
            }
          }} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">System Operator PIN</label>
              <input 
                type="password"
                maxLength={6}
                placeholder="••••"
                value={loginPin}
                onChange={(e) => setLoginPin(e.target.value)}
                className="w-full px-4 py-3 text-center text-lg tracking-widest bg-slate-950 border border-slate-700 text-white rounded-xl focus:outline-none focus:border-emerald-500 font-bold"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm shadow-lg transition-all"
            >
              Login to System
            </button>
          </form>

          <div className="text-center pt-2 text-[11px] text-slate-500">
            <span>Secure POS v2.0 • Offline Ready</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen font-sans overflow-hidden select-none transition-colors duration-300 ${isDarkMode ? 'dark' : ''} bg-[#F8FAFC] text-slate-800`}>
      {isDarkMode && (
        <style>{`
          .dark, .dark .bg-\\[\\#F8FAFC\\] { background-color: #0f172a !important; color: #f8fafc !important; }
          .dark .bg-white { background-color: #1e293b !important; border-color: #334155 !important; }
          .dark .bg-slate-50, .dark .bg-slate-50\\/70, .dark .bg-slate-100 { background-color: #0f172a !important; border-color: #334155 !important; }
          .dark .bg-slate-200 { background-color: #334155 !important; color: #f8fafc !important; }
          .dark .hover\\:bg-slate-300:hover { background-color: #475569 !important; }
          .dark .bg-slate-300 { background-color: #475569 !important; }
          .dark .hover\\:bg-slate-400:hover { background-color: #64748b !important; }
          .dark input, .dark select, .dark textarea { background-color: #0f172a !important; color: #f8fafc !important; border-color: #334155 !important; font-size: 0.75rem !important; }
          .dark input:focus, .dark select:focus, .dark textarea:focus { border-color: #00A86B !important; }
          .dark label { color: #cbd5e1 !important; }
          .dark .text-slate-900, .dark .text-slate-800 { color: #f8fafc !important; }
          .dark .text-slate-700, .dark .text-slate-600 { color: #cbd5e1 !important; }
          .dark .text-slate-500, .dark .text-slate-400 { color: #94a3b8 !important; }
          .dark .border-slate-100, .dark .border-slate-200, .dark .border-slate-300 { border-color: #334155 !important; }
          .dark .bg-amber-50, .dark .bg-amber-50\\/70 { background-color: #451a03 !important; border-color: #78350f !important; }
          .dark .text-amber-900, .dark .text-amber-800, .dark .text-amber-700 { color: #fde68a !important; }
          .dark .bg-amber-100 { background-color: #78350f !important; color: #fde68a !important; }
          .dark .bg-emerald-100 { background-color: #064e3b !important; color: #6ee7b7 !important; }
          .dark .bg-\\[\\#E6F7F0\\] { background-color: #022c22 !important; border-color: #065f46 !important; color: #34d399 !important; }
        `}</style>
      )}
      
      {/* SIDEBAR NAVIGATION - Dark Navy Blue */}
      <div className="w-64 bg-[#0A1120] text-slate-300 flex flex-col justify-between shrink-0">
        <div>
          <div className="p-4 border-b border-slate-800 flex items-center space-x-3 bg-slate-950">
            <div className="relative group cursor-pointer shrink-0">
              {shopLogo ? (
                <img src={shopLogo} alt="Logo" className="w-14 h-14 rounded-xl object-cover shadow-lg border border-emerald-500" />
              ) : (
                <div className="w-14 h-14 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-2xl shadow-lg">
                  LM
                </div>
              )}
              <label className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                Change
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setShopLogo(reader.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>
            <div className="overflow-hidden">
              <p className="text-xs text-emerald-400 font-bold tracking-wide">POS v2.0</p>
            </div>
          </div>

          {/* DRAG AND DROP TABS CONTAINER */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">
            {tabsOrder.map((tab, index) => {
              const IconComp = tab.icon;
              const isSelected = activeTab === tab.id;
              const badgeCount = tab.badge === 'pendingCount' ? jobNotes.filter(j => j.status === 'Job Pending').length : null;

              return (
                <div
                  key={tab.id}
                  draggable
                  onDragStart={() => setDraggedTabIndex(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (draggedTabIndex === null || draggedTabIndex === index) return;
                    const updatedTabs = [...tabsOrder];
                    const [movedTab] = updatedTabs.splice(draggedTabIndex, 1);
                    updatedTabs.splice(index, 0, movedTab);
                    setTabsOrder(updatedTabs);
                    setDraggedTabIndex(null);
                  }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-grab active:cursor-grabbing ${
                    isSelected ? 'bg-emerald-600 text-white shadow-md' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <IconComp className="w-5 h-5 shrink-0" />
                    <span className="truncate">{tab.label}</span>
                  </div>

                  <div className="flex items-center space-x-1.5 shrink-0">
                    {badgeCount !== null && badgeCount > 0 && (
                      <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-sm">
                        {badgeCount}
                      </span>
                    )}
                    <GripVertical className="w-4 h-4 text-slate-500 hover:text-slate-300 opacity-60" />
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        <div className="p-3 border-t border-slate-800 space-y-2">
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'settings' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium hover:bg-rose-900/30 text-rose-400 transition-all"
          >
            <Lock className="w-4 h-4" />
            <span>Logout / Lock System</span>
          </button>
          <div className="px-3 py-1.5 rounded bg-slate-950 text-[11px] text-slate-400 flex justify-between items-center font-medium">
            <span>DEMO MODE: Active</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50">
        
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-bold text-slate-800 capitalize">
              {activeTab === 'job-note' && 'New Repair Job Note'}
              {activeTab === 'kanban' && 'Repair Progress Board'}
              {activeTab === 'pos' && 'Point of Sale & Billing'}
              {activeTab === 'inventory' && 'Stock & Spare Parts Inventory'}
              {activeTab === 'search' && 'IMEI & Repair History Lookup'}
              {activeTab === 'customers' && 'Customer Relationship & Feedback Directory'}
              {activeTab === 'reports' && 'Shop Performance & Accounts Dashboard'}
              {activeTab === 'backup' && 'Data Backup & Excel/CSV Export Center'}
              {activeTab === 'settings' && 'System Configuration & Security'}
            </h2>
          </div>

          <div className="flex items-center space-x-3 text-xs text-slate-500">
            <span>Date: {currentDate}</span>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors shadow-sm ml-2"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          
          {activeTab === 'job-note' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <form onSubmit={handleCreateJobNote} className="space-y-6">
                  
                  {/* Customer Information */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-900 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg border-l-4 border-l-emerald-500 mb-3 inline-block">
                      1. Customer Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Customer Name <span className="text-rose-600">*</span></label>
                        <input 
                          type="text"
                          name="customerName"
                          required
                          placeholder="Full Name"
                          value={formData.customerName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Telephone No <span className="text-rose-600">*</span></label>
                        <input 
                          type="text"
                          name="telephone"
                          required
                          maxLength={10}
                          placeholder="e.g. 0771234567"
                          value={formData.telephone}
                          onChange={(e) => {
                            handleInputChange(e);
                            if (e.target.value.length === 10) setPhoneError('');
                          }}
                          className={`w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:outline-none ${
                            phoneError ? 'border-rose-500 focus:ring-rose-500 bg-rose-50/30' : 'border-slate-300 focus:ring-emerald-500'
                          }`}
                        />
                        {phoneError && (
                          <p className="text-[11px] text-rose-600 mt-1 font-semibold">{phoneError}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">ID Number (NIC)</label>
                        <input 
                          type="text"
                          name="idNumber"
                          maxLength={12}
                          placeholder="NIC Number"
                          value={formData.idNumber}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Device Information */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-900 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg border-l-4 border-l-emerald-500 mb-3 inline-block">
                      2. Device & Fault Specification
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Device Type <span className="text-rose-600">*</span></label>
                        <select 
                          name="deviceType"
                          value={formData.deviceType}
                          onChange={(e) => {
                            const newType = e.target.value;
                            if (newType === 'Laptop') {
                              setFormData(prev => ({
                                ...prev,
                                deviceType: newType,
                                deviceBrand: 'Lenovo',
                                deviceModel: ''
                              }));
                            } else if (newType === 'Tab') {
                              setFormData(prev => ({
                                ...prev,
                                deviceType: newType,
                                deviceBrand: 'Apple',
                                deviceModel: ''
                              }));
                            } else {
                              const firstBrand = Object.keys(brandModelsMap)[0];
                              setFormData(prev => ({
                                ...prev,
                                deviceType: newType,
                                deviceBrand: firstBrand,
                                deviceModel: brandModelsMap[firstBrand][0]
                              }));
                            }
                          }}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white font-medium"
                        >
                          <option value="Mobile Phone">Mobile Phone</option>
                          <option value="Laptop">Laptop</option>
                          <option value="Tab">Tab</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Device Brand <span className="text-rose-600">*</span></label>
                        {formData.deviceBrand === 'Other' ? (
                          <div className="relative flex items-center">
                            <input 
                              type="text"
                              name="customBrand"
                              required
                              placeholder="Type Custom Brand Name"
                              value={formData.customBrand || ''}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 pr-8 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
                              autoFocus
                            />
                            <button
                              type="button"
                              title="Switch back to brand dropdown list"
                              onClick={() => {
                                const defaultBrand = formData.deviceType === 'Laptop' ? 'Lenovo' : formData.deviceType === 'Tab' ? 'Apple' : Object.keys(brandModelsMap)[0];
                                setFormData(prev => ({
                                  ...prev,
                                  deviceBrand: defaultBrand,
                                  customBrand: '',
                                  deviceModel: brandModelsMap[defaultBrand]?.[0] || ''
                                }));
                              }}
                              className="absolute right-2 text-slate-400 hover:text-slate-600 text-xs font-bold px-1"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <select 
                            name="deviceBrand"
                            value={formData.deviceBrand}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === 'Other') {
                                setFormData(prev => ({
                                  ...prev,
                                  deviceBrand: 'Other',
                                  customBrand: '',
                                  deviceModel: ''
                                }));
                              } else if (formData.deviceType === 'Laptop' || formData.deviceType === 'Tab') {
                                setFormData(prev => ({ 
                                  ...prev, 
                                  deviceBrand: val,
                                  deviceModel: ''
                                }));
                              } else {
                                const firstModel = brandModelsMap[val]?.[0] || '';
                                setFormData(prev => ({ 
                                  ...prev, 
                                  deviceBrand: val,
                                  deviceModel: firstModel
                                }));
                              }
                            }}
                            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white font-medium"
                          >
                            {formData.deviceType === 'Laptop' ? (
                              laptopBrands.map(brand => (
                                <option key={brand} value={brand}>{brand}</option>
                              ))
                            ) : formData.deviceType === 'Tab' ? (
                              tabBrands.map(brand => (
                                <option key={brand} value={brand}>{brand}</option>
                              ))
                            ) : (
                              Object.keys(brandModelsMap).map(brand => (
                                <option key={brand} value={brand}>{brand}</option>
                              ))
                            )}
                            <option value="Other">Other (Type Custom)</option>
                          </select>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Device Model <span className="text-rose-600">*</span></label>
                        {formData.deviceBrand === 'Other' || formData.deviceType === 'Laptop' || formData.deviceType === 'Tab' ? (
                          <input 
                            type="text"
                            name="deviceModel"
                            required
                            placeholder={
                              formData.deviceType === 'Laptop' 
                                ? "Type Laptop Model (e.g. ThinkPad T14, Pavilion 15)" 
                                : formData.deviceType === 'Tab' 
                                ? "Type Tab Model (e.g. iPad Air 5, Galaxy Tab S9)" 
                                : "Type Custom Model Name"
                            }
                            value={formData.deviceModel}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
                          />
                        ) : (
                          <select
                            name="deviceModel"
                            value={formData.deviceModel}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white font-medium"
                          >
                            {brandModelsMap[formData.deviceBrand]?.map(model => (
                              <option key={model} value={model}>{model}</option>
                            ))}
                          </select>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">IMEI / Serial Number</label>
                        <div className="relative flex items-center">
                          <input 
                            type="text"
                            name="imei"
                            placeholder="15-digit IMEI Code"
                            value={formData.imei}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 pr-9 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={startImeiScanner}
                            title="Scan IMEI / Barcode using Camera"
                            className="absolute right-1.5 p-1 bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 rounded-md transition-colors"
                          >
                            <Camera className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Repair Fault Description <span className="text-rose-600">*</span></label>
                        <textarea 
                          name="repairFault"
                          required
                          rows={2}
                          placeholder="e.g. Charging issue / Display change / Over heating"
                          value={formData.repairFault}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-y min-h-[42px]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Received With Checkboxes */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-900 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg border-l-4 border-l-emerald-500 mb-3 inline-block">
                      3. Received Accessories Checklist
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                      {[
                        { key: 'battery', label: 'Battery' },
                        { key: 'charger', label: 'Charger' },
                        { key: 'cover', label: 'Back Cover' },
                        { key: 'backPanel', label: 'Back Panel' },
                        { key: 'simCard', label: 'Sim Card / Tray' },
                        { key: 'bag', label: 'Pouch / Bag' }
                      ].map(item => (
                        <label key={item.key} className="flex items-center space-x-2 text-xs font-medium text-slate-700 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={formData.receivedWith[item.key]}
                            onChange={() => handleCheckboxChange(item.key)}
                            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-slate-300"
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Device Condition Photo Attachment */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-900 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg border-l-4 border-l-emerald-500 mb-3 inline-block">
                      4. Device Condition Photo Attachment
                    </h4>
                    <p className="text-[10px] text-slate-500 mb-2 font-medium">Capture initial scratch/damage status before repair. (Max 3 photos)</p>
                    
                    <div className="flex flex-col space-y-4">
                      {formData.photoUrls.length < 3 && (
                        <div className="flex gap-4">
                          <label 
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`flex-1 cursor-pointer border-2 border-dashed ${
                              isDragging ? 'border-emerald-500 bg-emerald-100/50' : 'border-slate-300 bg-slate-50'
                            } rounded-xl p-4 flex flex-col items-center justify-center hover:border-emerald-500 hover:bg-emerald-50 transition-colors h-24`}
                          >
                            <ImageIcon className="w-5 h-5 text-slate-400 mb-1" />
                            <span className="text-xs font-semibold text-slate-600 text-center">
                              {isDragging ? 'Drop Image Here' : 'Upload or Drag & Drop File'}
                            </span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleFileUpload(e.target.files[0]);
                                }
                              }}
                            />
                          </label>

                          <button
                            type="button"
                            onClick={startCamera}
                            className="flex-1 cursor-pointer border-2 border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center hover:border-emerald-500 hover:bg-emerald-50 transition-colors bg-slate-50 h-24"
                          >
                            <Camera className="w-5 h-5 text-slate-400 mb-1" />
                            <span className="text-xs font-semibold text-slate-600 text-center">Open Camera</span>
                          </button>
                        </div>
                      )}
                      
                      {formData.photoUrls.length > 0 && (
                        <div className="flex gap-3 flex-wrap">
                          {formData.photoUrls.map((url, idx) => (
                            <div key={idx} className="relative w-24 h-24 rounded-xl border border-slate-200 overflow-hidden shadow-sm flex-shrink-0 bg-white">
                              <img src={url} alt={`Condition ${idx + 1}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, photoUrls: prev.photoUrls.filter((_, i) => i !== idx) }))}
                                className="absolute top-1 right-1 bg-rose-500/90 text-white rounded-full p-1 hover:bg-rose-600 shadow-md backdrop-blur-sm"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payment Estimation & Notes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-200 pt-2 mt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Estimated Cost (Rs.)</label>
                      <input 
                        type="number"
                        name="estimatedCost"
                        placeholder="0.00"
                        value={formData.estimatedCost}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Advance Paid (Rs.)</label>
                      <input 
                        type="number"
                        name="advancePaid"
                        placeholder="0.00"
                        value={formData.advancePaid}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold text-emerald-700"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Internal Notes / Technician Remarks</label>
                      <textarea 
                        name="notes"
                        rows="2"
                        placeholder="e.g. Minor scratches on back. Replacement display requested original."
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-end space-x-3">
                    <button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm shadow-md flex items-center space-x-2 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Job Note & Print Receipt</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column: Recent Job Notes */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                  <h3 className="font-bold text-sm text-slate-800 mb-4 flex items-center justify-between">
                    <span>Recent Job Notes</span>
                    <span className="text-xs font-normal text-slate-500">{jobNotes.length} Total Records</span>
                  </h3>

                  <div className="space-y-3">
                    {jobNotes.map(job => (
                      <div 
                        key={job.id} 
                        className="p-3.5 rounded-lg border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-white transition-all text-xs space-y-2 cursor-pointer"
                        onClick={() => setSelectedJob(job)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold text-slate-900 text-sm">#{job.id}</span>
                            <p className="font-medium text-slate-700">{job.customerName} ({job.telephone})</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            job.status === 'Job Done' ? 'bg-emerald-100 text-emerald-800' :
                            job.status === 'Job Pending' ? 'bg-amber-100 text-amber-800' :
                            'bg-rose-100 text-rose-800'
                          }`}>
                            {job.status}
                          </span>
                        </div>

                        <div className="text-slate-600 space-y-0.5">
                          <p><span className="font-semibold">Type:</span> {job.deviceType || 'Mobile Phone'}</p>
                          <p><span className="font-semibold">Device:</span> {job.deviceModel}</p>
                          <p><span className="font-semibold">Fault:</span> {job.repairFault}</p>
                          <p><span className="font-semibold">Est / Adv:</span> Rs. {job.estimatedCost} / Rs. {job.advancePaid}</p>
                        </div>

                        <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedJob(job);
                              setPrintType('thermal');
                            }}
                            className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 py-1 px-1.5 rounded font-medium text-[10px] flex items-center justify-center gap-1"
                          >
                            <Printer className="w-3 h-3" />
                            <span>80mm</span>
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedJob(job);
                              setPrintType('normal');
                            }}
                            className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 py-1 px-1.5 rounded font-medium text-[10px] flex items-center justify-center gap-1"
                          >
                            <FileText className="w-3 h-3" />
                            <span>A4 Print</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-2">
                  <div className="flex items-center space-x-2 font-bold text-amber-950">
                    <ShieldAlert className="w-4 h-4 text-amber-700" />
                    <span>Warranty & Terms Notice</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-[11px] leading-relaxed font-medium">
                    <li>උපකරණ නැවත ලබාගැනීම සඳහා මෙම රිසිට්පත ඉදිරිපත් කිරීම අනිවාර්වේ.</li>
                    <li>අලුත්වැඩියාවෙන් පසුව දින 30ක් ඇතුලත රැගෙන නොයන උපකරණ සඳහා වගකියනු නොලැබේ. (ප්‍රමාද ගාස්තු අයකෙරේ)</li>
                    <li>දින 90ක් ඉක්මවන විටත් රැගෙන නොගිය උපකරණ, අයිතිය අත්හැරගිය උපකරණ සේ සලකනු ලැබේ.</li>
                  </ul>
                  <p className="text-[11px] font-bold mt-2">ඉහත කොන්දේසි වලට එකඟවෙමි.</p>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'kanban' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex justify-between items-center">
                <p className="text-sm text-slate-600">Track and update active device repair stages in real-time.</p>
                <button 
                  onClick={() => setActiveTab('job-note')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Job</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { title: 'Job Pending', color: 'border-amber-400 bg-amber-50', badge: 'bg-amber-100 text-amber-800' },
                  { title: 'Job Done', color: 'border-emerald-400 bg-emerald-50', badge: 'bg-emerald-100 text-emerald-800' },
                  { title: 'Job Fail', color: 'border-rose-400 bg-rose-50', badge: 'bg-rose-100 text-rose-800' },
                  { title: 'Job Cancelled', color: 'border-slate-400 bg-slate-100', badge: 'bg-slate-200 text-slate-700' }
                ].map(col => {
                  const filteredJobs = jobNotes.filter(j => j.status === col.title);
                  return (
                    <div key={col.title} className="bg-slate-100 rounded-xl p-3 border border-slate-200 flex flex-col min-h-[500px]">
                      <div className={`p-2.5 rounded-lg font-bold text-xs flex justify-between items-center mb-3 border-l-4 ${col.color} bg-white shadow-sm`}>
                        <span>{col.title}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${col.badge}`}>
                          {filteredJobs.length}
                        </span>
                      </div>

                      <div className="space-y-3 flex-1 overflow-y-auto">
                        {filteredJobs.map(job => (
                          <div key={job.id} className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm hover:shadow transition-all text-xs space-y-2">
                            <div className="flex justify-between font-bold">
                              <span className="text-slate-900">#{job.id}</span>
                              <span className="text-slate-500 font-normal">{job.date}</span>
                            </div>
                            <p className="font-semibold text-slate-800">{job.customerName}</p>
                            <p className="text-slate-600"><span className="font-medium">Type:</span> {job.deviceType || 'Mobile Phone'}</p>
                            <p className="text-slate-600"><span className="font-medium">Device:</span> {job.deviceModel}</p>
                            <p className="text-slate-600"><span className="font-medium">Fault:</span> {job.repairFault}</p>
                            
                            <div className="flex flex-wrap gap-1 text-[10px]">
                              {Object.entries(job.receivedWith).map(([key, val]) => val && (
                                <span key={key} className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded capitalize">
                                  {key}
                                </span>
                              ))}
                            </div>

                            <div className="pt-2 border-t border-slate-100 space-y-1">
                              <label className="text-[10px] text-slate-400 font-semibold uppercase">Change Status:</label>
                              <select
                                value={job.status}
                                onChange={(e) => handleStatusChange(job.id, e.target.value)}
                                className="w-full p-1 text-xs border border-slate-300 rounded bg-slate-50 font-medium"
                              >
                                <option value="Job Pending">Job Pending</option>
                                <option value="Job Done">Job Done</option>
                                <option value="Job Fail">Job Fail</option>
                                <option value="Job Cancelled">Job Cancelled</option>
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'pos' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-emerald-600" />
                      Select Product / Spare Part
                    </h3>
                    <input 
                      type="text" 
                      placeholder="Scan Barcode or Search Item..."
                      className="text-xs px-3 py-1.5 border border-slate-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {inventory.map(product => (
                      <div key={product.id} className="p-3 border border-slate-200 rounded-lg flex justify-between items-center hover:border-emerald-500 bg-slate-50 transition-all">
                        <div>
                          <p className="font-bold text-xs text-slate-800">{product.name}</p>
                          <p className="text-[10px] text-slate-500">{product.category} | Stock: {product.stock}</p>
                          <p className="text-xs font-bold text-emerald-700 mt-1">Rs. {product.price}</p>
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-1 shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
                  <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-amber-600" />
                    Settle Repair Job Note Balance
                  </h3>
                  
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      placeholder="Enter Job Note No (e.g. 3036) or Tel"
                      value={repairSettlementId}
                      onChange={(e) => setRepairSettlementId(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      onClick={handleLookupRepair}
                      className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-2 rounded-lg"
                    >
                      Lookup Repair
                    </button>
                  </div>

                  {settledRepair && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs space-y-2">
                      <div className="flex justify-between font-bold text-amber-950">
                        <span>Job Note #{settledRepair.id} - {settledRepair.customerName}</span>
                        <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded">{settledRepair.status}</span>
                      </div>
                      <p className="text-amber-900">Device: {settledRepair.deviceModel} ({settledRepair.repairFault})</p>
                      <div className="flex justify-between text-amber-900 border-t border-amber-200 pt-2 font-semibold">
                        <span>Estimated: Rs. {settledRepair.estimatedCost}</span>
                        <span>Advance: -Rs. {settledRepair.advancePaid}</span>
                        <span className="text-emerald-700 font-bold">Balance Due: Rs. {settledRepair.estimatedCost - settledRepair.advancePaid}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-slate-800 border-b pb-3 flex justify-between items-center">
                    <span>Checkout Invoice</span>
                    <span className="text-xs text-slate-500 font-normal">{cart.length} items</span>
                  </h3>

                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {cart.length === 0 && !settledRepair ? (
                      <p className="text-xs text-slate-400 text-center py-6">No products added to invoice.</p>
                    ) : (
                      <>
                        {cart.map(item => (
                          <div key={item.id} className="flex justify-between items-center text-xs text-slate-700 border-b pb-2">
                            <div>
                              <p className="font-semibold">{item.name}</p>
                              <p className="text-[10px] text-slate-500">Rs. {item.price} x {item.qty}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold">Rs. {item.price * item.qty}</span>
                              <button 
                                onClick={() => setCart(cart.filter(c => c.id !== item.id))}
                                className="text-rose-500 hover:text-rose-700"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}

                        {settledRepair && (
                          <div className="flex justify-between items-center text-xs text-amber-900 bg-amber-50 p-2 rounded border border-amber-200">
                            <div>
                              <p className="font-bold">Repair Balance #{settledRepair.id}</p>
                              <p className="text-[10px] text-amber-700">{settledRepair.deviceModel}</p>
                            </div>
                            <span className="font-bold">Rs. {settledRepair.estimatedCost - settledRepair.advancePaid}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Courier / Rapid Delivery Charges (Rs.)</label>
                    <input 
                      type="number" 
                      placeholder="0.00"
                      value={courierFee}
                      onChange={(e) => setCourierFee(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3 mt-4">
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span>Rs. {subtotal}</span>
                    </div>
                    {courierFee > 0 && (
                      <div className="flex justify-between text-slate-600">
                        <span>Courier Fee</span>
                        <span>Rs. {courierFee}</span>
                      </div>
                    )}
                    {settledRepair && (
                      <div className="flex justify-between text-amber-800">
                        <span>Repair Settlement</span>
                        <span>Rs. {repairBalance}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-bold text-slate-900 border-t pt-2">
                      <span>Grand Total</span>
                      <span className="text-emerald-600">Rs. {grandTotal}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (grandTotal === 0) return alert('Cart is empty!');
                      alert('Bill Paid Successfully! Printing Thermal Slip...');
                      setCart([]);
                      setSettledRepair(null);
                      setCourierFee(0);
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg text-xs shadow-md flex justify-center items-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Complete Sale & Print Receipt</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-7xl mx-auto space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-slate-800">Item Stock & Spare Parts Inventory</h3>
                <button 
                  onClick={() => alert('New product entry form unlocked.')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Stock Item</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 uppercase font-semibold border-b">
                      <th className="p-3">Item Code</th>
                      <th className="p-3">Product Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Cost Price</th>
                      <th className="p-3">Selling Price</th>
                      <th className="p-3">Stock Quantity</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {inventory.map(item => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">#{item.id}</td>
                        <td className="p-3 font-medium">{item.name}</td>
                        <td className="p-3">{item.category}</td>
                        <td className="p-3 text-slate-500">Rs. {item.cost}</td>
                        <td className="p-3 font-bold text-emerald-700">Rs. {item.price}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded font-bold ${
                            item.stock <= 5 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {item.stock} pcs
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button 
                            onClick={() => alert('Price edit unlocked.')}
                            className="text-slate-500 hover:text-slate-800 font-medium"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'search' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-4xl mx-auto space-y-6">
              <div>
                <h3 className="font-bold text-base text-slate-800 mb-1">IMEI & Repair Job Search</h3>
                <p className="text-xs text-slate-500">Enter IMEI Number, Customer Name, Telephone or Job Note ID to lookup repair history.</p>
              </div>

              <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="e.g. 864201048291029 or 0774525671 or 3036"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-4">
                {jobNotes
                  .filter(j => 
                    j.id.includes(searchQuery) || 
                    j.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    j.telephone.includes(searchQuery) ||
                    j.imei.includes(searchQuery)
                  )
                  .map(job => (
                    <div key={job.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
                      <div className="flex justify-between items-center border-b pb-2">
                        <div>
                          <span className="font-bold text-sm text-slate-900">Job Note No: #{job.id}</span>
                          <span className="ml-3 text-xs text-slate-500">Registered: {job.date}</span>
                        </div>
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
                          {job.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                        <div><span className="text-slate-400">Customer:</span> <p className="font-semibold text-slate-800">{job.customerName}</p></div>
                        <div><span className="text-slate-400">Phone:</span> <p className="font-semibold text-slate-800">{job.telephone}</p></div>
                        <div><span className="text-slate-400">Type:</span> <p className="font-semibold text-slate-800">{job.deviceType || 'Mobile Phone'}</p></div>
                        <div><span className="text-slate-400">Device:</span> <p className="font-semibold text-slate-800">{job.deviceModel}</p></div>
                      </div>

                      <div className="text-xs bg-white p-2.5 rounded border border-slate-200">
                        <p><span className="font-semibold text-slate-700">Fault:</span> {job.repairFault}</p>
                        <p className="text-slate-500 mt-1"><span className="font-semibold">Notes:</span> {job.notes}</p>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <button 
                          onClick={() => { setSelectedJob(job); setPrintType('thermal'); }}
                          className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-800 px-3 py-1.5 rounded font-medium flex items-center gap-1"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          View Thermal Slip
                        </button>
                        <button 
                          onClick={() => { setSelectedJob(job); setPrintType('normal'); }}
                          className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-800 px-3 py-1.5 rounded font-medium flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          View Full Job Note
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-base text-slate-800">Customer Management & Owner Feedback</h3>
                  <p className="text-xs text-slate-500">Track customer details, store interaction history, and leave shop owner ratings and notes.</p>
                </div>
                <div className="flex items-center gap-3">
                  <input 
                    type="text"
                    placeholder="Search by name, telephone, NIC..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64"
                  />
                  <button 
                    onClick={() => setShowAddCustomerModal(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1 shadow-sm whitespace-nowrap"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Add New Customer</span>
                  </button>
                </div>
              </div>

              {/* Customer List Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {customers
                  .filter(c => 
                    c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
                    c.telephone.includes(customerSearch) ||
                    c.idNumber.includes(customerSearch)
                  )
                  .map(cust => {
                    const custJobs = jobNotes.filter(j => j.telephone === cust.telephone || j.customerName.toLowerCase() === cust.name.toLowerCase());
                    return (
                      <div key={cust.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 hover:bg-white hover:border-emerald-500 transition-all flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-bold text-sm text-slate-900">{cust.name}</h4>
                              <p className="text-xs text-slate-500 font-medium">📞 {cust.telephone}</p>
                            </div>
                            <div className="flex items-center bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200 text-xs font-bold">
                              <Star className="w-3 h-3 text-amber-500 fill-amber-400 mr-1" />
                              <span>{cust.rating}.0</span>
                            </div>
                          </div>

                          <div className="space-y-1 text-xs text-slate-600 border-t pt-2 mt-2">
                            <p><span className="font-semibold text-slate-700">ID / NIC:</span> {cust.idNumber || '-'}</p>
                            <p><span className="font-semibold text-slate-700">Email:</span> {cust.email || '-'}</p>
                            <p><span className="font-semibold text-slate-700">Address:</span> {cust.address || '-'}</p>
                          </div>

                          {/* Order & Spending summary */}
                          <div className="grid grid-cols-2 gap-2 my-3 p-2 bg-slate-100 rounded text-xs">
                            <div>
                              <span className="text-[10px] text-slate-500 block">Total Repairs</span>
                              <span className="font-bold text-slate-800">{custJobs.length} Jobs</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-500 block">Total Value</span>
                              <span className="font-bold text-emerald-700">Rs. {custJobs.reduce((acc, j) => acc + (j.estimatedCost || 0), 0)}</span>
                            </div>
                          </div>

                          {/* Feedback / Notes Section */}
                          <div className="border-t border-slate-200 pt-2 space-y-1">
                            <span className="text-[11px] font-bold text-slate-700 block flex items-center justify-between">
                              <span>Shop Owner Remarks:</span>
                              <span className="text-[10px] text-slate-400">({cust.feedbackHistory?.length || 0})</span>
                            </span>

                            {cust.feedbackHistory && cust.feedbackHistory.length > 0 ? (
                              <div className="max-h-24 overflow-y-auto space-y-1 pr-1">
                                {cust.feedbackHistory.map((fb, idx) => (
                                  <div key={idx} className="bg-amber-50/70 border border-amber-200/60 p-2 rounded text-[11px] text-amber-900">
                                    <div className="flex justify-between items-center text-[9px] text-amber-700 font-semibold mb-0.5">
                                      <span>{fb.date}</span>
                                      <span className="flex items-center">
                                        <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-400 mr-0.5" />
                                        {fb.rating} / 5
                                      </span>
                                    </div>
                                    <p className="leading-snug">{fb.text}</p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-[11px] text-slate-400 italic">No owner feedback added yet.</p>
                            )}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-200 flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedCustomerForFeedback(cust);
                              setNewFeedbackText('');
                              setNewCustomerRating(cust.rating || 5);
                            }}
                            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-1.5 px-2 rounded text-xs flex justify-center items-center gap-1 shadow-sm"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Add Feedback</span>
                          </button>

                          <button
                            onClick={() => setEditingCustomer(cust)}
                            className="bg-slate-700 hover:bg-slate-800 text-white font-semibold py-1.5 px-2 rounded text-xs flex items-center justify-center gap-1"
                            title="Edit Customer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => setDeletingCustomer(cust)}
                            className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-1.5 px-2 rounded text-xs flex items-center justify-center gap-1"
                            title="Delete Customer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <a
                            href={`https://wa.me/94${cust.telephone.replace(/^0/, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-1.5 px-3 rounded text-xs flex items-center justify-center gap-1"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
                <div>
                  <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-emerald-600" />
                    Shop Performance & Financial Accounts
                  </h3>
                  <p className="text-xs text-slate-500">Real-time revenue metrics, profit estimations, inventory assets & visual bar chart analytics.</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200 text-xs font-medium">
                    {['Day', 'Week', 'Month', 'Year'].map(range => (
                      <button
                        key={range}
                        onClick={() => setReportDateRange(range)}
                        className={`px-3.5 py-1.5 rounded-md transition-all ${
                          reportDateRange === range ? 'bg-emerald-600 text-white font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => window.print()} 
                    className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Report</span>
                  </button>
                </div>
              </div>

              {/* KPI Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex justify-between items-center text-slate-500 text-xs font-medium">
                    <span>Total Repair Value ({reportDateRange})</span>
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-xl font-extrabold text-slate-900">Rs. {totalRepairRevenue.toLocaleString()}</div>
                  <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    <span>{completedJobsCount} Completed Jobs</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex justify-between items-center text-slate-500 text-xs font-medium">
                    <span>Advances Collected ({reportDateRange})</span>
                    <Wallet className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-xl font-extrabold text-slate-900">Rs. {totalAdvancesCollected.toLocaleString()}</div>
                  <div className="text-[11px] text-amber-600 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Cash In Hand</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex justify-between items-center text-slate-500 text-xs font-medium">
                    <span>Pending Receivables</span>
                    <ArrowDownRight className="w-4 h-4 text-rose-500" />
                  </div>
                  <div className="text-xl font-extrabold text-rose-700">Rs. {totalPendingBalances.toLocaleString()}</div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    <span>From {pendingJobsCount} pending repair jobs</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex justify-between items-center text-slate-500 text-xs font-medium">
                    <span>Stock Asset Value</span>
                    <Package className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-xl font-extrabold text-slate-900">Rs. {totalInventoryStockCost.toLocaleString()}</div>
                  <div className="text-[11px] text-blue-600 font-bold">
                    <span>Retail Value: Rs. {totalInventoryRetailValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* COLUMN CHART & JOB STATUS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* COLUMN CHART: Sales, Repairs, Income */}
                <div className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm space-y-4 lg:col-span-2">
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-emerald-600" />
                        Sales, Repairs & Total Income ({reportDateRange})
                      </h4>
                      <p className="text-[11px] text-slate-500">Proper column chart representation changing dynamically by time.</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="h-56 flex items-end justify-around gap-6 px-4 pb-2 border-b border-slate-200 relative">
                      <div className="absolute inset-x-0 top-0 border-b border-slate-100 text-[9px] text-slate-400 pl-1">Max Level</div>
                      <div className="absolute inset-x-0 top-1/2 border-b border-slate-100 text-[9px] text-slate-400 pl-1">Mid Level</div>

                      {/* Column 1: Sales */}
                      <div className="flex flex-col items-center flex-1 max-w-[90px] h-full justify-end group z-10">
                        <span className="text-[10px] font-bold text-slate-800 mb-1 group-hover:scale-110 transition-transform">
                          Rs. {(totalAdvancesCollected / 1000).toFixed(1)}k
                        </span>
                        <div 
                          className="w-full bg-blue-600 rounded-t-lg transition-all duration-500 hover:bg-blue-700 shadow-sm relative"
                          style={{ height: `${Math.max(15, Math.min(100, (totalAdvancesCollected / maxChartValue) * 85))}%` }}
                        ></div>
                        <span className="text-[11px] font-semibold text-slate-600 mt-2">Sales</span>
                      </div>

                      {/* Column 2: Repairs */}
                      <div className="flex flex-col items-center flex-1 max-w-[90px] h-full justify-end group z-10">
                        <span className="text-[10px] font-bold text-slate-800 mb-1 group-hover:scale-110 transition-transform">
                          Rs. {(totalRepairRevenue / 1000).toFixed(1)}k
                        </span>
                        <div 
                          className="w-full bg-amber-500 rounded-t-lg transition-all duration-500 hover:bg-amber-600 shadow-sm relative"
                          style={{ height: `${Math.max(15, Math.min(100, (totalRepairRevenue / maxChartValue) * 85))}%` }}
                        ></div>
                        <span className="text-[11px] font-semibold text-slate-600 mt-2">Repairs</span>
                      </div>

                      {/* Column 3: Total Income */}
                      <div className="flex flex-col items-center flex-1 max-w-[90px] h-full justify-end group z-10">
                        <span className="text-[10px] font-bold text-slate-800 mb-1 group-hover:scale-110 transition-transform">
                          Rs. {(totalCombinedIncome / 1000).toFixed(1)}k
                        </span>
                        <div 
                          className="w-full bg-emerald-600 rounded-t-lg transition-all duration-500 hover:bg-emerald-700 shadow-sm relative"
                          style={{ height: `${Math.max(15, Math.min(100, (totalCombinedIncome / maxChartValue) * 85))}%` }}
                        ></div>
                        <span className="text-[11px] font-semibold text-slate-600 mt-2">Total Income</span>
                      </div>
                    </div>

                    <div className="flex justify-center items-center gap-6 mt-3 text-[11px] font-medium text-slate-600">
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-600"></span> Sales</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-500"></span> Repairs</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-600"></span> Total Income</span>
                    </div>
                  </div>
                </div>

                {/* BAR CHART 2: Repair Status Distribution */}
                <div className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm space-y-4">
                  <div className="border-b pb-3">
                    <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                      <PieChart className="w-4 h-4 text-amber-600" />
                      Repair Job Status Bar Chart
                    </h4>
                    <p className="text-[11px] text-slate-500">Live job count by stage.</p>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-amber-800 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span> Job Pending
                        </span>
                        <span className="font-bold text-slate-800">{pendingJobsCount} Jobs</span>
                      </div>
                      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
                        <div 
                          className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${jobNotes.length ? (pendingJobsCount / jobNotes.length) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-emerald-800 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Job Done
                        </span>
                        <span className="font-bold text-slate-800">{completedJobsCount} Jobs</span>
                      </div>
                      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
                        <div 
                          className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${jobNotes.length ? (completedJobsCount / jobNotes.length) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-rose-800 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-rose-500"></span> Job Fail
                        </span>
                        <span className="font-bold text-slate-800">{failedJobsCount} Jobs</span>
                      </div>
                      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
                        <div 
                          className="bg-rose-500 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${jobNotes.length ? (failedJobsCount / jobNotes.length) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-700 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-slate-400"></span> Job Cancelled
                        </span>
                        <span className="font-bold text-slate-800">{cancelledJobsCount} Jobs</span>
                      </div>
                      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
                        <div 
                          className="bg-slate-400 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${jobNotes.length ? (cancelledJobsCount / jobNotes.length) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-600 font-medium text-center">
                    Total Active Repairs: <span className="font-bold text-slate-900">{jobNotes.length}</span>
                  </div>
                </div>

              </div>

              {/* RECENT TRANSACTIONS SECTION */}
              <div className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      Recent Transactions
                    </h4>
                    <p className="text-[11px] text-slate-500">Latest job notes and repair payment details.</p>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{jobNotes.length} Transactions</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 uppercase font-semibold border-b">
                        <th className="p-3">Job Number</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Device / Fault</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Payment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      {jobNotes.map(job => (
                        <tr key={job.id} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-slate-900">#{job.id}</td>
                          <td className="p-3 font-medium">
                            <div>{job.customerName}</div>
                            <div className="text-[10px] text-slate-400">{job.telephone}</div>
                          </td>
                          <td className="p-3">
                            <div>{job.deviceModel}</div>
                            <div className="text-[10px] text-slate-500">{job.repairFault}</div>
                          </td>
                          <td className="p-3 font-bold text-slate-900">
                            Rs. {job.estimatedCost.toLocaleString()}
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              job.advancePaid >= job.estimatedCost 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : job.advancePaid > 0 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-rose-100 text-rose-800'
                            }`}>
                              {job.advancePaid >= job.estimatedCost 
                                ? 'Paid Full' 
                                : job.advancePaid > 0 
                                ? `Advance: Rs. ${job.advancePaid}` 
                                : 'Pending'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-5xl mx-auto space-y-6">
              <div>
                <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-600" />
                  Data Backup & Spreadsheet Exports
                </h3>
                <p className="text-xs text-slate-500">Export POS records directly into Excel (.csv) sheets or perform full system data backup and restore.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
                <div className="p-4 border border-slate-200 bg-slate-50 rounded-xl space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-1">
                      <FileSpreadsheet className="w-5 h-5" />
                      <span>Repair Job Notes</span>
                    </div>
                    <p className="text-xs text-slate-600">Export all repair jobs, status, estimated costs, customer phones, and repair faults as an Excel file.</p>
                  </div>
                  <button
                    onClick={() => {
                      const headers = ['Job ID', 'Date', 'Customer Name', 'Telephone', 'NIC', 'Device Type', 'Model', 'IMEI', 'Fault', 'Est. Cost', 'Advance Paid', 'Status'];
                      const rows = jobNotes.map(j => [
                        j.id, j.date, `"${j.customerName}"`, `"${j.telephone}"`, `"${j.idNumber}"`, `"${j.deviceType}"`, `"${j.deviceModel}"`, `"${j.imei}"`, `"${j.repairFault}"`, j.estimatedCost, j.advancePaid, j.status
                      ]);
                      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement('a');
                      link.setAttribute('href', encodedUri);
                      link.setAttribute('download', `LuckyMobile_JobNotes_${currentDate.replace(/\//g, '-')}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-lg text-xs flex justify-center items-center gap-1 shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Jobs (Excel/CSV)</span>
                  </button>
                </div>

                <div className="p-4 border border-slate-200 bg-slate-50 rounded-xl space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-blue-700 font-bold text-sm mb-1">
                      <Users className="w-5 h-5" />
                      <span>Customer Records</span>
                    </div>
                    <p className="text-xs text-slate-600">Export complete customer directory, contact numbers, NICs, email addresses, and shop ratings.</p>
                  </div>
                  <button
                    onClick={() => {
                      const headers = ['Customer ID', 'Name', 'Telephone', 'NIC', 'Email', 'Address', 'Rating'];
                      const rows = customers.map(c => [
                        c.id, `"${c.name}"`, `"${c.telephone}"`, `"${c.idNumber || ''}"`, `"${c.email || ''}"`, `"${c.address || ''}"`, c.rating || 5
                      ]);
                      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement('a');
                      link.setAttribute('href', encodedUri);
                      link.setAttribute('download', `LuckyMobile_Customers_${currentDate.replace(/\//g, '-')}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg text-xs flex justify-center items-center gap-1 shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Customers (Excel/CSV)</span>
                  </button>
                </div>

                <div className="p-4 border border-slate-200 bg-slate-50 rounded-xl space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-amber-700 font-bold text-sm mb-1">
                      <Package className="w-5 h-5" />
                      <span>Inventory Stock</span>
                    </div>
                    <p className="text-xs text-slate-600">Export current inventory stock levels, item prices, cost margins, and product categories.</p>
                  </div>
                  <button
                    onClick={() => {
                      const headers = ['Item Code', 'Name', 'Category', 'Cost Price', 'Selling Price', 'Stock Qty'];
                      const rows = inventory.map(i => [
                        i.id, `"${i.name}"`, `"${i.category}"`, i.cost, i.price, i.stock
                      ]);
                      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement('a');
                      link.setAttribute('href', encodedUri);
                      link.setAttribute('download', `LuckyMobile_Inventory_${currentDate.replace(/\//g, '-')}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-3 rounded-lg text-xs flex justify-center items-center gap-1 shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Stock (Excel/CSV)</span>
                  </button>
                </div>
              </div>

              <div className="p-5 border border-slate-200 bg-white rounded-xl space-y-4 border-t-4 border-t-slate-800">
                <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                  <Database className="w-4 h-4 text-slate-700" />
                  Full System Backup & Restore
                </h4>
                <p className="text-xs text-slate-600">Download a complete system snapshot backup file containing all job notes, customer profiles, and inventory data, or restore from an existing backup file.</p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      const fullBackup = {
                        version: '2.0',
                        backupDate: currentDate,
                        jobNotes,
                        customers,
                        inventory
                      };
                      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
                      const downloadAnchor = document.createElement('a');
                      downloadAnchor.setAttribute("href", dataStr);
                      downloadAnchor.setAttribute("download", `LuckyMobile_SystemBackup_${currentDate.replace(/\//g, '-')}.json`);
                      document.body.appendChild(downloadAnchor);
                      downloadAnchor.click();
                      downloadAnchor.remove();
                    }}
                    className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 px-4 rounded-lg text-xs flex justify-center items-center gap-2 shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Full JSON Backup</span>
                  </button>

                  <label className="flex-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold py-2.5 px-4 rounded-lg text-xs flex justify-center items-center gap-2 cursor-pointer shadow-sm">
                    <Upload className="w-4 h-4 text-slate-600" />
                    <span>Restore From Backup File</span>
                    <input 
                      type="file" 
                      accept=".json" 
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            try {
                              const restoredData = JSON.parse(typeof event.target.result === 'string' ? event.target.result : '');
                              if (restoredData.jobNotes) setJobNotes(restoredData.jobNotes);
                              if (restoredData.customers) setCustomers(restoredData.customers);
                              alert('System data successfully restored!');
                            } catch (err) {
                              alert('Invalid backup file format.');
                            }
                          };
                          reader.readAsText(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-3xl mx-auto space-y-6">
              <div>
                <h3 className="font-bold text-base text-slate-800">System Settings & Lock Controls</h3>
                <p className="text-xs text-slate-500">Configure thermal receipt printing formats and security protections.</p>
              </div>

              <div className="space-y-4 border-t pt-4">
                <h4 className="text-xs font-bold uppercase text-slate-400">Thermal Printer Configuration</h4>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 text-xs font-medium cursor-pointer">
                    <input 
                      type="radio" 
                      name="paper" 
                      checked={printerPaperSize === '80mm'}
                      onChange={() => setPrinterPaperSize('80mm')}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Standard Thermal (80mm Paper)</span>
                  </label>
                  <label className="flex items-center space-x-2 text-xs font-medium cursor-pointer">
                    <input 
                      type="radio" 
                      name="paper" 
                      checked={printerPaperSize === '58mm'}
                      onChange={() => setPrinterPaperSize('58mm')}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Mini Thermal Printer (58mm Paper)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* MODALS */}
      {printType === 'thermal' && selectedJob && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <span className="font-bold text-xs flex items-center gap-2">
                <Printer className="w-4 h-4 text-emerald-400" />
                Thermal Slip Receipt Preview ({printerPaperSize})
              </span>
              <button onClick={() => setPrintType(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="p-6 overflow-y-auto bg-amber-50/30 flex justify-center">
              <div className="bg-white p-4 border border-slate-300 shadow-sm font-mono text-[11px] text-slate-900 w-72 space-y-3 select-none">
                <div className="text-center space-y-1 flex flex-col items-center">
                  {shopLogo ? (
                    <img src={shopLogo} alt="Shop Logo" className="w-12 h-12 rounded object-cover mb-1 border border-slate-300" />
                  ) : (
                    <div className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-xs mb-1">LM</div>
                  )}
                  <h2 className="font-bold text-sm tracking-wide">LUCKY MOBILE</h2>
                  <p className="text-[9px] font-semibold leading-tight text-slate-700">ජංගම දුරකථන සහ ලැප්ටොප් අලුත්වැඩියාව අළෙවිය සහ උපාංග</p>
                  <p className="text-[10px]">School Road, Idangoda, Kiriella.</p>
                  <p className="text-[10px]">Reg No: ර/කි/01162</p>
                  <p className="text-[10px] font-bold">Tel: 076 80 63 633 / 071 736 8002</p>
                </div>

                <div className="border-t border-b border-dashed border-slate-400 py-1.5 font-bold flex justify-between">
                  <span>JOB NOTE</span>
                  <span>No: {selectedJob.id}</span>
                </div>

                <div className="space-y-1 text-[10px]">
                  <p><span className="font-bold">Date:</span> {selectedJob.date}</p>
                  <p><span className="font-bold">Customer:</span> {selectedJob.customerName}</p>
                  <p><span className="font-bold">Tel:</span> {selectedJob.telephone}</p>
                  <p><span className="font-bold">Device Type:</span> {selectedJob.deviceType || 'Mobile Phone'}</p>
                  <p><span className="font-bold">Device:</span> {selectedJob.deviceModel}</p>
                  <p><span className="font-bold">IMEI/SN:</span> {selectedJob.imei}</p>
                  <p><span className="font-bold">Fault:</span> {selectedJob.repairFault}</p>
                </div>

                <div className="border-t border-slate-300 pt-1 text-[9px] space-y-0.5">
                  <p className="font-bold">Received with:</p>
                  <div className="grid grid-cols-2 gap-x-2">
                    <span>{selectedJob.receivedWith.battery ? '[✓]' : '[ ]'} Battery</span>
                    <span>{selectedJob.receivedWith.charger ? '[✓]' : '[ ]'} Charger</span>
                    <span>{selectedJob.receivedWith.cover ? '[✓]' : '[ ]'} Cover</span>
                    <span>{selectedJob.receivedWith.backPanel ? '[✓]' : '[ ]'} Back Panel</span>
                    <span>{selectedJob.receivedWith.simCard ? '[✓]' : '[ ]'} Sim Card</span>
                    <span>{selectedJob.receivedWith.bag ? '[✓]' : '[ ]'} Bag</span>
                  </div>
                </div>

                <div className="border-t border-dashed border-slate-400 pt-2 space-y-1 font-bold">
                  <div className="flex justify-between">
                    <span>Estimated Cost:</span>
                    <span>Rs. {selectedJob.estimatedCost}.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Advance Paid:</span>
                    <span>Rs. {selectedJob.advancePaid}.00</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-1 text-xs">
                    <span>Balance Due:</span>
                    <span>Rs. {selectedJob.estimatedCost - selectedJob.advancePaid}.00</span>
                  </div>
                </div>

                <div className="border-t border-slate-300 pt-2 text-[8px] leading-tight space-y-1 text-slate-700 font-medium">
                  <ul className="list-disc pl-3 space-y-0.5">
                    <li>උපකරණ නැවත ලබාගැනීම සඳහා මෙම රිසිට්පත ඉදිරිපත් කිරීම අනිවාර්වේ.</li>
                    <li>අලුත්වැඩියාවෙන් පසුව දින 30ක් ඇතුලත රැගෙන නොයන උපකරණ සඳහා වගකියනු නොලැබේ. (ප්‍රමාද ගාස්තු අයකෙරේ)</li>
                    <li>දින 90ක් ඉක්මවන විටත් රැගෙන නොගිය උපකරණ, අයිතිය අත්හැරගිය උපකරණ සේ සලකනු ලැබේ.</li>
                  </ul>
                  <p className="pt-1 font-bold text-slate-900">ඉහත කොන්දේසි වලට එකඟවෙමි.</p>
                </div>

                <div className="text-center pt-2 border-t border-dashed border-slate-400 text-[9px]">
                  Thank You! Come Again.
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-100 border-t flex gap-2">
              <button
                onClick={() => { alert('Thermal print job sent to USB Printer!'); setPrintType(null); }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded text-xs flex justify-center items-center gap-1"
              >
                <Printer className="w-4 h-4" />
                Print Thermal Slip
              </button>
              <a
                href={`https://wa.me/94${selectedJob.telephone.replace(/^0/, '')}?text=${encodeURIComponent(`*LUCKY MOBILE JOB NOTE*\nJob No: #${selectedJob.id}\nDevice: ${selectedJob.deviceModel}\nStatus: ${selectedJob.status}\nBalance Due: Rs.${selectedJob.estimatedCost - selectedJob.advancePaid}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-3 py-2 rounded text-xs flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={() => setPrintType(null)}
                className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold px-4 py-2 rounded text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {printType === 'normal' && selectedJob && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <span className="font-bold text-xs flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                Standard Job Note Receipt (A4 Sheet View)
              </span>
              <button onClick={() => setPrintType(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="p-8 overflow-y-auto bg-slate-200 flex justify-center">
              <div className="bg-white p-6 border border-slate-400 shadow-md text-xs text-slate-900 w-full space-y-4">
                <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
                  <div className="flex items-center space-x-3">
                    {shopLogo ? (
                      <img src={shopLogo} alt="Logo" className="w-14 h-14 object-cover rounded border border-slate-200 p-1" />
                    ) : (
                      <div className="w-14 h-14 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-base">LM</div>
                    )}
                    <div>
                      <h2 className="font-bold text-xl text-slate-900">LUCKY MOBILE</h2>
                      <p className="font-semibold text-xs text-slate-700">ජංගම දුරකථන සහ ලැප්ටොප් අලුත්වැඩියාව අළෙවිය සහ උපාංග</p>
                      <p className="text-[11px] text-slate-600 mt-0.5">School Road, Idangoda, Kiriella.</p>
                      <p className="text-[11px] text-slate-600">Reg No: ර/කි/01162 | Tel: 076 80 63 633 / 071 736 8002</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-block border-2 border-slate-900 px-3 py-1 font-bold text-base bg-slate-100">
                      JOB NOTE No: {selectedJob.id}
                    </div>
                    <p className="text-xs font-semibold mt-2">Date: {selectedJob.date}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                  <div><span className="font-bold text-slate-700">Customer Name:</span> {selectedJob.customerName}</div>
                  <div><span className="font-bold text-slate-700">Telephone:</span> {selectedJob.telephone}</div>
                  <div><span className="font-bold text-slate-700">ID Number:</span> {selectedJob.idNumber}</div>
                  <div><span className="font-bold text-slate-700">Device Type:</span> {selectedJob.deviceType || 'Mobile Phone'}</div>
                  <div><span className="font-bold text-slate-700">Device Model:</span> {selectedJob.deviceModel}</div>
                  <div><span className="font-bold text-slate-700">IMEI / SN:</span> {selectedJob.imei}</div>
                  <div className="col-span-2"><span className="font-bold text-slate-700">Repair Fault:</span> {selectedJob.repairFault}</div>
                </div>

                <div className="border border-slate-300 rounded p-3 bg-slate-50">
                  <span className="font-bold block mb-2 text-slate-800">Received With Checklist:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(selectedJob.receivedWith).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-1.5">
                        <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center font-bold text-[10px] ${value ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-400 bg-white'}`}>
                          {value ? '✓' : ''}
                        </span>
                        <span className="capitalize">{key}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 border-t border-b py-3 font-bold text-slate-800">
                  <div>Estimated Cost: <span className="text-base font-extrabold text-slate-900">Rs. {selectedJob.estimatedCost}</span></div>
                  <div>Advance Paid: <span className="text-base font-extrabold text-emerald-700">Rs. {selectedJob.advancePaid}</span></div>
                  <div>Balance Due: <span className="text-base font-extrabold text-rose-700">Rs. {selectedJob.estimatedCost - selectedJob.advancePaid}</span></div>
                </div>

                <div className="text-[10px] text-slate-600 leading-relaxed border-t pt-2 space-y-1 font-medium">
                  <ul className="list-disc pl-4 space-y-1">
                    <li>උපකරණ නැවත ලබාගැනීම සඳහා මෙම රිසිට්පත ඉදිරිපත් කිරීම අනිවාර්වේ.</li>
                    <li>අලුත්වැඩියාවෙන් පසුව දින 30ක් ඇතුලත රැගෙන නොයන උපකරණ සඳහා වගකියනු නොලැබේ. (ප්‍රමාද ගාස්තු අයකෙරේ)</li>
                    <li>දින 90ක් ඉක්මවන විටත් රැගෙන නොගිය උපකරණ, අයිතිය අත්හැරගිය උපකරණ සේ සලකනු ලැබේ.</li>
                  </ul>
                  <p className="pt-2 font-bold text-slate-900">ඉහත කොන්දේසි වලට එකඟවෙමි.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-100 border-t flex gap-2">
              <button
                onClick={() => { window.print(); setPrintType(null); }}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded text-xs flex justify-center items-center gap-1"
              >
                <Printer className="w-4 h-4" />
                Print Standard Document
              </button>
              <button
                onClick={() => setPrintType(null)}
                className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold px-4 py-2 rounded text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isCameraOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden flex flex-col border border-slate-700">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <span className="font-bold text-sm flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-400" />
                Capture Device Photo
              </span>
              <button onClick={stopCamera} className="text-slate-400 hover:text-white">✕</button>
            </div>
            
            <div className="bg-black relative flex justify-center items-center h-80 w-full overflow-hidden">
              <video ref={videoRef} autoPlay playsInline className="max-h-full max-w-full object-contain"></video>
              <canvas ref={canvasRef} className="hidden"></canvas>
            </div>
            
            <div className="p-4 bg-slate-100 flex gap-2">
              <button
                type="button"
                onClick={capturePhoto}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg text-sm flex justify-center items-center gap-2 shadow-md"
              >
                <Camera className="w-5 h-5" />
                Capture Photo
              </button>
              <button
                type="button"
                onClick={stopCamera}
                className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold px-6 py-3 rounded-lg text-sm shadow-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isImeiScannerOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden flex flex-col border border-slate-700">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <span className="font-bold text-sm flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-400" />
                Scan IMEI / Serial Barcode
              </span>
              <button onClick={stopImeiScanner} className="text-slate-400 hover:text-white">✕</button>
            </div>
            
            <div className="bg-black relative flex justify-center items-center h-80 w-full overflow-hidden">
              <video ref={imeiVideoRef} autoPlay playsInline className="max-h-full max-w-full object-contain"></video>
              <div className="absolute border-2 border-emerald-400 bg-emerald-500/10 rounded-lg w-64 h-24 flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.5)]">
                <div className="w-full h-0.5 bg-emerald-400 animate-pulse"></div>
              </div>
              <span className="absolute bottom-3 text-white text-[11px] bg-black/60 px-3 py-1 rounded-full font-medium">
                Align IMEI Barcode inside the box
              </span>
            </div>
            
            <div className="p-4 bg-slate-100 flex gap-2">
              <button
                type="button"
                onClick={captureImeiFromCamera}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg text-sm flex justify-center items-center gap-2 shadow-md"
              >
                <Camera className="w-5 h-5" />
                Capture & Extract IMEI
              </button>
              <button
                type="button"
                onClick={stopImeiScanner}
                className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold px-6 py-3 rounded-lg text-sm shadow-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddCustomerModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-emerald-600" />
                Add New Customer Profile
              </h3>
              <button onClick={() => setShowAddCustomerModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Customer Name *</label>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={newCustomerForm.name} 
                  onChange={(e) => setNewCustomerForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Telephone *</label>
                <input 
                  type="text" 
                  maxLength={10}
                  placeholder="e.g. 0771234567" 
                  value={newCustomerForm.telephone} 
                  onChange={(e) => setNewCustomerForm(prev => ({ ...prev, telephone: e.target.value.replace(/\D/g, '') }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">ID Number (NIC)</label>
                <input 
                  type="text" 
                  maxLength={12}
                  placeholder="NIC Number" 
                  value={newCustomerForm.idNumber} 
                  onChange={(e) => setNewCustomerForm(prev => ({ ...prev, idNumber: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="customer@email.com" 
                  value={newCustomerForm.email} 
                  onChange={(e) => setNewCustomerForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Address</label>
                <input 
                  type="text" 
                  placeholder="Address details" 
                  value={newCustomerForm.address} 
                  onChange={(e) => setNewCustomerForm(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t">
              <button
                onClick={() => {
                  if (!newCustomerForm.name || !newCustomerForm.telephone) return alert('Name and Telephone are required.');
                  const newCust = {
                    id: `CUST-${1001 + customers.length}`,
                    name: newCustomerForm.name,
                    telephone: newCustomerForm.telephone,
                    idNumber: newCustomerForm.idNumber,
                    email: newCustomerForm.email,
                    address: newCustomerForm.address,
                    rating: 5,
                    feedbackHistory: []
                  };
                  setCustomers([newCust, ...customers]);
                  setShowAddCustomerModal(false);
                  setNewCustomerForm({ name: '', telephone: '', idNumber: '', email: '', address: '', notes: '' });
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg text-xs"
              >
                Save Customer
              </button>
              <button
                onClick={() => setShowAddCustomerModal(false)}
                className="bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-lg text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedCustomerForFeedback && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-600" />
                Add Owner Feedback - {selectedCustomerForFeedback.name}
              </h3>
              <button onClick={() => setSelectedCustomerForFeedback(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Customer Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewCustomerRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${star <= newCustomerRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                  <span className="font-bold text-slate-700 ml-2">{newCustomerRating}.0 / 5.0</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Owner Remarks / Internal Note *</label>
                <textarea 
                  rows={3}
                  placeholder="e.g. Always pays prompt cash. Preferred high quality displays."
                  value={newFeedbackText}
                  onChange={(e) => setNewFeedbackText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t">
              <button
                onClick={() => {
                  if (!newFeedbackText.trim()) return alert('Please enter feedback remarks.');
                  setCustomers(prev => prev.map(c => {
                    if (c.id === selectedCustomerForFeedback.id) {
                      return {
                        ...c,
                        rating: newCustomerRating,
                        feedbackHistory: [
                          { date: currentDate, text: newFeedbackText, rating: newCustomerRating },
                          ...(c.feedbackHistory || [])
                        ]
                      };
                    }
                    return c;
                  }));
                  setSelectedCustomerForFeedback(null);
                  setNewFeedbackText('');
                }}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 rounded-lg text-xs"
              >
                Save Feedback
              </button>
              <button
                onClick={() => setSelectedCustomerForFeedback(null)}
                className="bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-lg text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {editingCustomer && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <Edit className="w-4 h-4 text-emerald-600" />
                Edit Customer Details
              </h3>
              <button onClick={() => setEditingCustomer(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Customer Name *</label>
                <input 
                  type="text" 
                  value={editingCustomer.name} 
                  onChange={(e) => setEditingCustomer(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Telephone *</label>
                <input 
                  type="text" 
                  maxLength={10}
                  value={editingCustomer.telephone} 
                  onChange={(e) => setEditingCustomer(prev => ({ ...prev, telephone: e.target.value.replace(/\D/g, '') }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">ID Number (NIC)</label>
                <input 
                  type="text" 
                  maxLength={12}
                  value={editingCustomer.idNumber || ''} 
                  onChange={(e) => setEditingCustomer(prev => ({ ...prev, idNumber: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={editingCustomer.email || ''} 
                  onChange={(e) => setEditingCustomer(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Address</label>
                <input 
                  type="text" 
                  value={editingCustomer.address || ''} 
                  onChange={(e) => setEditingCustomer(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t">
              <button
                onClick={() => {
                  if (!editingCustomer.name || !editingCustomer.telephone) return alert('Name and Telephone are required.');
                  setCustomers(prev => prev.map(c => c.id === editingCustomer.id ? editingCustomer : c));
                  setEditingCustomer(null);
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg text-xs"
              >
                Update Customer
              </button>
              <button
                onClick={() => setEditingCustomer(null)}
                className="bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-lg text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {deletingCustomer && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 space-y-4">
            <div className="flex items-center space-x-3 text-rose-600">
              <Trash2 className="w-6 h-6" />
              <h3 className="font-bold text-base text-slate-800">Delete Customer</h3>
            </div>
            <p className="text-xs text-slate-600">
              Are you sure you want to delete customer record <span className="font-bold text-slate-900">{deletingCustomer.name}</span> ({deletingCustomer.telephone})?
            </p>

            <div className="flex gap-2 pt-2 border-t">
              <button
                onClick={() => {
                  setCustomers(prev => prev.filter(c => c.id !== deletingCustomer.id));
                  setDeletingCustomer(null);
                }}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 rounded-lg text-xs"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeletingCustomer(null)}
                className="bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-lg text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}