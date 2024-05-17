// IssuesIn represents the input structure for creating a new issue.
export interface IssuesIn {
    id: string;
    start_date: Date;
    end_date: Date;
    status?: string;
    priority?: string;
    files_path?: string[];
    assigned_to: string;
    project_id: string;
    task_id: string;
}

// IssuesPagination represents the paginated list of issues.
export interface PaginationData {

    page: number;
    limit: number;
    totalCount: number;
}

// IssuesTable represents a single issue entry in a table.
export interface IssuesTable {
    id: string;
    start_date: Date;
    end_date: Date;
    status?: string;
    priority?: string;
    assigned_to: string;
    created_at: Date;
}

// IssuesList represents a simplified version of the issue for listing purposes.
export interface IssuesList {
    id: string;
    priority: string;
}

// IssuesCount represents the count of issues.
export interface IssuesCount {
    count: number;
}

// IssuesDetails represents detailed information about a specific issue.
export interface IssuesDetails {
    id: string;
    start_date: Date;
    end_date: Date;
    status?: string;
    priority?: string;
    files_path?: string[];
    assigned_to: string;
    project_id: string;
    company_id: string;
    task_id: string;
    createdAt: Date;
}
