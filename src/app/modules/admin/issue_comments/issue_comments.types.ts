

// IssuescommentsIn représente la structure d'entrée pour la création d'un nouveau commentaire sur une carte.
export interface Issue_commentsIn {
    content: string;
    files_path: string[];
    projectID: string;
}

// IssuescommentsPagination représente la structure de pagination pour les commentaires sur les cartes.
export interface PaginationData {
    
    page: number;
    limit: number;
    totalCount: number;
}

// IssuescommentsTable représente la structure d'une table de commentaires sur les cartes.
export interface Issue_commentsTable {
    id: string;
    content: string;
    createdAt: Date;
}

// Issuescommentslist représente une version simplifiée d'un commentaire sur une carte à des fins de liste.
export interface Issue_commentslist {
    id: string;
    name: string;
}

// IssuescommentsCount représente le nombre de commentaires sur les cartes.
export interface Issue_commentsCount {
    count: number;
}

// IssuescommentsDetails représente des informations détaillées sur un commentaire spécifique sur une carte.
export interface Issue_commentsDetails {
    id: string;
    content: string;
    files_path: string[];
    projectID: string;
    companyID: string;
    issueId: string;
    createdAt: Date;
}
