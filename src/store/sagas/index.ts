import { all } from 'redux-saga/effects';
import expenseSagas from './expenseSagas';
import categorySagas from './categoriesSagas';
import reportSagas from './reportSagas';

export default function* rootSaga() {
  yield all([
    expenseSagas(),
    categorySagas(),
    reportSagas(),
  ]);
}
