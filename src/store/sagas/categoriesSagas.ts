// src/store/sagas/categorySagas.ts

import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_CATEGORIES_REQUEST,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from '../actions/categoryActions';

function* fetchCategories() {
  try {
    const response = yield call(axios.get, 'http://localhost:3000/api/categories');
    yield put(fetchCategoriesSuccess(response.data));
  } catch (error) {
    yield put(fetchCategoriesFailure(error.message));
  }
}

export default function* categorySagas() {
  yield takeLatest(FETCH_CATEGORIES_REQUEST, fetchCategories);
}