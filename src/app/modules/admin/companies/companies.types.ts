// CompanyIn represents the input structure for creating a new company.
export interface CompanyIn {
    name: string; // Name is the name of the company. It is required and should be between 3 and 30 characters.
    email?: string; // Email is the email address associated with the company.
    website?: string; // Website is the website URL of the company.
    phone_number?: string; // phone_number in the phone number of the company
    country_code?: string; //country_code is the country code of the company
    address?: string; //address is the adress of the company
}

// CompaniesPagination represents the paginated list of companies.
export interface PaginationData {
    page: number; // Page is the current page number in the pagination.
    limit: number; // Limit is the maximum number of items per page in the pagination.
    totalCount: number; // TotalCount is the total number of companies in the entire list.
}

// CompaniesTable represents a single company entry in a table.
export interface CompaniesTable {
    id: string; // ID is the unique identifier for the company.
    name: string; // Name is the name of the company.
    email?: string; // Email is the email address associated with the company.
    website?: string; // Website is the website URL of the company.
    phone_number?: string; // phone_number in the phone number of the company
    createdAt: Date; // CreatedAt is the timestamp indicating when the company entry was created.
}

// CompaniesDetails represents detailed information about a specific company.
export interface CompaniesDetails {
    id: string; // ID is the unique identifier for the company.
    name: string; // Name is the name of the company.
    email?: string; // Email is the email address associated with the company.
    website?: string; // Website is the website URL of the company.
    phone_number?: string; // phone_number in the phone number of the company
    country_code?: string; //country_code is the country code of the company
    address?: string; //address is the adress of the company
    createdAt: Date; // CreatedAt is the timestamp indicating when the company entry was created.
}
