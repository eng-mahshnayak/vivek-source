



import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import type { Role, Module, SubModule, Permission } from './Permission';

const API_URL = import.meta.env.VITE_API_URL;

// Default modules data
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

// Type for permission values
type PermissionValue = {
  show: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
};

// Type for permissions object
type PermissionsType = {
  [moduleId: string]: {
    [subModuleId: string]: PermissionValue;
  };
};

// Get auth headers
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
  },
});

const PermissionForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id && id !== 'create';

  const [formData, setFormData] = useState<Role>({
    name: '',
    description: '',
    permissions: {}
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  // Initialize permissions based on modules
  useEffect(() => {
    const initialPermissions: PermissionsType = {};
    DEFAULT_MODULES.forEach(module => {
      initialPermissions[module.id] = {};
      module.submodules.forEach((sub: SubModule) => {
        initialPermissions[module.id][sub.id] = {
          show: false,
          create: false,
          update: false,
          delete: false
        };
      });
    });
    setFormData((prev: Role) => ({ ...prev, permissions: initialPermissions }));
  }, []);

  // Fetch role data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      fetchRoleData();
    }
  }, [id]);

  const fetchRoleData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/users/permissions/rolesbyid/${id}`, getAuthHeaders());

      console.log(res,'res');
      
      
      if (res.data?.success === true) {
        const roleData = res.data.data;
        setFormData({
          name: roleData.name || '',
          description: roleData.description || '',
          permissions: roleData.permissions || {}
        });
      } else {
        toast.error('Failed to fetch role data');
        navigate('/users/permissions');
      }
    } catch (error: any) {
      console.error('Error fetching role:', error);
      toast.error('Error loading role data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: Role) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (
    moduleId: string,
    subModuleId: string,
    permission: keyof PermissionValue,
    checked: boolean
  ) => {
    setFormData((prev: Role) => {
      const permissions = { ...prev.permissions } as PermissionsType;
      
      if (!permissions[moduleId]) {
        permissions[moduleId] = {};
      }
      if (!permissions[moduleId][subModuleId]) {
        permissions[moduleId][subModuleId] = {
          show: false,
          create: false,
          update: false,
          delete: false
        };
      }
      
      permissions[moduleId][subModuleId][permission] = checked;
      
      return {
        ...prev,
        permissions
      };
    });
  };

  const handleModuleSelectAll = (moduleId: string, checked: boolean) => {
    const module = DEFAULT_MODULES.find(m => m.id === moduleId);
    if (!module) return;

    const updatedPermissions = { ...formData.permissions } as PermissionsType;
    
    module.submodules.forEach((sub: SubModule) => {
      if (!updatedPermissions[moduleId]) {
        updatedPermissions[moduleId] = {};
      }
      if (!updatedPermissions[moduleId][sub.id]) {
        updatedPermissions[moduleId][sub.id] = {
          show: false,
          create: false,
          update: false,
          delete: false
        };
      }
      
      sub.permissions.forEach((perm: Permission) => {
        updatedPermissions[moduleId][sub.id][perm.name] = checked;
      });
    });

    setFormData((prev: Role) => ({ ...prev, permissions: updatedPermissions }));
  };

  const handleSubModuleSelectAll = (moduleId: string, subModuleId: string, checked: boolean) => {
    const module = DEFAULT_MODULES.find(m => m.id === moduleId);
    const subModule = module?.submodules.find((s: SubModule) => s.id === subModuleId);
    if (!subModule) return;

    setFormData((prev: Role) => {
      const permissions = { ...prev.permissions } as PermissionsType;
      
      if (!permissions[moduleId]) {
        permissions[moduleId] = {};
      }
      
      permissions[moduleId][subModuleId] = {
        show: checked,
        create: checked,
        update: checked,
        delete: checked
      };
      
      return {
        ...prev,
        permissions
      };
    });
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const checkModuleAllSelected = (moduleId: string): boolean => {
    const module = DEFAULT_MODULES.find(m => m.id === moduleId);
    if (!module) return false;

    return module.submodules.every((sub: SubModule) => {
      const subPermissions = formData.permissions[moduleId]?.[sub.id];
      if (!subPermissions) return false;
      
      return sub.permissions.every((perm: Permission) => 
        subPermissions[perm.name] === true
      );
    });
  };

  const checkSubModuleAllSelected = (moduleId: string, subModuleId: string): boolean => {
    const module = DEFAULT_MODULES.find(m => m.id === moduleId);
    const subModule = module?.submodules.find((s: SubModule) => s.id === subModuleId);
    if (!subModule) return false;

    const subPermissions = formData.permissions[moduleId]?.[subModuleId];
    if (!subPermissions) return false;

    return subModule.permissions.every((perm: Permission) => 
      subPermissions[perm.name] === true
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        permissions: formData.permissions
      };

      console.log(payload,'============permission payload=============');
      

      let res;
      if (isEditMode) {
        res = await axios.put(`${API_URL}/users/permissions/roles/${id}`, payload, getAuthHeaders());
      } else {
        res = await axios.post(`${API_URL}/users/permissions/roles`, payload, getAuthHeaders());
      }

      if (res.data?.success === true) {
        toast.success(isEditMode ? 'Role updated successfully' : 'Role created successfully');
        navigate('/users/permissions');
      } else {
        toast.error(res?.data?.message || 'Failed to save role');
      }
    } catch (error: any) {
      console.error('Error saving role:', error);
      toast.error('Failed to save role');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent mb-2">
            {isEditMode ? 'Edit Role' : 'Create New Role'}
          </h1>
          <p className="text-gray-600">
            {isEditMode ? 'Update role details and permissions' : 'Define a new role and set its permissions'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Admin, Sale Officer, Delivery Boy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of the role"
                />
              </div>
            </div>
          </div>

          {/* Permissions Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-4">
              <h2 className="text-lg font-semibold">Module Permissions</h2>
              <p className="text-sm text-gray-300">Configure access rights for each module</p>
            </div>

            <div className="p-6">
              {DEFAULT_MODULES.map((module: Module) => (
                <div key={module.id} className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
                  {/* Module Header */}
                  <div
                    className="flex items-center justify-between bg-gray-50 px-4 py-3 cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleModule(module.id)}
                  >
                    <div className="flex items-center gap-4">
                      <button type="button" className="text-gray-500">
                        {expandedModules.includes(module.id) ? '▼' : '▶'}
                      </button>
                      <span className="font-semibold text-gray-800">{module.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={checkModuleAllSelected(module.id)}
                          onChange={(e) => handleModuleSelectAll(module.id, e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span>Select All</span>
                      </label>
                    </div>
                  </div>

                  {/* Submodules */}
                  {expandedModules.includes(module.id) && (
                    <div className="p-4 space-y-4">
                      {module.submodules.map((sub: SubModule) => (
                        <div key={sub.id} className="border-l-2 border-blue-200 pl-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-700">{sub.name}</span>
                            <label className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={checkSubModuleAllSelected(module.id, sub.id)}
                                onChange={(e) => handleSubModuleSelectAll(module.id, sub.id, e.target.checked)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span>Select All</span>
                            </label>
                          </div>

                          <div className="flex flex-wrap gap-4">
                            {sub.permissions.map((perm: Permission) => (
                              <label key={perm.id} className="flex items-center gap-2 text-sm">
                                <input
                                  type="checkbox"
                                  checked={formData.permissions[module.id]?.[sub.id]?.[perm.name] || false}
                                  onChange={(e) => handlePermissionChange(module.id, sub.id, perm.name, e.target.checked)}
                                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-gray-600">{perm.label}</span>
                                <span className="text-xs text-gray-400" title={perm.description}>
                                  ⓘ
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/users/permissions')}
              className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !formData.name}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <span>{isEditMode ? 'Update Role' : 'Create Role'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PermissionForm;