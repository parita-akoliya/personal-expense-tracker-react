import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { ExpenseRoutes } from './modules/expense/Expense.routes';

const Root = () => <Outlet />;

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    children: ExpenseRoutes,
  },
];
