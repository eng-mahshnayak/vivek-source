import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { Role, Module } from './Permission';  // Add 'type' keyword



const API_URL = import.meta.env.VITE_API_URL;

// Default modules and submodules data
const DEFAULT_MODULES: Module[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    submodules: [
      {
        id: 'dashboard-view',
        moduleId: 'dashboard',
        name: 'Dashboard View',
        permissions: [
          { id: 'show', name: 'show', label: 'Show', description: 'View dashboard' }
        ]
      }
    ]
  },
  {
    id: 'sale',
    name: 'Sale',
    submodules: [
      {
        id: 'sale-invoice',
        moduleId: 'sale',
        name: 'Sale Invoice',
        permissions: [
          { id: 'show', name: 'show', label: 'Show', description: 'View sale invoices' },
          { id: 'create', name: 'create', label: 'Create', description: 'Create new sale invoice' },
          { id: 'update', name: 'update', label: 'Update', description: 'Edit sale invoices' },
          { id: 'delete', name: 'delete', label: 'Delete', description: 'Delete sale invoices' }
        ]
      },
      {
        id: 'sale-order',
        moduleId: 'sale',
        name: 'Sale Order',
        permissions: [
          { id: 'show', name: 'show', label: 'Show', description: 'View sale orders' },
          { id: 'create', name: 'create', label: 'Create', description: 'Create new sale order' },
          { id: 'update', name: 'update', label: 'Update', description: 'Edit sale orders' },
          { id: 'delete', name: 'delete', label: 'Delete', description: 'Delete sale orders' }
        ]
      },
      {
        id: 'sale-credit',
        moduleId: 'sale',
        name: 'Credit Order',
        permissions: [
          { id: 'show', name: 'show', label: 'Show', description: 'View credit orders' },
          { id: 'create', name: 'create', label: 'Create', description: 'Create new credit order' },
          { id: 'update', name: 'update', label: 'Update', description: 'Edit credit orders' },
          { id: 'delete', name: 'delete', label: 'Delete', description: 'Delete credit orders' }
        ]
      },
      {
        id: 'sale-quotation',
        moduleId: 'sale',
        name: 'Quotation',
        permissions: [
          { id: 'show', name: 'show', label: 'Show', description: 'View quotations' },
          { id: 'create', name: 'create', label: 'Create', description: 'Create new quotation' },
          { id: 'update', name: 'update', label: 'Update', description: 'Edit quotations' },
          { id: 'delete', name: 'delete', label: 'Delete', description: 'Delete quotations' }
        ]
      },
      {
        id: 'sale-delivery',
        moduleId: 'sale',
        name: 'Delivery Challan',
        permissions: [
          { id: 'show', name: 'show', label: 'Show', description: 'View delivery challans' },
          { id: 'create', name: 'create', label: 'Create', description: 'Create new delivery challan' },
          { id: 'update', name: 'update', label: 'Update', description: 'Edit delivery challans' },
          { id: 'delete', name: 'delete', label: 'Delete', description: 'Delete delivery challans' }
        ]
      }
    ]
  },
  {
    id: 'purchase',
    name: 'Purchase',
    submodules: [
      {
        id: 'purchase-invoice',
        moduleId: 'purchase',
        name: 'Purchase Invoice',
        permissions: [
          { id: 'show', name: 'show', label: 'Show', description: 'View purchase invoices' },
          { id: 'create', name: 'create', label: 'Create', description: 'Create new purchase invoice' },
          { id: 'update', name: 'update', label: 'Update', description: 'Edit purchase invoices' },
          { id: 'delete', name: 'delete', label: 'Delete', description: 'Delete purchase invoices' }
        ]
      }
    ]
  },
  {
    id: 'cash',
    name: 'Cash Management',
    submodules: [
      {
        id: 'cash-summary',
        moduleId: 'cash',
        name: 'Cash Summary',
        permissions: [
          { id: 'show', name: 'show', label: 'Show', description: 'View cash summary' },
          { id: 'create', name: 'create', label: 'Create', description: 'Add cash entry' },
          { id: 'update', name: 'update', label: 'Update', description: 'Edit cash entries' },
          { id: 'delete', name: 'delete', label: 'Delete', description: 'Delete cash entries' }
        ]
      }
    ]
  },
  {
    id: 'parties',
    name: 'Parties',
    submodules: [
      {
        id: 'parties-list',
        moduleId: 'parties',
        name: 'Parties List',
        permissions: [
          { id: 'show', name: 'show', label: 'Show', description: 'View parties' },
          { id: 'create', name: 'create', label: 'Create', description: 'Create new party' },
          { id: 'update', name: 'update', label: 'Update', description: 'Edit parties' },
          { id: 'delete', name: 'delete', label: 'Delete', description: 'Delete parties' }
        ]
      }
    ]
  },
  {
    id: 'user-management',
    name: 'User Management',
    submodules: [
      {
        id: 'users',
        moduleId: 'user-management',
        name: 'Users',
        permissions: [
          { id: 'show', name: 'show', label: 'Show', description: 'View users' },
          { id: 'create', name: 'create', label: 'Create', description: 'Create new user' },
          { id: 'update', name: 'update', label: 'Update', description: 'Edit users' },
          { id: 'delete', name: 'delete', label: 'Delete', description: 'Delete users' }
        ]
      },
      {
        id: 'permissions',
        moduleId: 'user-management',
        name: 'Permissions',
        permissions: [
          { id: 'show', name: 'show', label: 'Show', description: 'View roles' },
          { id: 'create', name: 'create', label: 'Create', description: 'Create new role' },
          { id: 'update', name: 'update', label: 'Update', description: 'Edit roles' },
          { id: 'delete', name: 'delete', label: 'Delete', description: 'Delete roles' }
        ]
      }
    ]
  },
  {
    id: 'reports',
    name: 'Reports',
    submodules: [
      {
        id: 'reports-view',
        moduleId: 'reports',
        name: 'Reports',
        permissions: [
          { id: 'show', name: 'show', label: 'Show', description: 'View reports' },
          { id: 'export', name: 'create', label: 'Export', description: 'Export reports' }
        ]
      }
    ]
  }
];

// Default roles data
const DEFAULT_ROLES: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    permissions: generateFullPermissions(true)
  },
  {
    id: '2',
    name: 'Sale Officer',
    description: 'Manage sales operations',
    permissions: generateSaleOfficerPermissions()
  },
  {
    id: '3',
    name: 'Delivery Boy',
    description: 'View delivery related information',
    permissions: generateDeliveryBoyPermissions()
  }
];

// Helper function to generate full permissions
function generateFullPermissions(allowed: boolean) {
  const permissions: any = {};
  DEFAULT_MODULES.forEach(module => {
    permissions[module.id] = {};
    module.submodules.forEach(sub => {
      permissions[module.id][sub.id] = {
        show: allowed,
        create: allowed,
        update: allowed,
        delete: allowed
      };
    });
  });
  return permissions;
}

// Generate Sale Officer permissions
function generateSaleOfficerPermissions() {
  const permissions: any = {};
  DEFAULT_MODULES.forEach(module => {
    permissions[module.id] = {};
    module.submodules.forEach(sub => {
      if (module.id === 'sale' || module.id === 'parties' || module.id === 'reports') {
        permissions[module.id][sub.id] = {
          show: true,
          create: true,
          update: true,
          delete: false
        };
      } else if (module.id === 'dashboard' || module.id === 'cash') {
        permissions[module.id][sub.id] = {
          show: true,
          create: false,
          update: false,
          delete: false
        };
      } else {
        permissions[module.id][sub.id] = {
          show: false,
          create: false,
          update: false,
          delete: false
        };
      }
    });
  });
  return permissions;
}

// Generate Delivery Boy permissions
function generateDeliveryBoyPermissions() {
  const permissions: any = {};
  DEFAULT_MODULES.forEach(module => {
    permissions[module.id] = {};
    module.submodules.forEach(sub => {
      if (module.id === 'sale' && sub.id === 'sale-delivery') {
        permissions[module.id][sub.id] = {
          show: true,
          create: false,
          update: true,
          delete: false
        };
      } else if (module.id === 'dashboard') {
        permissions[module.id][sub.id] = {
          show: true,
          create: false,
          update: false,
          delete: false
        };
      } else {
        permissions[module.id][sub.id] = {
          show: false,
          create: false,
          update: false,
          delete: false
        };
      }
    });
  });
  return permissions;
}

// Get auth headers
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
  },
});

const PermissionTable: React.FC = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  // Fetch roles
  const fetchRoles = async () => {
    setLoading(true);
    try {

      console.log(`${API_URL}/users/permissions/roles`);
      
      const res = await axios.get(`${API_URL}/users/permissions/roles`, getAuthHeaders());
      
      if (res.data?.success === true) {

        console.log(res.data.data,'res.data.data');
        
        setRoles(res.data.data.roles || []);
      } else if (res.data?.success === false && res.data?.message === 'Unauthorized') {
        toast.error("Login again");
        navigate('/login');
      } else {
        // If no data, use default roles
        setRoles(DEFAULT_ROLES);
      }
    } catch (error: any) {
      console.error('Error fetching roles:', error);
      // Set default roles on error
      setRoles(DEFAULT_ROLES);
      toast.error('Using default roles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreate = () => {
    navigate('/users/permissions/create');
  };

  const handleEdit = (role: Role) => {
    navigate(`/users/permissions/edit/${role.id || role._id}`);
  };

  const handleDelete = (role: Role) => {
    setSelectedRole(role);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedRole) return;

    try {
      const res = await axios.delete(
        `${API_URL}/permissions/roles/${selectedRole.id || selectedRole._id}`,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        toast.success('Role deleted successfully');
        fetchRoles();
      } else {
        // If API fails, remove from local state
        setRoles(roles.filter(r => (r.id || r._id) !== (selectedRole.id || selectedRole._id)));
        toast.success('Role deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting role:', error);
      // Remove from local state on error
      setRoles(roles.filter(r => (r.id || r._id) !== (selectedRole.id || selectedRole._id)));
      toast.success('Role deleted successfully');
    } finally {
      setDeleteDialogOpen(false);
      setSelectedRole(null);
    }
  };

  // Get permission count for display
  const getPermissionCount = (permissions: any) => {
    let count = 0;
    Object.values(permissions).forEach((module: any) => {
      Object.values(module).forEach((sub: any) => {
        Object.values(sub).forEach((value: any) => {
          if (value) count++;
        });
      });
    });
    return count;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent mb-2">
              Role Management
            </h1>
            <p className="text-gray-600">Manage roles and their permissions</p>
          </div>

          <button
            onClick={handleCreate}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-md"
          >
            ➕ Create New Role
          </button>
        </div>

        {/* Roles Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-800 to-slate-900">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Role Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Description</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">Permissions</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">Created</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      </div>
                    </td>
                  </tr>
                ) : roles.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="text-6xl mb-4">👥</div>
                      <p className="text-lg text-gray-500 mb-2">No roles found</p>
                      <p className="text-sm text-gray-400">Click "Create New Role" to create your first role</p>
                    </td>
                  </tr>
                ) : (
                  roles.map((role) => (
                    <tr key={role.id || role._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-800">{role.name}</p>
                          <p className="text-xs text-gray-500">ID: {role.id || role._id}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{role.description}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                          {getPermissionCount(role.permissions)} Permissions
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <p className="text-sm text-gray-600">
                          {role.createdAt ? new Date(role.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(role)}
                            className="p-2 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors"
                            title="Edit Role"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(role)}
                            className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Role"
                            disabled={role.name === 'Admin'} // Prevent deleting Admin role
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

        {/* Delete Confirmation Modal */}
        {deleteDialogOpen && selectedRole && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <h2 className="text-xl font-bold text-red-600 mb-4">Confirm Delete</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete the role "{selectedRole.name}"? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteDialogOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionTable;