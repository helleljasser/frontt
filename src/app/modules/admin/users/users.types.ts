export interface TestProject
{
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    country: string;
    status: boolean;
    createdAt: string;
}

export interface TestPagination
{
    items: UsersTable[];
    page: number;
    limit: number;
    totalCount: number;
}





export interface UsersTable {
    id: string;
    firstname: string;
    lastname: string;
    phone_number : string ;
    email: string;
    createdAt: string;
}
export interface UsersDetails {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    country: string;
    status: boolean;
    createdAt: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    phoneNumber: string;
    dateOfHire: string;
    lastLogin: string;
    department_name: string;
    role: string;
    company_id: string;
}
export interface PaginationData {
    page: number;
    limit: number;
    totalCount: number;
}
export interface UsersList {
    id: string;
    name: string;
}
