import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './common/state/store';
import { fetchWorkers } from './common/gateway.ts/gateway';
import FilterBlock from './features/FilterBlock';
import EmployeesList from './features/EmployeesList';
import EmployeeInfo from './features/EmployeeInfo';
import ErrorPage from './features/Errors/ErrorPage';
import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <FilterBlock />
        <EmployeesList />
      </>
    ),
  },
  {
    path: 'employee/:employeeId',
    element: <EmployeeInfo />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWorkers());
  }, []);

  return (
    <div className="page">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
