
// PermissionsIn represents the input structure for creating a new permission.
export interface PermissionsIn {
    roleId: string;
    featureId: string;
    featureName: string;
    creatByUser: string;
}

// PermissionsPagination represents the paginated permission of permissions.
export interface PaginationData {

    page: number;
    limit: number;
    totalCount: number;
}

// PermissionsTable represents a single permission entry in a table.
export interface PermissionsTable {
    id: string;
    featureName: string;
    createdAt: Date;
}

// PermissionsList represents a simplified version of the permission for permissioning purposes.
export interface PermissionsList {
    id: string;
    featureName: string;
}

// PermissionsCount represents the count of permissions.
export interface PermissionsCount {
    count: number;
}

// PermissionsDetails represents detailed information about a specific permission.
export interface PermissionsDetails {
    id: string;
    roleID: string;
    companyID: string;
    featureID: string;
    featureName: string;
    createPerm: boolean;
    readPerm: boolean;
    updatePerm: boolean;
    deletePerm: boolean;
    createdByUser: string;
    createdAt: Date;
}
