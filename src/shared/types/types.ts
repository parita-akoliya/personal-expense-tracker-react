export interface Expense {
    id?: string;
    description: string;
    amount: number;
    category: string;
    date:string;
  }
  
  export interface Category {
    id: string;
    name: string;
  }
  
  