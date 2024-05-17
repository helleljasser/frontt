

// ListsIn represents the input structure for creating a new list.
export interface ListsIn {
    Title: string;
    position?: number;
    projectID: string;
    boardID: string;
}

// ListsPagination represents the paginated list of lists.
export interface PaginationData {
    page: number;
    limit: number;
    totalCount: number;
}

// ListsTable represents a single list entry in a table.
export interface ListsTable {
    id: string;
    title: string;
    createdAt: Date;
}

// ListsList represents a simplified version of the list for listing purposes.
export interface ListsList {
    id: string;
    title: string;
}

// ListsCount represents the count of lists.
export interface ListsCount {
    count: number;
}

// ListsDetails represents detailed information about a specific list.
export interface ListsDetails {
    id: string;
    title: string;
    position?: number;
    projectID: string;
    boardID: string;
    createdAt: Date;
}
