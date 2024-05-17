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
    items: Task_commentsTable[];
    page: number;
    limit: number;
    totalCount: number;
}
export interface Task_commentsPagination {
    items: Task_commentsTable[];
    page: number;
    limit: number;
    totalCount: number;
}



export interface Task_commentsTable {
    id: string;
    firstname: string;
    lastname: string;
    phone_number : string ;
    rolename : string;
    email: string;
    createdAt: string;
}
export interface Task_comment  {
    id: string;
    content: string;
    files_paths: string[];
    projectID: string;
    companyID: string;
    TaskID: string;
    createdAt: string; 
}


export interface paginationData {
    
    page: number;
    limit: number;
    totalCount: number;
}
