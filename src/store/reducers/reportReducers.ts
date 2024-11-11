// src/store/reducers/reportReducer.ts

import {
    FETCH_DAILY_REPORT_SUCCESS,
    FETCH_DAILY_REPORT_FAILURE,
    FETCH_WEEKLY_REPORT_SUCCESS,
    FETCH_WEEKLY_REPORT_FAILURE,
    FETCH_MONTHLY_REPORT_SUCCESS,
    FETCH_MONTHLY_REPORT_FAILURE,
    FETCH_YEARLY_REPORT_SUCCESS,
    FETCH_YEARLY_REPORT_FAILURE,
    FETCH_DASHBOARD_REPORT_SUCCESS,
    FETCH_DASHBOARD_REPORT_FAILURE,
    FETCH_CATEGORY_REPORT_SUCCESS,
    FETCH_CATEGORY_REPORT_FAILURE,
    FETCH_SPENDING_PATTERNS_SUCCESS,
    FETCH_SPENDING_PATTERNS_FAILURE,
    FETCH_TOTAL_EXPENSES_SUCCESS,
  } from '../actions/reportActions';
  
  export interface ReportState {
    daily: any | null;
    weekly: any | null;
    monthly: any | null;
    yearly: any | null;
    dashboard: any | null;
    category: any | null;
    spendingPatterns: any | null;
    totalExpenses: number | null;
    dailyExpenses: number | null;
    monthlyExpenses: number | null;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: ReportState = {
    daily: null,
    weekly: null,
    monthly: null,
    yearly: null,
    dashboard: null,
    category: null,
    spendingPatterns: null,
    totalExpenses: null,
    dailyExpenses: null,
    monthlyExpenses: null,
    loading: true,
    error: null,
  };
  
  const reports = (state = initialState, action: any): ReportState => {
    switch (action.type) {
      case FETCH_DAILY_REPORT_SUCCESS:
        return { ...state, daily: action.payload, loading: false };
      case FETCH_WEEKLY_REPORT_SUCCESS:
        return { ...state, weekly: action.payload, loading: false };
      case FETCH_MONTHLY_REPORT_SUCCESS:
        return { ...state, monthly: action.payload, loading: false };
      case FETCH_YEARLY_REPORT_SUCCESS:
        return { ...state, yearly: action.payload, loading: false };
      case FETCH_DASHBOARD_REPORT_SUCCESS:
        return { ...state, dashboard: action.payload, loading: false };
      case FETCH_CATEGORY_REPORT_SUCCESS:
        return { ...state, category: action.payload, loading: false };
      case FETCH_SPENDING_PATTERNS_SUCCESS:
        return { ...state, spendingPatterns: action.payload, loading: false };
        case FETCH_TOTAL_EXPENSES_SUCCESS:
            console.log(action.payload);
            return {...state, totalExpenses: action.payload.totalExpenses, dailyExpenses: action.payload.dailyExpenses, monthlyExpenses: action.payload.dailyExpenses, loading: false };
  
      case FETCH_DAILY_REPORT_FAILURE:
      case FETCH_WEEKLY_REPORT_FAILURE:
      case FETCH_MONTHLY_REPORT_FAILURE:
      case FETCH_YEARLY_REPORT_FAILURE:
      case FETCH_DASHBOARD_REPORT_FAILURE:
      case FETCH_CATEGORY_REPORT_FAILURE:
      case FETCH_SPENDING_PATTERNS_FAILURE:
        return { ...state, error: action.payload, loading: false };
  
      default:
        return state;
    }
  };
  
  export default reports;