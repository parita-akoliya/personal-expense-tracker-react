// src/store/actions/expenseActions.ts

export const FETCH_EXPENSES_REQUEST = 'FETCH_EXPENSES_REQUEST';
export const FETCH_EXPENSES_SUCCESS = 'FETCH_EXPENSES_SUCCESS';
export const FETCH_EXPENSES_FAILURE = 'FETCH_EXPENSES_FAILURE';

export const CREATE_EXPENSE_REQUEST = 'CREATE_EXPENSE_REQUEST';
export const CREATE_EXPENSE_SUCCESS = 'CREATE_EXPENSE_SUCCESS';
export const CREATE_EXPENSE_FAILURE = 'CREATE_EXPENSE_FAILURE';

export const UPDATE_EXPENSE_REQUEST = 'UPDATE_EXPENSE_REQUEST';
export const UPDATE_EXPENSE_SUCCESS = 'UPDATE_EXPENSE_SUCCESS';
export const UPDATE_EXPENSE_FAILURE = 'UPDATE_EXPENSE_FAILURE';

export const DELETE_EXPENSE_REQUEST = 'DELETE_EXPENSE_REQUEST';
export const DELETE_EXPENSE_SUCCESS = 'DELETE_EXPENSE_SUCCESS';
export const DELETE_EXPENSE_FAILURE = 'DELETE_EXPENSE_FAILURE';

export interface Expense {
  id?: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export const fetchExpensesRequest = () => ({
  type: FETCH_EXPENSES_REQUEST,
});

export const fetchExpensesSuccess = (expenses: Expense[]) => ({
  type: FETCH_EXPENSES_SUCCESS,
  payload: expenses,
});

export const fetchExpensesFailure = (error: string) => ({
  type: FETCH_EXPENSES_FAILURE,
  payload: error,
});

export const createExpenseRequest = (expense: Expense) => ({
  type: CREATE_EXPENSE_REQUEST,
  payload: expense,
});

export const createExpenseSuccess = (expense: Expense) => ({
  type: CREATE_EXPENSE_SUCCESS,
  payload: expense,
});

export const createExpenseFailure = (error: string) => ({
  type: CREATE_EXPENSE_FAILURE,
  payload: error,
});

export const updateExpenseRequest = (expense: Expense) => ({
  type: UPDATE_EXPENSE_REQUEST,
  payload: expense,
});

export const updateExpenseSuccess = (expense: Expense) => ({
  type: UPDATE_EXPENSE_SUCCESS,
  payload: expense,
});

export const updateExpenseFailure = (error: string) => ({
  type: UPDATE_EXPENSE_FAILURE,
  payload: error,
});

export const deleteExpenseRequest = (id: string) => ({
  type: DELETE_EXPENSE_REQUEST,
  payload: id,
});

export const deleteExpenseSuccess = (id: string) => ({
  type: DELETE_EXPENSE_SUCCESS,
  payload: id,
});

export const deleteExpenseFailure = (error: string) => ({
  type: DELETE_EXPENSE_FAILURE,
  payload: error,
});