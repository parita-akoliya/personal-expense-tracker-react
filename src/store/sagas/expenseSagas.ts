// src/store/sagas/expenseSagas.ts

import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_EXPENSES_REQUEST,
  fetchExpensesSuccess,
  fetchExpensesFailure,
  CREATE_EXPENSE_REQUEST,
  createExpenseSuccess,
  createExpenseFailure,
  UPDATE_EXPENSE_REQUEST,
  updateExpenseSuccess,
  updateExpenseFailure,
  DELETE_EXPENSE_REQUEST,
  deleteExpenseSuccess,
  deleteExpenseFailure,
} from '../actions/expenseActions';

function* fetchExpenses() {
  try {
    const response = yield call(axios.get, 'http://localhost:3000/api/expenses');
    yield put(fetchExpensesSuccess(response.data));
  } catch (error) {
    yield put(fetchExpensesFailure(error.message));
  }
}

function* createExpense(action: any) {
  try {
    const response = yield call(axios.post, 'http://localhost:3000/api/expenses', action.payload);
    yield put(createExpenseSuccess(response.data));
  } catch (error) {
    yield put(createExpenseFailure(error.message));
  }
}

function* updateExpense(action: any) {
  try {
    console.log(action);
    
    const response = yield call(axios.put, `http://localhost:3000/api/expenses/${action.payload.id}`, action.payload);
    yield put(updateExpenseSuccess(response.data));
  } catch (error) {
    yield put(updateExpenseFailure(error.message));
  }
}

function* deleteExpense(action: any) {
  try {
    yield call(axios.delete, `http://localhost:3000/api/expenses/${action.payload}`);
    yield put(deleteExpenseSuccess(action.payload));
  } catch (error) {
    yield put(deleteExpenseFailure(error.message));
  }
}

export default function* expenseSagas() {
  yield takeLatest(FETCH_EXPENSES_REQUEST, fetchExpenses);
  yield takeLatest(CREATE_EXPENSE_REQUEST, createExpense);
  yield takeLatest(UPDATE_EXPENSE_REQUEST, updateExpense);
  yield takeLatest(DELETE_EXPENSE_REQUEST, deleteExpense);
}