import { combineReducers } from 'redux';
import expenses, { ExpenseState } from './expenseReducers';
import categories, { CategoryState } from './categoryReducers';
import reports, { ReportState } from './reportReducers';

export interface RootState {
    expenses: ExpenseState;
    categories: CategoryState
    reports: ReportState
}

const rootReducer = combineReducers({
    expenses,
    categories,
    reports
});

export default rootReducer;
