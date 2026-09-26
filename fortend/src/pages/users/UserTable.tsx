// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast from "react-hot-toast";
// const API_URL = import.meta.env.VITE_API_URL;

// // UserForm Component Definition
// interface UserFormProps {
//   user?: {
//     _id: string;
//     name: string;
//     email: string;
//     phoneNumber: string;
//     role: 'admin' | 'deliveryboy' | 'sellman';
//     isActive: boolean;
//   } | null;
//   onClose: () => void;
//   onSuccess: () => void;
//   onError: (message: string) => void;
// }

// const UserForm: React.FC<UserFormProps> = ({ user, onClose, onSuccess, onError }) => {



//   const [formData, setFormData] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//     phoneNumber: user?.phoneNumber || '',
//     role: user?.role || 'deliveryboy',
//     password: '',
//     confirmPassword: '',
//     isActive: user?.isActive ?? true,
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     // Name validation
//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//     } else if (formData.name.length < 2) {
//       newErrors.name = 'Name must be at least 2 characters';
//     } else if (formData.name.length > 50) {
//       newErrors.name = 'Name cannot exceed 50 characters';
//     }

//     // Email validation
//     const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email';
//     }

//     // Phone validation (optional)
//     if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
//       newErrors.phoneNumber = 'Phone number must be 10 digits';
//     }

//     // Password validation (only for new user)
//     if (!user) {
//       if (!formData.password) {
//         newErrors.password = 'Password is required';
//       } else if (formData.password.length < 6) {
//         newErrors.password = 'Password must be at least 6 characters';
//       }

//       if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = 'Passwords do not match';
//       }
//     } else if (formData.password && formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//         // Dismiss any existing toasts before showing new ones
//     toast.dismiss();
    
//     if (!validateForm()) return;

//     setLoading(true);
//     try {
//       if (user) {
//         // Update existing user
//         const updateData: any = {
//           name: formData.name,
//           email: formData.email,
//           phoneNumber: formData.phoneNumber,
//           role: formData.role,
//           isActive: formData.isActive,
//         };
//         if (formData.password) {
//           updateData.password = formData.password;
//         }


//         if(formData.password!==formData.confirmPassword){
//             toast.error("password is not match");
//             return
//         }
       

//          const createRes = await axios.put(
//         `${API_URL}/users/update/${user._id}`,
//         updateData,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//           },
//         }
//       );

//       if(createRes.data.success==true){

        
//         toast.success(createRes.data.message||"Successfully Updated users Data");
//         location.reload()
//       }else if(createRes.data.success==false&&createRes.data.message==='Unauthorized'){
           
//           toast.error("login again");
//       }else{
//          toast.error(createRes?.data?.message||createRes?.data?.errors || 'Failed to save user');
        
//       }

//       } else {
//         // Create new user
//          const createRes = await axios.post(
//         `${API_URL}/users/signup`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//           },
//         }
//       );

//       if(createRes.data.success==true){

//         toast.success(createRes.data.message||"Successfully Create users Data");

//        location.reload()
//       }else if(createRes.data.success==false&&createRes.data.message==='Unauthorized'){
//            toast.error("login again");
//       }else{
//         toast.error(createRes?.data?.message||createRes?.data?.errors || 'Failed to save user');
//       }
      
      
       
//       }
     
//     } catch (err: any) {
//       onError(err.response?.data?.message || 'Failed to save user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
//     }));
//     // Clear error for this field
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6">
//           {/* Header */}
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               {user ? 'Edit User' : 'Create New User'}
//             </h2>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               ✕
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Name Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Full Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter full name"
//                 className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                   errors.name ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//               {errors.name && (
//                 <p className="mt-1 text-xs text-red-500">{errors.name}</p>
//               )}
//             </div>

//             {/* Email Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter email address"
//                 className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                   errors.email ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//               {errors.email && (
//                 <p className="mt-1 text-xs text-red-500">{errors.email}</p>
//               )}
//             </div>

//             {/* Phone Number Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 placeholder="Enter 10-digit phone number"
//                 maxLength={10}
//                 className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                   errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//               {errors.phoneNumber && (
//                 <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>
//               )}
//             </div>

//             {/* Role Selection */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Role <span className="text-red-500">*</span>
//               </label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//               >
//                 <option value="deliveryboy">Delivery Boy</option>
//                 <option value="sellman">Sellman</option>
//                 <option value="admin">Admin</option>
//               </select>
//             </div>

//             {/* Password Fields */}
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   {user ? 'New Password (leave blank to keep current)' : 'Password'} 
//                   {!user && <span className="text-red-500">*</span>}
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder={user ? 'Enter new password' : 'Enter password'}
//                     className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.password ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
//                   >
//                     {showPassword ? '👁️' : '👁️‍🗨️'}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="mt-1 text-xs text-red-500">{errors.password}</p>
//                 )}
//               </div>

//               {(!user || formData.password) && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Confirm Password
//                   </label>
//                   <input
//                     type="password"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     placeholder="Confirm password"
//                     className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                   />
//                   {errors.confirmPassword && (
//                     <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Status Toggle (only for edit) */}
//             {user && (
//               <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="isActive"
//                     checked={formData.isActive}
//                     onChange={handleChange}
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                 </label>
//                 <span className="text-sm font-medium text-gray-700">
//                   {formData.isActive ? 'Active' : 'Inactive'}
//                 </span>
//               </div>
//             )}

//             {/* Form Actions */}
//             <div className="flex gap-3 pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all hover:-translate-y-0.5 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 font-medium"
//               >
//                 {loading ? 'Saving...' : user ? 'Update User' : 'Create User'}
//               </button>
//               <button
//                 type="button"
//                 onClick={onClose}
//                 disabled={loading}
//                 className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 font-medium"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// // UserTable Interface
// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   phoneNumber: string;
//   role: 'admin' | 'deliveryboy' | 'sellman';
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// // UserTable Component
// const UserTable: React.FC = () => {



//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  
//   // Search and Filter states
//   const [searchTerm, setSearchTerm] = useState('');
//   const [roleFilter, setRoleFilter] = useState<string>('all');
//   const [statusFilter, setStatusFilter] = useState<string>('all');
  
//   // Pagination states
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [rowsPerPageOptions] = useState([5, 10, 25, 50, 100]);
  
//   // Modal states
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [formOpen, setFormOpen] = useState(false);
  
//   // Notification
//   const [notification, setNotification] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
//     show: false,
//     message: '',
//     type: 'success'
//   });

//   // Fetch users
//   const fetchUsers = async () => {
//     try {

//       setLoading(true);

//        // Create new user
//          const createRes = await axios.get(
//         `${API_URL}/users/getall`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//           },
//         }
//       );

//       if(createRes.data.success==true){

//       setUsers(createRes.data.data);
//       setError(null);
//        toast.success(createRes.data?.message||"successfully");

//       }else if(createRes.data.success==false&&createRes.data.message==='Unauthorized'){
//             toast.error(createRes.data?.message || "something is wronge"); 
//       }else{
//             toast.error(createRes.data?.message || "something is wronge");
//       }

      
//     } catch (err) {
//       setError('Failed to fetch users');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Filter users based on search and filters
//   const filteredUsers = users?.filter(user => {
//     const matchesSearch = 
//       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (user.phoneNumber && user.phoneNumber.includes(searchTerm));
    
//     const matchesRole = roleFilter === 'all' ? true : user.role === roleFilter;
//     const matchesStatus = statusFilter === 'all' ? true : 
//       statusFilter === 'active' ? user.isActive : !user.isActive;
    
//     return matchesSearch && matchesRole && matchesStatus;
//   });

//   // Pagination
//   const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
//   const paginatedUsers = filteredUsers.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   // Statistics
//   const stats = {
//     total: users.length,
//     admin: users.filter(u => u.role === 'admin').length,
//     deliveryboy: users.filter(u => u.role === 'deliveryboy').length,
//     sellman: users.filter(u => u.role === 'sellman').length,
//     active: users.filter(u => u.isActive).length,
//     inactive: users.filter(u => !u.isActive).length,
//   };

//   // Handlers
//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setRowsPerPage(Number(event.target.value));
//     setPage(1);
//   };

//   const handleDelete = async (id: string) => {
//     try {

//         const createRes = await axios.delete(
//         `${API_URL}/users/delete/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//           },
//         }
//       );

//       if(createRes.data.success==true){

//       setUsers(users.filter(user => user._id !== id));
//       showNotification('User deleted successfully', 'success');
      
//       // Adjust page if current page becomes empty
//       const totalPages = Math.ceil((filteredUsers.length - 1) / rowsPerPage);
//       if (page > totalPages && page > 1) {
//         setPage(totalPages);
//       }

//       }else if(createRes.data.success==false&&createRes.data.message==='Unauthorized'){
//             toast.error(createRes.data?.message || "something is wronge");
//       }else{
//         toast.error(createRes.data?.message || "something is wronge");
//       }

     

//     } catch (err) {
//       showNotification('Failed to delete user', 'error');
//     }
//     setDeleteDialogOpen(false);
//   };

//   const handleDeleteAll = async () => {
//     try {

//        const createRes = await axios.delete(
//         `${API_URL}/users/deleteall`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//           },
//         }
//       );

//       if(createRes.data.success==true){

//       setUsers([]);
//       showNotification('All users deleted successfully', 'success');
//       setPage(1);
      
      

//       }else if(createRes.data.success==false&&createRes.data.message==='Unauthorized'){
           
//       }else{
       
//       }

     
      
//     } catch (err) {
//       showNotification('Failed to delete all users', 'error');
//     }
//     setDeleteAllDialogOpen(false);
//   };

//   const handleStatusToggle = async (user: User) => {
//     try {
//       const response = await axios.patch(`/api/users/${user._id}`, {
//         isActive: !user.isActive
//       });
//       setUsers(users.map(u => u._id === user._id ? response.data : u));
//       showNotification(`User ${user.isActive ? 'deactivated' : 'activated'} successfully`, 'success');
//     } catch (err) {
//       showNotification('Failed to update user status', 'error');
//     }
//   };

//   const showNotification = (message: string, type: 'success' | 'error') => {
//     setNotification({ show: true, message, type });
//     setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 3000);
//   };

//   const getRoleBadgeColor = (role: string) => {
//     switch(role) {
//       case 'admin': return 'bg-purple-100 text-purple-700 border-purple-200';
//       case 'deliveryboy': return 'bg-green-100 text-green-700 border-green-200';
//       case 'sellman': return 'bg-blue-100 text-blue-700 border-blue-200';
//       default: return 'bg-gray-100 text-gray-700 border-gray-200';
//     }
//   };

//   const getRoleIcon = (role: string) => {
//     switch(role) {
//       case 'admin': return '👑';
//       case 'deliveryboy': return '🚚';
//       case 'sellman': return '💰';
//       default: return '👤';
//     }
//   };

//   if (loading && users.length === 0) {
//     return (
//       <div className="p-4 md:p-6 max-w-7xl mx-auto">
//         <div className="h-16 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
//         <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
//           {[1,2,3,4,5,6].map(i => (
//             <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse"></div>
//           ))}
//         </div>
//         <div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 md:p-6 max-w-7xl mx-auto">
//       {/* Notification */}
//       {notification.show && (
//         <div className={`fixed top-4 right-4 z-50 animate-slide-in ${
//           notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
//         } border rounded-xl px-4 py-3 shadow-lg flex items-center gap-2`}>
//           <span>{notification.type === 'success' ? '✅' : '❌'}</span>
//           <span className="text-sm font-medium">{notification.message}</span>
//           <button onClick={() => setNotification(prev => ({ ...prev, show: false }))} className="ml-4 text-gray-400 hover:text-gray-600">✕</button>
//         </div>
//       )}

//       {/* Header Section */}
//       <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
//         <div>
//           <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
//             User Management
//           </h1>
//           <p className="text-sm md:text-base text-gray-600">
//             Manage users, roles, and permissions
//           </p>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-2">
//           <button
//             onClick={() => {
//               setSelectedUser(null);
//               setFormOpen(true);
//             }}
//             className="px-4 md:px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm font-medium shadow-md"
//           >
//             <span>➕</span> Add User
//           </button>

//           <button
//             onClick={fetchUsers}
//             className="px-4 md:px-6 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm font-medium"
//           >
//             <span>🔄</span> Refresh
//           </button>

//           <button
//             onClick={() => setDeleteAllDialogOpen(true)}
//             disabled={users.length === 0}
//             className="px-4 md:px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all hover:-translate-y-0.5 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 text-sm font-medium"
//           >
//             <span>🗑️</span> Delete All
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
//         <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 text-white">
//           <p className="text-xs opacity-90">Total Users</p>
//           <p className="text-xl font-bold">{stats.total}</p>
//         </div>
//         <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-3 text-white">
//           <p className="text-xs opacity-90">Admin</p>
//           <p className="text-xl font-bold">{stats.admin}</p>
//         </div>
//         <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-3 text-white">
//           <p className="text-xs opacity-90">Delivery Boys</p>
//           <p className="text-xl font-bold">{stats.deliveryboy}</p>
//         </div>
//         <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-3 text-white">
//           <p className="text-xs opacity-90">Sellmen</p>
//           <p className="text-xl font-bold">{stats.sellman}</p>
//         </div>
//         <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-3 text-white">
//           <p className="text-xs opacity-90">Active</p>
//           <p className="text-xl font-bold">{stats.active}</p>
//         </div>
//         <div className="bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl p-3 text-white">
//           <p className="text-xs opacity-90">Inactive</p>
//           <p className="text-xl font-bold">{stats.inactive}</p>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="mb-4 flex flex-col lg:flex-row gap-3">
//         <div className="flex-1 relative">
//           <input
//             type="text"
//             placeholder="Search by name, email, or phone..."
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setPage(1);
//             }}
//             className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
//         </div>
        
//         <div className="flex gap-2">
//           <select
//             value={roleFilter}
//             onChange={(e) => {
//               setRoleFilter(e.target.value);
//               setPage(1);
//             }}
//             className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//           >
//             <option value="all">All Roles</option>
//             <option value="admin">Admin</option>
//             <option value="deliveryboy">Delivery Boy</option>
//             <option value="sellman">Sellman</option>
//           </select>

//           <select
//             value={statusFilter}
//             onChange={(e) => {
//               setStatusFilter(e.target.value);
//               setPage(1);
//             }}
//             className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//           >
//             <option value="all">All Status</option>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </div>
//       </div>

//       {/* Rows Per Page Selector */}
//       {filteredUsers.length > 0 && (
//         <div className="mb-4 flex justify-end">
//           <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200">
//             <span className="text-sm text-gray-600">Show:</span>
//             <select
//               value={rowsPerPage}
//               onChange={handleRowsPerPageChange}
//               className="border-none focus:outline-none text-sm font-medium text-gray-700 bg-transparent"
//             >
//               {rowsPerPageOptions.map(option => (
//                 <option key={option} value={option}>{option}</option>
//               ))}
//             </select>
//             <span className="text-sm text-gray-600">entries</span>
//           </div>
//         </div>
//       )}

//       {/* Error Message */}
//       {error && (
//         <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
//           {error}
//         </div>
//       )}

//       {/* Desktop Table View */}
//       <div className="hidden lg:block bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
//                 <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
//                 <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
//                 <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
//                 <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Joined</th>
//                 <th className="px-4 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {paginatedUsers.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="px-4 py-12 text-center">
//                     <p className="text-gray-500">No users found</p>
//                   </td>
//                 </tr>
//               ) : (
//                 paginatedUsers.map((user) => (
//                   <tr key={user._id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-4 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
//                           {user.name.charAt(0).toUpperCase()}
//                         </div>
//                         <div>
//                           <p className="font-medium">{user.name}</p>
//                           <p className="text-xs text-gray-500">ID: {user._id.slice(-6)}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-4">
//                       <p className="text-sm">{user.email}</p>
//                       <p className="text-xs text-gray-500">{user.phoneNumber || 'No phone'}</p>
//                     </td>
//                     <td className="px-4 py-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
//                         {getRoleIcon(user.role)} {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
//                       </span>
//                     </td>
//                     <td className="px-4 py-4">
//                       <button
//                         onClick={() => handleStatusToggle(user)}
//                         className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
//                           user.isActive 
//                             ? 'bg-green-100 text-green-700 hover:bg-green-200' 
//                             : 'bg-red-100 text-red-700 hover:bg-red-200'
//                         }`}
//                       >
//                         {user.isActive ? 'Active' : 'Inactive'}
//                       </button>
//                     </td>
//                     <td className="px-4 py-4">
//                       <p className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</p>
//                       <p className="text-xs text-gray-500">{new Date(user.createdAt).toLocaleTimeString()}</p>
//                     </td>
//                     <td className="px-4 py-4">
//                       <div className="flex items-center justify-center gap-2">
//                         <button
//                           onClick={() => {
//                             setSelectedUser(user);
//                             setFormOpen(true);
//                           }}
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                           title="Edit"
//                         >
//                           ✏️
//                         </button>
//                         <button
//                           onClick={() => {
//                             setSelectedUser(user);
//                             setDeleteDialogOpen(true);
//                           }}
//                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                           title="Delete"
//                         >
//                           🗑️
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Mobile/Tablet Card View */}
//       <div className="lg:hidden space-y-3">
//         {paginatedUsers.length === 0 ? (
//           <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
//             <p className="text-gray-500">No users found</p>
//           </div>
//         ) : (
//           paginatedUsers.map((user) => (
//             <div key={user._id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
//               <div className="flex items-start justify-between mb-3">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
//                     {user.name.charAt(0).toUpperCase()}
//                   </div>
//                   <div>
//                     <p className="font-semibold">{user.name}</p>
//                     <p className="text-xs text-gray-500">ID: {user._id.slice(-6)}</p>
//                   </div>
//                 </div>
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
//                   {getRoleIcon(user.role)}
//                 </span>
//               </div>

//               <div className="grid grid-cols-2 gap-2 mb-3 p-3 bg-gray-50 rounded-lg">
//                 <div>
//                   <p className="text-xs text-gray-500">Email</p>
//                   <p className="text-sm truncate">{user.email}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Phone</p>
//                   <p className="text-sm">{user.phoneNumber || 'N/A'}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Status</p>
//                   <button
//                     onClick={() => handleStatusToggle(user)}
//                     className={`mt-1 px-3 py-1 rounded-full text-xs font-medium ${
//                       user.isActive 
//                         ? 'bg-green-100 text-green-700' 
//                         : 'bg-red-100 text-red-700'
//                     }`}
//                   >
//                     {user.isActive ? 'Active' : 'Inactive'}
//                   </button>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Joined</p>
//                   <p className="text-xs">{new Date(user.createdAt).toLocaleDateString()}</p>
//                 </div>
//               </div>

//               <div className="flex gap-2 pt-3 border-t border-gray-200">
//                 <button
//                   onClick={() => {
//                     setSelectedUser(user);
//                     setFormOpen(true);
//                   }}
//                   className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
//                 >
//                   <span>✏️</span> Edit
//                 </button>
//                 <button
//                   onClick={() => {
//                     setSelectedUser(user);
//                     setDeleteDialogOpen(true);
//                   }}
//                   className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 transition-colors flex items-center justify-center gap-1"
//                 >
//                   <span>🗑️</span> Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Pagination Controls */}
//       {filteredUsers.length > 0 && (
//         <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div className="text-sm text-gray-500">
//             Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredUsers.length)} of {filteredUsers.length} entries
//           </div>
          
//           <div className="flex items-center gap-2 flex-wrap justify-center">
//             <button
//               onClick={() => handlePageChange(1)}
//               disabled={page === 1}
//               className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               ⏮️ First
//             </button>
//             <button
//               onClick={() => handlePageChange(page - 1)}
//               disabled={page === 1}
//               className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               ◀️ Prev
//             </button>
            
//             <div className="flex items-center gap-1">
//               {[...Array(Math.min(5, totalPages))].map((_, idx) => {
//                 let pageNum;
//                 if (totalPages <= 5) {
//                   pageNum = idx + 1;
//                 } else if (page <= 3) {
//                   pageNum = idx + 1;
//                 } else if (page >= totalPages - 2) {
//                   pageNum = totalPages - 4 + idx;
//                 } else {
//                   pageNum = page - 2 + idx;
//                 }
                
//                 return (
//                   <button
//                     key={idx}
//                     onClick={() => handlePageChange(pageNum)}
//                     className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
//                       page === pageNum
//                         ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
//                         : 'border border-gray-200 bg-white hover:bg-gray-50'
//                     }`}
//                   >
//                     {pageNum}
//                   </button>
//                 );
//               })}
//             </div>
            
//             <button
//               onClick={() => handlePageChange(page + 1)}
//               disabled={page === totalPages}
//               className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Next ▶️
//             </button>
//             <button
//               onClick={() => handlePageChange(totalPages)}
//               disabled={page === totalPages}
//               className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Last ⏭️
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {deleteDialogOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl max-w-md w-full p-6">
//             <h2 className="text-xl font-bold text-red-600 mb-4">Confirm Delete</h2>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
//             </p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setDeleteDialogOpen(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => selectedUser && handleDelete(selectedUser._id)}
//                 className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm hover:from-red-600 hover:to-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete All Confirmation Modal */}
//       {deleteAllDialogOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl max-w-md w-full p-6">
//             <h2 className="text-xl font-bold text-red-600 mb-4">Delete All Users</h2>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to delete ALL users? This action cannot be undone.
//             </p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setDeleteAllDialogOpen(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDeleteAll}
//                 className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm hover:from-red-600 hover:to-red-700"
//               >
//                 Delete All
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* User Form Modal */}
//       {formOpen && (
//         <UserForm
//           user={selectedUser}
//           onClose={() => {
//             setFormOpen(false);
//             setSelectedUser(null);
//           }}
//           onSuccess={() => {
//             fetchUsers();
//             setFormOpen(false);
//             setSelectedUser(null);
//             showNotification(
//               selectedUser ? 'User updated successfully' : 'User created successfully',
//               'success'
//             );
//           }}
//           onError={(message: string) => showNotification(message, 'error')}
//         />
//       )}
//     </div>
//   );
// };

// export default UserTable;













// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast from "react-hot-toast";

// const API_URL = import.meta.env.VITE_API_URL;

// // UserForm Component Definition
// interface UserFormProps {
//   user?: {
//     _id: string;
//     name: string;
//     email: string;
//     phoneNumber: string;
//     role: 'admin' | 'deliveryboy' | 'sellman';
//     isActive: boolean;
//   } | null;
//   onClose: () => void;
//   onSuccess: () => void;
//   onError: (message: string) => void;
// }

// const UserForm: React.FC<UserFormProps> = ({ user, onClose, onSuccess, onError }) => {

//   console.log(onSuccess);
  

//   const [formData, setFormData] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//     phoneNumber: user?.phoneNumber || '',
//     role: user?.role || 'deliveryboy',
//     password: '',
//     confirmPassword: '',
//     isActive: user?.isActive ?? true,
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     // Name validation
//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//     } else if (formData.name.length < 2) {
//       newErrors.name = 'Name must be at least 2 characters';
//     } else if (formData.name.length > 50) {
//       newErrors.name = 'Name cannot exceed 50 characters';
//     }

//     // Email validation
//     const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email';
//     }

//     // Phone validation (optional)
//     if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
//       newErrors.phoneNumber = 'Phone number must be 10 digits';
//     }

//     // Password validation (only for new user)
//     if (!user) {
//       if (!formData.password) {
//         newErrors.password = 'Password is required';
//       } else if (formData.password.length < 6) {
//         newErrors.password = 'Password must be at least 6 characters';
//       }

//       if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = 'Passwords do not match';
//       }
//     } else if (formData.password && formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Dismiss any existing toasts before showing new ones
//     toast.dismiss();
    
//     if (!validateForm()) return;

//     setLoading(true);
//     try {
//       if (user) {
//         // Update existing user
//         const updateData: any = {
//           name: formData.name,
//           email: formData.email,
//           phoneNumber: formData.phoneNumber,
//           role: formData.role,
//           isActive: formData.isActive,
//         };
//         if (formData.password) {
//           updateData.password = formData.password;
//         }

//         if(formData.password!==formData.confirmPassword){
//             toast.error("password is not match");
//             return;
//         }
       
//         const createRes = await axios.put(
//           `${API_URL}/users/update/${user._id}`,
//           updateData,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//             },
//           }
//         );

//         if(createRes.data.success==true){
//           toast.success(createRes.data.message||"Successfully Updated users Data");
//           location.reload();
//         }else if(createRes.data.success==false && createRes.data.message==='Unauthorized'){
//           toast.error("login again");
//         }else{
//           toast.error(createRes?.data?.message || createRes?.data?.errors || 'Failed to save user');
//         }

//       } else {
//         // Create new user
//         const createRes = await axios.post(
//           `${API_URL}/users/signup`,
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//             },
//           }
//         );

//         if(createRes.data.success==true){
//           toast.success(createRes.data.message||"Successfully Create users Data");
//           location.reload();
//         }else if(createRes.data.success==false && createRes.data.message==='Unauthorized'){
//           toast.error("login again");
//         }else{
//           toast.error(createRes?.data?.message || createRes?.data?.errors || 'Failed to save user');
//         }
//       }
     
//     } catch (err: any) {
//       onError(err.response?.data?.message || 'Failed to save user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
//     }));
//     // Clear error for this field
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6">
//           {/* Header */}
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               {user ? 'Edit User' : 'Create New User'}
//             </h2>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               ✕
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Name Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Full Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter full name"
//                 className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                   errors.name ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//               {errors.name && (
//                 <p className="mt-1 text-xs text-red-500">{errors.name}</p>
//               )}
//             </div>

//             {/* Email Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter email address"
//                 className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                   errors.email ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//               {errors.email && (
//                 <p className="mt-1 text-xs text-red-500">{errors.email}</p>
//               )}
//             </div>

//             {/* Phone Number Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 placeholder="Enter 10-digit phone number"
//                 maxLength={10}
//                 className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                   errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//               {errors.phoneNumber && (
//                 <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>
//               )}
//             </div>

//             {/* Role Selection */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Role <span className="text-red-500">*</span>
//               </label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//               >
//                 <option value="deliveryboy">Delivery Boy</option>
//                 <option value="sellman">Sellman</option>
//                 <option value="admin">Admin</option>
//               </select>
//             </div>

//             {/* Password Fields */}
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   {user ? 'New Password (leave blank to keep current)' : 'Password'} 
//                   {!user && <span className="text-red-500">*</span>}
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder={user ? 'Enter new password' : 'Enter password'}
//                     className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.password ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
//                   >
//                     {showPassword ? '👁️' : '👁️‍🗨️'}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="mt-1 text-xs text-red-500">{errors.password}</p>
//                 )}
//               </div>

//               {(!user || formData.password) && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Confirm Password
//                   </label>
//                   <input
//                     type="password"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     placeholder="Confirm password"
//                     className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                   />
//                   {errors.confirmPassword && (
//                     <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Status Toggle (only for edit) */}
//             {user && (
//               <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="isActive"
//                     checked={formData.isActive}
//                     onChange={handleChange}
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                 </label>
//                 <span className="text-sm font-medium text-gray-700">
//                   {formData.isActive ? 'Active' : 'Inactive'}
//                 </span>
//               </div>
//             )}

//             {/* Form Actions */}
//             <div className="flex gap-3 pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all hover:-translate-y-0.5 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 font-medium"
//               >
//                 {loading ? 'Saving...' : user ? 'Update User' : 'Create User'}
//               </button>
//               <button
//                 type="button"
//                 onClick={onClose}
//                 disabled={loading}
//                 className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 font-medium"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// // UserTable Interface
// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   phoneNumber: string;
//   role: 'admin' | 'deliveryboy' | 'sellman';
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// // UserTable Component
// const UserTable: React.FC = () => {

//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  
//   // Search and Filter states
//   const [searchTerm, setSearchTerm] = useState('');
//   const [roleFilter, setRoleFilter] = useState<string>('all');
//   const [statusFilter, setStatusFilter] = useState<string>('all');
  
//   // Pagination states
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(25);
//   const [rowsPerPageOptions] = useState([25, 50, 100, 200]);
  
//   // Modal states
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [formOpen, setFormOpen] = useState(false);
  
//   // Notification
//   const [notification, setNotification] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
//     show: false,
//     message: '',
//     type: 'success'
//   });

//   // Fetch users
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);

//       const createRes = await axios.get(
//         `${API_URL}/users/getall`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//           },
//         }
//       );

//       if(createRes.data.success==true){
//         setUsers(createRes.data.data);
//         setError(null);
//         toast.success(createRes.data?.message||"successfully");
//       }else if(createRes.data.success==false && createRes.data.message==='Unauthorized'){
//         toast.error(createRes.data?.message || "something is wronge"); 
//       }else{
//         toast.error(createRes.data?.message || "something is wronge");
//       }
      
//     } catch (err) {
//       setError('Failed to fetch users');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Filter users based on search and filters
//   const filteredUsers = users?.filter(user => {
//     const matchesSearch = 
//       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (user.phoneNumber && user.phoneNumber.includes(searchTerm));
    
//     const matchesRole = roleFilter === 'all' ? true : user.role === roleFilter;
//     const matchesStatus = statusFilter === 'all' ? true : 
//       statusFilter === 'active' ? user.isActive : !user.isActive;
    
//     return matchesSearch && matchesRole && matchesStatus;
//   });

//   // Pagination
//   const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
//   const paginatedUsers = filteredUsers.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   // Statistics
//   const stats = {
//     total: users.length,
//     admin: users.filter(u => u.role === 'admin').length,
//     deliveryboy: users.filter(u => u.role === 'deliveryboy').length,
//     sellman: users.filter(u => u.role === 'sellman').length,
//     active: users.filter(u => u.isActive).length,
//     inactive: users.filter(u => !u.isActive).length,
//   };

//   // Handlers
//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setRowsPerPage(Number(event.target.value));
//     setPage(1);
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       const createRes = await axios.delete(
//         `${API_URL}/users/delete/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//           },
//         }
//       );

//       if(createRes.data.success==true){
//         setUsers(users.filter(user => user._id !== id));
//         showNotification('User deleted successfully', 'success');
        
//         // Adjust page if current page becomes empty
//         const totalPages = Math.ceil((filteredUsers.length - 1) / rowsPerPage);
//         if (page > totalPages && page > 1) {
//           setPage(totalPages);
//         }
//       }else if(createRes.data.success==false && createRes.data.message==='Unauthorized'){
//         toast.error(createRes.data?.message || "something is wronge");
//       }else{
//         toast.error(createRes.data?.message || "something is wronge");
//       }

//     } catch (err) {
//       showNotification('Failed to delete user', 'error');
//     }
//     setDeleteDialogOpen(false);
//   };

//   const handleDeleteAll = async () => {
//     try {
//       const createRes = await axios.delete(
//         `${API_URL}/users/deleteall`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//           },
//         }
//       );

//       if(createRes.data.success==true){
//         setUsers([]);
//         showNotification('All users deleted successfully', 'success');
//         setPage(1);
//       } else if(createRes.data.success==false && createRes.data.message==='Unauthorized'){
//         // Handle unauthorized
//       } else {
//         // Handle error
//       }
//     } catch (err) {
//       showNotification('Failed to delete all users', 'error');
//     }
//     setDeleteAllDialogOpen(false);
//   };

//   const handleStatusToggle = async (user: User) => {
//     try {
//       const response = await axios.patch(`/api/users/${user._id}`, {
//         isActive: !user.isActive
//       });
//       setUsers(users.map(u => u._id === user._id ? response.data : u));
//       showNotification(`User ${user.isActive ? 'deactivated' : 'activated'} successfully`, 'success');
//     } catch (err) {
//       showNotification('Failed to update user status', 'error');
//     }
//   };

//   const showNotification = (message: string, type: 'success' | 'error') => {
//     setNotification({ show: true, message, type });
//     setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 3000);
//   };

//   const getRoleBadgeColor = (role: string) => {
//     switch(role) {
//       case 'admin': return 'bg-purple-100 text-purple-700 border-purple-200';
//       case 'deliveryboy': return 'bg-green-100 text-green-700 border-green-200';
//       case 'sellman': return 'bg-blue-100 text-blue-700 border-blue-200';
//       default: return 'bg-gray-100 text-gray-700 border-gray-200';
//     }
//   };

//   const getRoleIcon = (role: string) => {
//     switch(role) {
//       case 'admin': return '👑';
//       case 'deliveryboy': return '🚚';
//       case 'sellman': return '💰';
//       default: return '👤';
//     }
//   };

//   if (loading && users.length === 0) {
//     return (
//       <div className="p-4 md:p-6 max-w-7xl mx-auto">
//         <div className="h-16 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
//         <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
//           {[1,2,3,4,5,6].map(i => (
//             <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse"></div>
//           ))}
//         </div>
//         <div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 md:p-6 max-w-7xl mx-auto">
//       {/* Notification */}
//       {notification.show && (
//         <div className={`fixed top-4 right-4 z-50 animate-slide-in ${
//           notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
//         } border rounded-xl px-4 py-3 shadow-lg flex items-center gap-2`}>
//           <span>{notification.type === 'success' ? '✅' : '❌'}</span>
//           <span className="text-sm font-medium">{notification.message}</span>
//           <button onClick={() => setNotification(prev => ({ ...prev, show: false }))} className="ml-4 text-gray-400 hover:text-gray-600">✕</button>
//         </div>
//       )}

//       {/* Header Section */}
//       <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
//         <div>
//           <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
//             User Management
//           </h1>
//           <p className="text-sm md:text-base text-gray-600">
//             Manage users, roles, and permissions
//           </p>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-2">
//           <button
//             onClick={() => {
//               setSelectedUser(null);
//               setFormOpen(true);
//             }}
//             className="px-4 md:px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm font-medium shadow-md"
//           >
//             <span>➕</span> Add User
//           </button>

//           <button
//             onClick={fetchUsers}
//             className="px-4 md:px-6 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm font-medium"
//           >
//             <span>🔄</span> Refresh
//           </button>

//           <button
//             onClick={() => setDeleteAllDialogOpen(true)}
//             disabled={users.length === 0}
//             className="px-4 md:px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all hover:-translate-y-0.5 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 text-sm font-medium"
//           >
//             <span>🗑️</span> Delete All
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards with Hover Effect */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
//         {/* Total Users Card */}
//         <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-blue-600 hover:to-blue-700 cursor-pointer group">
//           <p className="text-xs opacity-90 group-hover:opacity-100">Total Users</p>
//           <p className="text-xl font-bold group-hover:scale-110 transition-transform inline-block">{stats.total}</p>
//           <div className="mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
//             👥 All registered users
//           </div>
//         </div>

//         {/* Admin Card */}
//         <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-3 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-purple-600 hover:to-purple-700 cursor-pointer group">
//           <p className="text-xs opacity-90 group-hover:opacity-100">Admin</p>
//           <p className="text-xl font-bold group-hover:scale-110 transition-transform inline-block">{stats.admin}</p>
//           <div className="mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
//             👑 System administrators
//           </div>
//         </div>

//         {/* Delivery Boys Card */}
//         <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-3 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-green-600 hover:to-green-700 cursor-pointer group">
//           <p className="text-xs opacity-90 group-hover:opacity-100">Delivery Boys</p>
//           <p className="text-xl font-bold group-hover:scale-110 transition-transform inline-block">{stats.deliveryboy}</p>
//           <div className="mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
//             🚚 Delivery personnel
//           </div>
//         </div>

//         {/* Sellmen Card */}
//         <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-3 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-orange-600 hover:to-orange-700 cursor-pointer group">
//           <p className="text-xs opacity-90 group-hover:opacity-100">Sellmen</p>
//           <p className="text-xl font-bold group-hover:scale-110 transition-transform inline-block">{stats.sellman}</p>
//           <div className="mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
//             💰 Sales representatives
//           </div>
//         </div>

//         {/* Active Card */}
//         <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-3 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-emerald-600 hover:to-emerald-700 cursor-pointer group">
//           <p className="text-xs opacity-90 group-hover:opacity-100">Active</p>
//           <p className="text-xl font-bold group-hover:scale-110 transition-transform inline-block">{stats.active}</p>
//           <div className="mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
//             ✅ Currently active users
//           </div>
//         </div>

//         {/* Inactive Card */}
//         <div className="bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl p-3 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-gray-600 hover:to-gray-700 cursor-pointer group">
//           <p className="text-xs opacity-90 group-hover:opacity-100">Inactive</p>
//           <p className="text-xl font-bold group-hover:scale-110 transition-transform inline-block">{stats.inactive}</p>
//           <div className="mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
//             ⛔ Deactivated users
//           </div>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="mb-4 flex flex-col lg:flex-row gap-3">
//         <div className="flex-1 relative">
//           <input
//             type="text"
//             placeholder="Search by name, email, or phone..."
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setPage(1);
//             }}
//             className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
//         </div>
        
//         <div className="flex gap-2">
//           <select
//             value={roleFilter}
//             onChange={(e) => {
//               setRoleFilter(e.target.value);
//               setPage(1);
//             }}
//             className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//           >
//             <option value="all">All Roles</option>
//             <option value="admin">Admin</option>
//             <option value="deliveryboy">Delivery Boy</option>
//             <option value="sellman">Sellman</option>
//           </select>

//           <select
//             value={statusFilter}
//             onChange={(e) => {
//               setStatusFilter(e.target.value);
//               setPage(1);
//             }}
//             className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//           >
//             <option value="all">All Status</option>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </div>
//       </div>

//       {/* Rows Per Page Selector */}
//       {filteredUsers.length > 0 && (
//         <div className="mb-4 flex justify-end">
//           <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200">
//             <span className="text-sm text-gray-600">Show:</span>
//             <select
//               value={rowsPerPage}
//               onChange={handleRowsPerPageChange}
//               className="border-none focus:outline-none text-sm font-medium text-gray-700 bg-transparent"
//             >
//               {rowsPerPageOptions.map(option => (
//                 <option key={option} value={option}>{option}</option>
//               ))}
//             </select>
//             <span className="text-sm text-gray-600">entries</span>
//           </div>
//         </div>
//       )}

//       {/* Error Message */}
//       {error && (
//         <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
//           {error}
//         </div>
//       )}

//       {/* Desktop Table View */}
//       <div className="hidden lg:block bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
//                 <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
//                 <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
//                 <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
//                 <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Joined</th>
//                 <th className="px-4 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {paginatedUsers.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="px-4 py-12 text-center">
//                     <p className="text-gray-500">No users found</p>
//                   </td>
//                 </tr>
//               ) : (
//                 paginatedUsers.map((user) => (
//                   <tr key={user._id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-4 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
//                           {user.name.charAt(0).toUpperCase()}
//                         </div>
//                         <div>
//                           <p className="font-medium">{user.name}</p>
//                           <p className="text-xs text-gray-500">ID: {user._id.slice(-6)}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-4">
//                       <p className="text-sm">{user.email}</p>
//                       <p className="text-xs text-gray-500">{user.phoneNumber || 'No phone'}</p>
//                     </td>
//                     <td className="px-4 py-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
//                         {getRoleIcon(user.role)} {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
//                       </span>
//                     </td>
//                     <td className="px-4 py-4">
//                       <button
//                         onClick={() => handleStatusToggle(user)}
//                         className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
//                           user.isActive 
//                             ? 'bg-green-100 text-green-700 hover:bg-green-200' 
//                             : 'bg-red-100 text-red-700 hover:bg-red-200'
//                         }`}
//                       >
//                         {user.isActive ? 'Active' : 'Inactive'}
//                       </button>
//                     </td>
//                     <td className="px-4 py-4">
//                       <p className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</p>
//                       <p className="text-xs text-gray-500">{new Date(user.createdAt).toLocaleTimeString()}</p>
//                     </td>
//                     <td className="px-4 py-4">
//                       <div className="flex items-center justify-center gap-2">
//                         <button
//                           onClick={() => {
//                             setSelectedUser(user);
//                             setFormOpen(true);
//                           }}
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                           title="Edit"
//                         >
//                           ✏️
//                         </button>
//                         <button
//                           onClick={() => {
//                             setSelectedUser(user);
//                             setDeleteDialogOpen(true);
//                           }}
//                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                           title="Delete"
//                         >
//                           🗑️
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Mobile/Tablet Card View */}
//       <div className="lg:hidden space-y-3">
//         {paginatedUsers.length === 0 ? (
//           <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
//             <p className="text-gray-500">No users found</p>
//           </div>
//         ) : (
//           paginatedUsers.map((user) => (
//             <div key={user._id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
//               <div className="flex items-start justify-between mb-3">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
//                     {user.name.charAt(0).toUpperCase()}
//                   </div>
//                   <div>
//                     <p className="font-semibold">{user.name}</p>
//                     <p className="text-xs text-gray-500">ID: {user._id.slice(-6)}</p>
//                   </div>
//                 </div>
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
//                   {getRoleIcon(user.role)}
//                 </span>
//               </div>

//               <div className="grid grid-cols-2 gap-2 mb-3 p-3 bg-gray-50 rounded-lg">
//                 <div>
//                   <p className="text-xs text-gray-500">Email</p>
//                   <p className="text-sm truncate">{user.email}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Phone</p>
//                   <p className="text-sm">{user.phoneNumber || 'N/A'}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Status</p>
//                   <button
//                     onClick={() => handleStatusToggle(user)}
//                     className={`mt-1 px-3 py-1 rounded-full text-xs font-medium ${
//                       user.isActive 
//                         ? 'bg-green-100 text-green-700' 
//                         : 'bg-red-100 text-red-700'
//                     }`}
//                   >
//                     {user.isActive ? 'Active' : 'Inactive'}
//                   </button>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Joined</p>
//                   <p className="text-xs">{new Date(user.createdAt).toLocaleDateString()}</p>
//                 </div>
//               </div>

//               <div className="flex gap-2 pt-3 border-t border-gray-200">
//                 <button
//                   onClick={() => {
//                     setSelectedUser(user);
//                     setFormOpen(true);
//                   }}
//                   className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
//                 >
//                   <span>✏️</span> Edit
//                 </button>
//                 <button
//                   onClick={() => {
//                     setSelectedUser(user);
//                     setDeleteDialogOpen(true);
//                   }}
//                   className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 transition-colors flex items-center justify-center gap-1"
//                 >
//                   <span>🗑️</span> Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Pagination Controls */}
//       {filteredUsers.length > 0 && (
//         <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div className="text-sm text-gray-500">
//             Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredUsers.length)} of {filteredUsers.length} entries
//           </div>
          
//           <div className="flex items-center gap-2 flex-wrap justify-center">
//             <button
//               onClick={() => handlePageChange(1)}
//               disabled={page === 1}
//               className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               ⏮️ First
//             </button>
//             <button
//               onClick={() => handlePageChange(page - 1)}
//               disabled={page === 1}
//               className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               ◀️ Prev
//             </button>
            
//             <div className="flex items-center gap-1">
//               {[...Array(Math.min(5, totalPages))].map((_, idx) => {
//                 let pageNum;
//                 if (totalPages <= 5) {
//                   pageNum = idx + 1;
//                 } else if (page <= 3) {
//                   pageNum = idx + 1;
//                 } else if (page >= totalPages - 2) {
//                   pageNum = totalPages - 4 + idx;
//                 } else {
//                   pageNum = page - 2 + idx;
//                 }
                
//                 return (
//                   <button
//                     key={idx}
//                     onClick={() => handlePageChange(pageNum)}
//                     className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
//                       page === pageNum
//                         ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
//                         : 'border border-gray-200 bg-white hover:bg-gray-50'
//                     }`}
//                   >
//                     {pageNum}
//                   </button>
//                 );
//               })}
//             </div>
            
//             <button
//               onClick={() => handlePageChange(page + 1)}
//               disabled={page === totalPages}
//               className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Next ▶️
//             </button>
//             <button
//               onClick={() => handlePageChange(totalPages)}
//               disabled={page === totalPages}
//               className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Last ⏭️
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {deleteDialogOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl max-w-md w-full p-6">
//             <h2 className="text-xl font-bold text-red-600 mb-4">Confirm Delete</h2>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
//             </p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setDeleteDialogOpen(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => selectedUser && handleDelete(selectedUser._id)}
//                 className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm hover:from-red-600 hover:to-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete All Confirmation Modal */}
//       {deleteAllDialogOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl max-w-md w-full p-6">
//             <h2 className="text-xl font-bold text-red-600 mb-4">Delete All Users</h2>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to delete ALL users? This action cannot be undone.
//             </p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setDeleteAllDialogOpen(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDeleteAll}
//                 className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm hover:from-red-600 hover:to-red-700"
//               >
//                 Delete All
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* User Form Modal */}
//       {formOpen && (
//         <UserForm
//           user={selectedUser}
//           onClose={() => {
//             setFormOpen(false);
//             setSelectedUser(null);
//           }}
//           onSuccess={() => {
//             fetchUsers();
//             setFormOpen(false);
//             setSelectedUser(null);
//             showNotification(
//               selectedUser ? 'User updated successfully' : 'User created successfully',
//               'success'
//             );
//           }}
//           onError={(message: string) => showNotification(message, 'error')}
//         />
//       )}
//     </div>
//   );
// };

// export default UserTable;




import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

// ==================== UserForm Component ====================
interface UserFormProps {
  user?: {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: 'admin' | 'deliveryboy' | 'sellman';
    isActive: boolean;
  } | null;
  onClose: () => void;
  onSuccess: () => void;
  onError: (message: string) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onClose, onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    role: user?.role || 'deliveryboy',
    password: '',
    confirmPassword: '',
    isActive: user?.isActive ?? true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Name cannot exceed 50 characters';
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }

    if (!user) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.dismiss();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (user) {
        const updateData: any = {
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          role: formData.role,
          isActive: formData.isActive,
        };
        if (formData.password) {
          updateData.password = formData.password;
        }

        if(formData.password !== formData.confirmPassword){
          toast.error("Passwords do not match");
          setLoading(false);
          return;
        }
       
        const response = await axios.put(
          `${API_URL}/users/update/${user._id}`,
          updateData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          }
        );

        if(response.data.success === true){
          toast.success(response.data.message || "Successfully updated user");
          onSuccess();
        } else {
          toast.error(response?.data?.message || response?.data?.errors || 'Failed to update user');
        }
      } else {
        const response = await axios.post(
          `${API_URL}/users/signup`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          }
        );

        if(response.data.success === true){
          toast.success(response.data.message || "Successfully created user");
          onSuccess();
        } else {
          toast.error(response?.data?.message || response?.data?.errors || 'Failed to create user');
        }
      }
    } catch (err: any) {
      console.error('Form submission error:', err);
      onError(err.response?.data?.message || 'Failed to save user');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {user ? 'Edit User' : 'Create New User'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter 10-digit phone number"
                maxLength={10}
                className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="deliveryboy">Delivery Boy</option>
                <option value="sellman">Sellman</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {user ? 'New Password (leave blank to keep current)' : 'Password'} 
                  {!user && <span className="text-red-500">*</span>}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={user ? 'Enter new password' : 'Enter password'}
                    className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              {(!user || formData.password) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
                  )}
                </div>
              )}
            </div>

            {user && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <span className="text-sm font-medium text-gray-700">
                  {formData.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all hover:-translate-y-0.5 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 font-medium"
              >
                {loading ? 'Saving...' : user ? 'Update User' : 'Create User'}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// ==================== Interfaces ====================
interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: 'admin' | 'deliveryboy' | 'sellman';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  pages: number;
  count: number;
}

// ==================== Main UserTable Component ====================
const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 25,
    pages: 0,
    count: 0
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  
  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch users with backend pagination
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString()
      });
      
      if (debouncedSearchTerm) {
        params.append('search', debouncedSearchTerm);
      }
      
      if (roleFilter !== 'all') {
        params.append('role', roleFilter);
      }
      
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }

      const response = await axios.get(
        `${API_URL}/users/getall?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );

      if (response.data.success) {
        setUsers(response.data.data);
        setPagination({
          total: response.data.total,
          page: response.data.page,
          limit: response.data.limit,
          pages: response.data.pages,
          count: response.data.count
        });
        setError(null);
      } else {
        toast.error(response.data?.message || "Something went wrong");
      }
      
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, debouncedSearchTerm, roleFilter, statusFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const stats = {
    total: pagination.total,
    admin: users.filter(u => u.role === 'admin').length,
    deliveryboy: users.filter(u => u.role === 'deliveryboy').length,
    sellman: users.filter(u => u.role === 'sellman').length,
    active: users.filter(u => u.isActive).length,
    inactive: users.filter(u => !u.isActive).length,
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPagination({
      ...pagination,
      limit: Number(event.target.value),
      page: 1
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleRoleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoleFilter(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `${API_URL}/users/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );

      if (response.data.success) {
        toast.success('User deleted successfully');
        fetchUsers();
      } else {
        toast.error(response.data?.message || "Something went wrong");
      }
    } catch (err) {
      toast.error('Failed to delete user');
    }
    setDeleteDialogOpen(false);
  };

  const handleDeleteAll = async () => {
    try {
      const response = await axios.delete(
        `${API_URL}/users/deleteall`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );

      if (response.data.success) {
        toast.success('All users deleted successfully');
        setPagination(prev => ({ ...prev, page: 1 }));
        fetchUsers();
      } else {
        toast.error(response.data?.message || "Something went wrong");
      }
    } catch (err) {
      toast.error('Failed to delete all users');
    }
    setDeleteAllDialogOpen(false);
  };

  const handleStatusToggle = async (user: User) => {
    try {
      const response = await axios.patch(
        `${API_URL}/users/${user._id}`,
        { isActive: !user.isActive },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );
      
      if (response.data.success) {
        toast.success(`User ${user.isActive ? 'deactivated' : 'activated'} successfully`);
        setUsers(users.map(u => u._id === user._id ? { ...u, isActive: !u.isActive } : u));
      }
    } catch (err) {
      toast.error('Failed to update user status');
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch(role) {
      case 'admin': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'deliveryboy': return 'bg-green-100 text-green-700 border-green-200';
      case 'sellman': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRoleIcon = (role: string) => {
    switch(role) {
      case 'admin': return '👑';
      case 'deliveryboy': return '🚚';
      case 'sellman': return '💰';
      default: return '👤';
    }
  };

  if (loading && users.length === 0) {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="h-16 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
        <div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            User Management
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Manage users, roles, and permissions
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => {
              setSelectedUser(null);
              setFormOpen(true);
            }}
            className="px-4 md:px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm font-medium shadow-md"
          >
            <span>➕</span> Add User
          </button>

          <button
            onClick={fetchUsers}
            className="px-4 md:px-6 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <span>🔄</span> Refresh
          </button>

          <button
            onClick={() => setDeleteAllDialogOpen(true)}
            disabled={pagination.total === 0}
            className="px-4 md:px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all hover:-translate-y-0.5 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <span>🗑️</span> Delete All
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-blue-600 hover:to-blue-700 cursor-pointer group">
          <p className="text-xs opacity-90 group-hover:opacity-100">Total Users</p>
          <p className="text-xl font-bold group-hover:scale-110 transition-transform inline-block">{stats.total}</p>
          <div className="mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            👥 All registered users
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-3 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-purple-600 hover:to-purple-700 cursor-pointer group">
          <p className="text-xs opacity-90 group-hover:opacity-100">Admin</p>
          <p className="text-xl font-bold group-hover:scale-110 transition-transform inline-block">{stats.admin}</p>
          <div className="mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            👑 System administrators
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-3 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-green-600 hover:to-green-700 cursor-pointer group">
          <p className="text-xs opacity-90 group-hover:opacity-100">Delivery Boys</p>
          <p className="text-xl font-bold group-hover:scale-110 transition-transform inline-block">{stats.deliveryboy}</p>
          <div className="mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            🚚 Delivery personnel
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-3 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-orange-600 hover:to-orange-700 cursor-pointer group">
          <p className="text-xs opacity-90 group-hover:opacity-100">Sellmen</p>
          <p className="text-xl font-bold group-hover:scale-110 transition-transform inline-block">{stats.sellman}</p>
          <div className="mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            💰 Sales representatives
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-3 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-emerald-600 hover:to-emerald-700 cursor-pointer group">
          <p className="text-xs opacity-90 group-hover:opacity-100">Active</p>
          <p className="text-xl font-bold group-hover:scale-110 transition-transform inline-block">{stats.active}</p>
          <div className="mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            ✅ Currently active users
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl p-3 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-gray-600 hover:to-gray-700 cursor-pointer group">
          <p className="text-xs opacity-90 group-hover:opacity-100">Inactive</p>
          <p className="text-xl font-bold group-hover:scale-110 transition-transform inline-block">{stats.inactive}</p>
          <div className="mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            ⛔ Deactivated users
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-4 flex flex-col lg:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          {searchTerm !== debouncedSearchTerm && (
            <span className="absolute right-3 top-2.5 text-xs text-gray-400">Searching...</span>
          )}
        </div>
        
        <div className="flex gap-2">
          <select
            value={roleFilter}
            onChange={handleRoleFilterChange}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="deliveryboy">Delivery Boy</option>
            <option value="sellman">Sellman</option>
          </select>

          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Rows Per Page Selector */}
      {pagination.total > 0 && (
        <div className="mb-4 flex justify-end">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200">
            <span className="text-sm text-gray-600">Show:</span>
            <select
              value={pagination.limit}
              onChange={handleRowsPerPageChange}
              className="border-none focus:outline-none text-sm font-medium text-gray-700 bg-transparent"
            >
              {[25, 50, 100, 200].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <span className="text-sm text-gray-600">entries</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          {error}
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-700">
          Loading users...
        </div>
      )}

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Joined</th>
                <th className="px-4 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <p className="text-gray-500">No users found</p>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-gray-500">ID: {user._id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm">{user.email}</p>
                      <p className="text-xs text-gray-500">{user.phoneNumber || 'No phone'}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
                        {getRoleIcon(user.role)} {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleStatusToggle(user)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          user.isActive 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-500">{new Date(user.createdAt).toLocaleTimeString()}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setFormOpen(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setDeleteDialogOpen(true);
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden space-y-3">
        {users.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
            <p className="text-gray-500">No users found</p>
          </div>
        ) : (
          users.map((user) => (
            <div key={user._id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-500">ID: {user._id.slice(-6)}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
                  {getRoleIcon(user.role)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3 p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm truncate">{user.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm">{user.phoneNumber || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <button
                    onClick={() => handleStatusToggle(user)}
                    className={`mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                      user.isActive 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {user.isActive ? 'Active' : 'Inactive'}
                  </button>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Joined</p>
                  <p className="text-xs">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-200">
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setFormOpen(true);
                  }}
                  className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
                >
                  <span>✏️</span> Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setDeleteDialogOpen(true);
                  }}
                  className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 transition-colors flex items-center justify-center gap-1"
                >
                  <span>🗑️</span> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {pagination.total > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-500">
            Showing {(pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
          </div>
          
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button
              onClick={() => handlePageChange(1)}
              disabled={pagination.page === 1}
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ⏮️ First
            </button>
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ◀️ Prev
            </button>
            
            <div className="flex items-center gap-1">
              {[...Array(Math.min(5, pagination.pages))].map((_, idx) => {
                let pageNum;
                if (pagination.pages <= 5) {
                  pageNum = idx + 1;
                } else if (pagination.page <= 3) {
                  pageNum = idx + 1;
                } else if (pagination.page >= pagination.pages - 2) {
                  pageNum = pagination.pages - 4 + idx;
                } else {
                  pageNum = pagination.page - 2 + idx;
                }
                
                return (
                  <button
                    key={idx}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      pagination.page === pageNum
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        : 'border border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next ▶️
            </button>
            <button
              onClick={() => handlePageChange(pagination.pages)}
              disabled={pagination.page === pagination.pages}
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Last ⏭️
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-red-600 mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => selectedUser && handleDelete(selectedUser._id)}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm hover:from-red-600 hover:to-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete All Confirmation Modal */}
      {deleteAllDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-red-600 mb-4">Delete All Users</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete ALL users? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteAllDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAll}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm hover:from-red-600 hover:to-red-700"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Form Modal */}
      {formOpen && (
        <UserForm
          user={selectedUser}
          onClose={() => {
            setFormOpen(false);
            setSelectedUser(null);
          }}
          onSuccess={() => {
            fetchUsers();
            setFormOpen(false);
            setSelectedUser(null);
            toast.success(selectedUser ? 'User updated successfully' : 'User created successfully');
          }}
          onError={(message: string) => toast.error(message)}
        />
      )}
    </div>
  );
};

export default UserTable;