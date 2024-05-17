

// CardscommentsIn représente la structure d'entrée pour la création d'un nouveau commentaire sur une carte.
export interface Card_commentsIn {
    content: string;
    files_path: string[];
    projectID: string;
}

// CardscommentsPagination représente la structure de pagination pour les commentaires sur les cartes.
export interface PaginationData {
    
    page: number;
    limit: number;
    totalCount: number;
}

// CardscommentsTable représente la structure d'une table de commentaires sur les cartes.
export interface Card_commentsTable {
    id: string;
    content: string;
    createdAt: Date;
}

// Cardscommentslist représente une version simplifiée d'un commentaire sur une carte à des fins de liste.
export interface Card_commentslist {
    id: string;
    name: string;
}

// CardscommentsCount représente le nombre de commentaires sur les cartes.
export interface Card_commentsCount {
    count: number;
}

// CardscommentsDetails représente des informations détaillées sur un commentaire spécifique sur une carte.
export interface Card_commentsDetails {
    id: string;
    content: string;
    files_path: string[];
    projectID: string;
    companyID: string;
    cardId: string;
    createdAt: Date;
}
