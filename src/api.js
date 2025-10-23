import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Update if deployed elsewhere
});

// Attach token automatically if present in localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Add a new transaction
export const addTransaction = (transactionData) => 
  API.post('/transactions/add', transactionData);

// Get all transactions
export const getAllTransactions = async () => {
  const res = await API.get('/transactions');
  return res.data; // ✅ Ensure you're returning the actual array
};

// Filter by type (income/expense)
export const getTransactionsByType = (type) => 
  API.get(`/transactions?type=${type}`);

// Filter by category
export const getTransactionsByCategory = (category) => 
  API.get(`/transactions?category=${category}`);

// Delete a transaction by ID
export const deleteTransaction = (id) => 
  API.delete(`/transactions/${id}`);

// Auth
export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);

// Download Excel report (returns blob)
export const downloadExcelReport = () =>
  API.get('/transactions/download/excel', { responseType: 'blob' });

// Get summary data for charts (assuming you implement this in backend)
export const getTransactionSummary = () =>
  API.get('/transactions/summary');
