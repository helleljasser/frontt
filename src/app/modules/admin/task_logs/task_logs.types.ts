
// Task_logsIn représente la structure d'entrée pour la création d'un nouveau task_logs.
export interface Task_logsIn {
    name: string;
}

// Task_logsPagination représente la structure de pagination pour les task_logs.
export interface PaginationData {
  
    page: number;
    limit: number;
    totalCount: number;
}

// Task_logsTable représente une entrée de task_logs dans une table.
export interface Task_logsTable {
    id: string;
    name: string;
    createdAt: Date;
}

// Task_logslist représente une version simplifiée d'un task_logs à des fins de liste.
export interface Task_logslist {
    id: string;
    name: string;
}

// Task_logsCount représente le nombre de task_logs.
export interface Task_logsCount {
    count: number;
}

// Task_logsDetails représente des informations détaillées sur un task_logs spécifique.
export interface Task_logsDetails {
    id: string;
    name: string;
    companyID: string;
    companyName: string;
    createdAt: Date;
}
