export interface Module {
  id: string;
  name: string;
  icon?: string;
  submodules: SubModule[];
}

export interface SubModule {
  id: string;
  name: string;
  moduleId: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: 'show' | 'create' | 'update' | 'delete';
  label: string;
  description: string;
}

export interface Role {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  permissions: {
    [moduleId: string]: {
      [subModuleId: string]: {
        show: boolean;
        create: boolean;
        update: boolean;
        delete: boolean;
      }
    }
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string | Role;
  status: 'active' | 'inactive';
}