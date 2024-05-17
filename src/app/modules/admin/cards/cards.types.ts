export interface CardsIn {
    title: string;
    position?: number;
    user_story?: string;
    categories_id?: string[];
    start_date: string; 
    end_date: string; 
    assigned_to: string;
    board_id: string;
    list_id: string;
    project_id: string;
  }
  
  export interface CardsPagination {
    items: CardsTable[];
    page: number;
    limit: number;
    total_count: number;
  }
  
  export interface CardsTable {
    id: string;
    name: string;
    created_at: string; // Remarque : les types de date/heure peuvent nécessiter un format spécifique dans TypeScript
  }
  
  export interface CardsList {
    id: string;
    title: string;
  }
  
  export  interface CardsCount {
    count: number;
  }
  
 export  interface CardsDetails {
    id: string;
    title: string;
    position: number;
    user_story: string;
    files_path: string[];
    categories_id: string[];
    start_date: string; // Remarque : les types de date/heure peuvent nécessiter un format spécifique dans TypeScript
    end_date: string; // Remarque : les types de date/heure peuvent nécessiter un format spécifique dans TypeScript
    assigned_to: string;
    board_id: string;
    list_id: string;
    project_id: string;
    company_id: string;
    created_at: string; // Remarque : les types de date/heure peuvent nécessiter un format spécifique dans TypeScript
  }
  
  export interface PaginationData {
    page: number;
    limit: number;
    totalCount: number;
}