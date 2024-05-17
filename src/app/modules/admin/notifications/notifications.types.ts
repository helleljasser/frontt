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
    items: NotificationsTable[];
    page: number;
    limit: number;
    totalCount: number;
}
export interface NotificationsPagination {
    items: NotificationsTable[];
    page: number;
    limit: number;
    totalCount: number;
}



export interface NotificationsTable {
    id: string;
    firstname: string;
    lastname: string;
    phone_number : string ;
    rolename : string;
    email: string;
    createdAt: string;
}
export interface notification {
    id: string;
    type : string;
    content: string;
    seen: string;
    createdAt: string;

}
export interface paginationData {

    page: number;
    limit: number;
    totalCount: number;
}
