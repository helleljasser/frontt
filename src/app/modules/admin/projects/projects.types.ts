// ProjectsIn represents the input structure for creating a new project.
export interface ProjectsIn {
    name: string;
    description?: string;
    type: string;
    start_date: Date;
    end_date: Date;
    budget: number;
    status: string;
    priority: string;
    categories: string[];
    files_path?: string[];
    product_owner: string;
}

// ProjectsPagination represents the paginated list of projects.
export interface PaginationData {
  
    page: number;
    limit: number;
    totalCount: number;
}

// ProjectsTable represents a single project entry in a table.
export interface ProjectsTable {
    id: string;
    name: string;
    type: string;
    description?: string;
    status: string;
    end_date: Date;
    budget: number;
    createdAt: Date;
}

// ProjectsList represents a simplified version of the project for listing purposes.
export interface ProjectsList {
    id: string;
    name: string;
    type: string;
}

// ProjectsCount represents the count of projects.
export interface ProjectsCount {
    count: number;
}

// ProjectsDetails represents detailed information about a specific project.
export interface ProjectsDetails {
    id: string;
    name: string;
    description?: string;
    type: string;
    start_date: Date;
    end_date: Date;
    budget: number;
    status: string;
    priority: string;
    // categories: [];
    files_Path: string[];
    product_owner: string;
    product_owner_name: string;
    company_id: string;
    companyName: string;
    createdAt: Date;
}
