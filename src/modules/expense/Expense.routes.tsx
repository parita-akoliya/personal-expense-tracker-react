import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import MainLayout from './MainLayout/MainLayout.component';

import Dashboard from './Dashboard/Dashboard.component';
import { Expense } from '../../shared/types/types';
import ExpenseDetails from './ExpenseDetails/ExpenseDetails.component';

const clientChildren: RouteObject[] = [
  {path:'',element:<Dashboard/>},
  {path:'/dashboard',element:<Dashboard/>},
  {path:"expense-details",element:<ExpenseDetails></ExpenseDetails>}


];
export const ExpenseRoutes: RouteObject[] = [
  {
    path: '',
    element: <MainLayout />,
    children: clientChildren
  },
];
