
// Issue_logsIn représente la structure d'entrée pour la création d'un nouveau issue_logs.
export interface Issue_logsIn {
    name: string;
}

// Issue_logsPagination représente la structure de pagination pour les issue_logs.
export interface PaginationData {
  
    page: number;
    limit: number;
    totalCount: number;
}

// Issue_logsTable représente une entrée de issue_logs dans une table.
export interface Issue_logsTable {
    id: string;
    name: string;
    createdAt: Date;
}

// Issue_logslist représente une version simplifiée d'un issue_logs à des fins de liste.
export interface Issue_logslist {
    id: string;
    name: string;
}

// Issue_logsCount représente le nombre de issue_logs.
export interface Issue_logsCount {
    count: number;
}

// Issue_logsDetails représente des informations détaillées sur un issue_logs spécifique.
export interface Issue_logsDetails {
    id: string;
    name: string;
    companyID: string;
    companyName: string;
    createdAt: Date;
}
