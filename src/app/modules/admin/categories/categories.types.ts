
// CategoriesIn represents the input structure for creating a new category.
export interface CategoryIn {
    name: string;
    description?: string;
    color?: string;
}

// CategoriesPagination represents the paginated list of categories.
export interface PaginationData {
    page: number;
    limit: number;
    totalCount: number;
}

// CategoriesTable represents a single category entry in a table.
export interface CategoriesTable {
    id: string;
    name: string;
    createdAt: Date;
}

// CategoriesList represents a simplified version of the category for listing purposes.
export interface CategoriesList {
    id: string;
    name: string;
}

// CategoriesCount represents the count of categories.
export interface CategoriesCount {
    count: number;
}

// CategoriesDetails represents detailed information about a specific category.
export interface CategoriesDetails {
    id: string;
    name: string;
    description: string;
    color: string;
    companyID: string;
    createdAt: Date;
}
