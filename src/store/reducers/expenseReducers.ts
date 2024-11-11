// src/store/reducers/expenseReducer.ts

import {
    FETCH_EXPENSES_REQUEST,
    FETCH_EXPENSES_SUCCESS,
    FETCH_EXPENSES_FAILURE,
    CREATE_EXPENSE_SUCCESS,
    CREATE_EXPENSE_FAILURE,
    UPDATE_EXPENSE_SUCCESS,
    UPDATE_EXPENSE_FAILURE,
    DELETE_EXPENSE_SUCCESS,
    DELETE_EXPENSE_FAILURE,
    Expense,
  } from '../actions/expenseActions';
  
  export interface ExpenseState {
    expenses: Expense[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: ExpenseState = {
    expenses: [],
    loading: false,
    error: null,
  };
  
  const expenses = (state = initialState, action: any): ExpenseState => {
    switch (action.type) {
      case FETCH_EXPENSES_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_EXPENSES_SUCCESS:
        return { ...state, loading: false, expenses: action.payload };
      case FETCH_EXPENSES_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      case CREATE_EXPENSE_SUCCESS:
        return { ...state, expenses: [...state.expenses, action.payload] };
      case CREATE_EXPENSE_FAILURE:
        return { ...state, error: action.payload };
  
      case UPDATE_EXPENSE_SUCCESS:
        return {
          ...state,
          expenses: state.expenses.map(expense =>
            expense.id === action.payload.id ? action.payload : expense
          ),
        };
      case UPDATE_EXPENSE_FAILURE:
        return { ...state, error: action.payload };
  
      case DELETE_EXPENSE_SUCCESS:
        return {
          ...state,
          expenses: state.expenses.filter(expense => expense.id !== action.payload),
        };
      case DELETE_EXPENSE_FAILURE:
        return { ...state, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default expenses;