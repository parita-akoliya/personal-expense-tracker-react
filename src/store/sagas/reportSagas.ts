// src/store/sagas/reportSagas.ts

import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_DAILY_REPORT_REQUEST,
  FETCH_WEEKLY_REPORT_REQUEST,
  FETCH_MONTHLY_REPORT_REQUEST,
  FETCH_YEARLY_REPORT_REQUEST,
  FETCH_DASHBOARD_REPORT_REQUEST,
  FETCH_CATEGORY_REPORT_REQUEST,
  FETCH_SPENDING_PATTERNS_REQUEST,
  fetchDailyReportSuccess,
  fetchDailyReportFailure,
  fetchWeeklyReportSuccess,
  fetchWeeklyReportFailure,
  fetchMonthlyReportSuccess,
  fetchMonthlyReportFailure,
  fetchYearlyReportSuccess,
  fetchYearlyReportFailure,
  fetchDashboardReportSuccess,
  fetchDashboardReportFailure,
  fetchCategoryReportSuccess,
  fetchCategoryReportFailure,
  fetchSpendingPatternsSuccess,
  fetchSpendingPatternsFailure,
  fetchTotalExpensesSuccess,
  fetchTotalExpensesFailure,
  FETCH_TOTAL_EXPENSES_REQUEST,
} from '../actions/reportActions';

function* fetchDailyReport() {
  try {
    const response = yield call(axios.get, 'http://localhost:3000/api/reports/daily');
    yield put(fetchDailyReportSuccess(response.data));
  } catch (error) {
    yield put(fetchDailyReportFailure(error.message));
  }
}

function* fetchWeeklyReport() {
  try {
    const response = yield call(axios.get, 'http://localhost:3000/api/reports/weekly');
    yield put(fetchWeeklyReportSuccess(response.data));
  } catch (error) {
    yield put(fetchWeeklyReportFailure(error.message));
  }
}

function* fetchMonthlyReport() {
  try {
    const response = yield call(axios.get, 'http://localhost:3000/api/reports/monthly');
    yield put(fetchMonthlyReportSuccess(response.data));
  } catch (error) {
    yield put(fetchMonthlyReportFailure(error.message));
  }
}

function* fetchYearlyReport() {
  try {
    const response = yield call(axios.get, 'http://localhost:3000/api/reports/yearly');
    yield put(fetchYearlyReportSuccess(response.data));
  } catch (error) {
    yield put(fetchYearlyReportFailure(error.message));
  }
}

function* fetchDashboardReport() {
  try {
    const response = yield call(axios.get, 'http://localhost:3000/api/reports/dashboard');
    yield put(fetchDashboardReportSuccess(response.data));
  } catch (error) {
    yield put(fetchDashboardReportFailure(error.message));
  }
}

function* fetchCategoryReport() {
  try {
    const response = yield call(axios.get, 'http://localhost:3000/api/reports/category');
    yield put(fetchCategoryReportSuccess(response.data));
  } catch (error) {
    yield put(fetchCategoryReportFailure(error.message));
  }
}

function* fetchSpendings() {
  try {
    const response = yield call(axios.get, 'http://localhost:3000/api/reports/spending-patterns');
    yield put(fetchSpendingPatternsSuccess(response.data));
  } catch (error) {
    yield put(fetchSpendingPatternsFailure(error.message));
  }
}

function* fetchTotalExpenses() {
    try {
      const response = yield call(axios.get, 'http://localhost:3000/api/reports/total-expenses');
      console.log(response);
      
      yield put(fetchTotalExpensesSuccess(response.data));
    } catch (error) {
      yield put(fetchTotalExpensesFailure(error.message));
    }
  }
  

export default function* reportSagas() {
  yield all([
    takeLatest(FETCH_DAILY_REPORT_REQUEST, fetchDailyReport),
    takeLatest(FETCH_WEEKLY_REPORT_REQUEST, fetchWeeklyReport),
    takeLatest(FETCH_MONTHLY_REPORT_REQUEST, fetchMonthlyReport),
    takeLatest(FETCH_YEARLY_REPORT_REQUEST, fetchYearlyReport),
    takeLatest(FETCH_DASHBOARD_REPORT_REQUEST, fetchDashboardReport),
    takeLatest(FETCH_CATEGORY_REPORT_REQUEST, fetchCategoryReport),
    takeLatest(FETCH_TOTAL_EXPENSES_REQUEST, fetchTotalExpenses),
    takeLatest(FETCH_SPENDING_PATTERNS_REQUEST, fetchSpendings),
  ]);
}