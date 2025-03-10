export interface Item {
    id: string;
    title: string;
    description: string;
    category: string; 
    tags: string[];
    priority: boolean;
    modified: number;
    due: number | null;
    deleted: boolean;
    completed: boolean;
  }
  
  export interface Category {
    id: string;
    title: string;
  }