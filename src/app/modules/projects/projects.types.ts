

export interface ProjectsPagination {
    items: ProjectsTable[];
    page: number;
    limit: number;
    totalCount: number;
}



export interface ProjectsTable {
    id: string;
    firstname: string;
    lastname: string;
    phone_number : string ;
    rolename : string;
    email: string;
    createdAt: string;
}