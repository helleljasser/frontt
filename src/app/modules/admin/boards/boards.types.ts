
// Interface représentant la structure d'entrée pour la création d'un nouveau tableau (Board).
export interface BoardIn {
    name: string;          // Titre du tableau. Requis et doit être entre 3 et 30 caractères.
    description: string;   // Description du tableau.
    icon: string;          // Icône du tableau.
    last_activity: string; // Horodatage de la dernière activité du tableau.
}

// Interface représentant la pagination des tableaux (Boards).
export interface BoardsPagination {
    items: BoardsTable[];  // Liste des détails individuels des tableaux.
    page: number;          // Numéro de la page actuelle dans la pagination.
    limit: number;         // Nombre maximum d'éléments par page dans la pagination.
    totalCount: number;    // Nombre total de tableaux dans l'ensemble de la liste.
}
export interface PaginationData {
    page: number;          // Numéro de la page actuelle dans la pagination.
    limit: number;         // Nombre maximum d'éléments par page dans la pagination.
    totalCount: number;    // Nombre total de tableaux dans l'ensemble de la liste.
}

// Interface représentant une entrée de tableau individuelle dans un tableau (Board).
export interface BoardsTable {
    id: string;              // Identifiant unique du tableau.
    title: string;         // Titre du tableau.
    description : string;
    last_activity: string;
    createdAt: string;     // Horodatage indiquant quand l'entrée de tableau a été créée.
}

// Interface représentant des informations détaillées sur un tableau spécifique (Board).
// Interface représentant des informations détaillées sur un tableau spécifique (Board).
export interface BoardsDetails {
    id: string;              // Identifiant unique du tableau.
    title: string;         // Titre du tableau.
    description?: string;   // Description du tableau.
    icon?: string;          // Icône du tableau.
    last_activity?: string;  // Horodatage de la dernière activité du tableau.
    projectID?: string;       // ID du projet associé au tableau.
    companyID?: string;       // ID de l'entreprise associée au tableau.
    createdAt: string;     // Horodatage indiquant quand l'entrée de tableau a été créée.
}

// Interface représentant le nombre de tableaux (BoardsCount).
export interface BoardsCount {
    count: number;         // Nombre de tableaux.
}

// Interface représentant une version simplifiée du tableau pour des fins de liste (BoardsList).
export interface BoardsList {
    id: string;              // Identifiant unique du tableau.
    title: string;         // Titre du tableau.
}
