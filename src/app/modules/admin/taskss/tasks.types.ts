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
    items: TasksTable[];
    page: number;
    limit: number;
    totalCount: number;
}
export interface TasksPagination {
    items: TasksTable[];
    page: number;
    limit: number;
    totalCount: number;
}



export interface TasksTable {
    id: string;
    firstname: string;
    lastname: string;
    phone_number : string ;
    rolename : string;
    email: string;
    createdAt: string;
}
export interface task {
        id: string;               // Unique identifier for the task
        name: string;             // Title of the task
        description: string;      // Description of the task
        start_date: Date;         // Start date of the task
        end_date: Date;           // End date of the task
        status: string;           // Status of the task
        priority: string;         // Priority of the task
        done_ratio: number;       // Done ratio of the task
        files_path: string[];     // Array of files path of the task
        categories: string[];     // Array of categories id of the task
        assignedTo: string;       // Assigned task to user
        projectID: string;        // Project ID associated with the task
        task_parentID: string;    // Task parent ID associated with the task
        categoryID: string;       // Category ID of the task
        createdAt: Date;
    }
    

export interface paginationData {

    page: number;
    limit: number;
    totalCount: number;
}
