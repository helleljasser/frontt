
// RolesIn represents the input structure for creating a new role.
export interface RolesIn {
    name: string;
}

// RolesPagination represents the paginated list of roles.
export interface PaginationData {
   
    page: number;
    limit: number;
    totalCount: number;
}

// RolesTable represents a single role entry in a table.
export interface RolesTable {
    id: string;
    name: string;
    createdAt: Date;
}

// RolesList represents a simplified version of the role for listing purposes.
export interface RolesList {
    id: string;
    name: string;
}

// RolesCount represents the count of roles.
export interface RolesCount {
    count: number;
}

// RolesDetails represents detailed information about a specific role.
export interface RolesDetails {
    id: string;
    name: string;
    company_id: string;
    company_name: string;
    createdAt: Date;
}
