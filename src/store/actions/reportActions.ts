// src/store/actions/reportActions.ts

export const FETCH_DAILY_REPORT_REQUEST = 'FETCH_DAILY_REPORT_REQUEST';
export const FETCH_DAILY_REPORT_SUCCESS = 'FETCH_DAILY_REPORT_SUCCESS';
export const FETCH_DAILY_REPORT_FAILURE = 'FETCH_DAILY_REPORT_FAILURE';

export const FETCH_WEEKLY_REPORT_REQUEST = 'FETCH_WEEKLY_REPORT_REQUEST';
export const FETCH_WEEKLY_REPORT_SUCCESS = 'FETCH_WEEKLY_REPORT_SUCCESS';
export const FETCH_WEEKLY_REPORT_FAILURE = 'FETCH_WEEKLY_REPORT_FAILURE';

export const FETCH_MONTHLY_REPORT_REQUEST = 'FETCH_MONTHLY_REPORT_REQUEST';
export const FETCH_MONTHLY_REPORT_SUCCESS = 'FETCH_MONTHLY_REPORT_SUCCESS';
export const FETCH_MONTHLY_REPORT_FAILURE = 'FETCH_MONTHLY_REPORT_FAILURE';

export const FETCH_YEARLY_REPORT_REQUEST = 'FETCH_YEARLY_REPORT_REQUEST';
export const FETCH_YEARLY_REPORT_SUCCESS = 'FETCH_YEARLY_REPORT_SUCCESS';
export const FETCH_YEARLY_REPORT_FAILURE = 'FETCH_YEARLY_REPORT_FAILURE';

export const FETCH_DASHBOARD_REPORT_REQUEST = 'FETCH_DASHBOARD_REPORT_REQUEST';
export const FETCH_DASHBOARD_REPORT_SUCCESS = 'FETCH_DASHBOARD_REPORT_SUCCESS';
export const FETCH_DASHBOARD_REPORT_FAILURE = 'FETCH_DASHBOARD_REPORT_FAILURE';

export const FETCH_CATEGORY_REPORT_REQUEST = 'FETCH_CATEGORY_REPORT_REQUEST';
export const FETCH_CATEGORY_REPORT_SUCCESS = 'FETCH_CATEGORY_REPORT_SUCCESS';
export const FETCH_CATEGORY_REPORT_FAILURE = 'FETCH_CATEGORY_REPORT_FAILURE';

export const FETCH_SPENDING_PATTERNS_REQUEST = 'FETCH_SPENDING_PATTERNS_REQUEST';
export const FETCH_SPENDING_PATTERNS_SUCCESS = 'FETCH_SPENDING_PATTERNS_SUCCESS';
export const FETCH_SPENDING_PATTERNS_FAILURE = 'FETCH_SPENDING_PATTERNS_FAILURE';

export const FETCH_TOTAL_EXPENSES_REQUEST = 'FETCH_TOTAL_EXPENSES_REQUEST';
export const FETCH_TOTAL_EXPENSES_SUCCESS = 'FETCH_TOTAL_EXPENSES_SUCCESS';
export const FETCH_TOTAL_EXPENSES_FAILURE = 'FETCH_TOTAL_EXPENSES_FAILURE';

export const fetchDailyReportRequest = () => ({ type: FETCH_DAILY_REPORT_REQUEST });
export const fetchDailyReportSuccess = (data: any) => ({ type: FETCH_DAILY_REPORT_SUCCESS, payload: data });
export const fetchDailyReportFailure = (error: string) => ({ type: FETCH_DAILY_REPORT_FAILURE, payload: error });

export const fetchWeeklyReportRequest = () => ({ type: FETCH_WEEKLY_REPORT_REQUEST });
export const fetchWeeklyReportSuccess = (data: any) => ({ type: FETCH_WEEKLY_REPORT_SUCCESS, payload: data });
export const fetchWeeklyReportFailure = (error: string) => ({ type: FETCH_WEEKLY_REPORT_FAILURE, payload: error });

export const fetchMonthlyReportRequest = () => ({ type: FETCH_MONTHLY_REPORT_REQUEST });
export const fetchMonthlyReportSuccess = (data: any) => ({ type: FETCH_MONTHLY_REPORT_SUCCESS, payload: data });
export const fetchMonthlyReportFailure = (error: string) => ({ type: FETCH_MONTHLY_REPORT_FAILURE, payload: error });

export const fetchYearlyReportRequest = () => ({ type: FETCH_YEARLY_REPORT_REQUEST });
export const fetchYearlyReportSuccess = (data: any) => ({ type: FETCH_YEARLY_REPORT_SUCCESS, payload: data });
export const fetchYearlyReportFailure = (error: string) => ({ type: FETCH_YEARLY_REPORT_FAILURE, payload: error });

export const fetchDashboardReportRequest = () => ({ type: FETCH_DASHBOARD_REPORT_REQUEST });
export const fetchDashboardReportSuccess = (data: any) => ({ type: FETCH_DASHBOARD_REPORT_SUCCESS, payload: data });
export const fetchDashboardReportFailure = (error: string) => ({ type: FETCH_DASHBOARD_REPORT_FAILURE, payload: error });

export const fetchCategoryReportRequest = () => ({ type: FETCH_CATEGORY_REPORT_REQUEST });
export const fetchCategoryReportSuccess = (data: any) => ({ type: FETCH_CATEGORY_REPORT_SUCCESS, payload: data });
export const fetchCategoryReportFailure = (error: string) => ({ type: FETCH_CATEGORY_REPORT_FAILURE, payload: error });

export const fetchSpendingPatternsRequest = () => ({ type: FETCH_SPENDING_PATTERNS_REQUEST });
export const fetchSpendingPatternsSuccess = (data: any) => ({ type: FETCH_SPENDING_PATTERNS_SUCCESS, payload: data });
export const fetchSpendingPatternsFailure = (error: string) => ({ type: FETCH_SPENDING_PATTERNS_FAILURE, payload: error });

export const fetchTotalExpensesRequests = () => ({ type: FETCH_TOTAL_EXPENSES_REQUEST });
export const fetchTotalExpensesSuccess = (total: number) => ({ type: FETCH_TOTAL_EXPENSES_SUCCESS, payload: total });
export const fetchTotalExpensesFailure = (error: string) => ({ type: FETCH_TOTAL_EXPENSES_FAILURE, payload: error });
