
// Card_logsIn représente la structure d'entrée pour la création d'un nouveau card_logs.
export interface Card_logsIn {
    name: string;
}

// Card_logsPagination représente la structure de pagination pour les card_logs.
export interface PaginationData {
  
    page: number;
    limit: number;
    totalCount: number;
}

// Card_logsTable représente une entrée de card_logs dans une table.
export interface Card_logsTable {
    id: string;
    name: string;
    createdAt: Date;
}

// Card_logslist représente une version simplifiée d'un card_logs à des fins de liste.
export interface Card_logslist {
    id: string;
    name: string;
}

// Card_logsCount représente le nombre de card_logs.
export interface Card_logsCount {
    count: number;
}

// Card_logsDetails représente des informations détaillées sur un card_logs spécifique.
export interface Card_logsDetails {
    id: string;
    name: string;
    companyID: string;
    companyName: string;
    createdAt: Date;
}
