import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {
  fetchDailyReportRequest,
  fetchWeeklyReportRequest,
  fetchMonthlyReportRequest,
  fetchYearlyReportRequest,
  fetchDashboardReportRequest,
  fetchCategoryReportRequest,
  fetchSpendingPatternsRequest,
  fetchTotalExpensesRequests
} from "../../../store/actions/reportActions";

import {
  FaDollarSign,
  FaChartLine,
  FaWallet,
} from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const {
    daily,
    weekly,
    monthly,
    yearly,
    dashboard,
    category,
    spendingPatterns,
    totalExpenses,
    dailyExpenses,
    monthlyExpenses,
    loading,
    error,
  } = useSelector((state: any) => state.reports);

  useEffect(() => {
    dispatch(fetchDailyReportRequest());
    dispatch(fetchWeeklyReportRequest());
    dispatch(fetchMonthlyReportRequest());
    dispatch(fetchYearlyReportRequest());
    dispatch(fetchDashboardReportRequest());
    dispatch(fetchCategoryReportRequest());
    dispatch(fetchSpendingPatternsRequest());
    dispatch(fetchTotalExpensesRequests());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const barChartData = {
    labels: Object.keys(category || {}),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(category || {}),
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(255, 99, 132, 0.7)",
        ],
        borderColor: "rgba(255, 255, 255, 0.7)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0, 123, 255, 0.7)",
      },
    ],
  };

  const lineChartData = {
    labels: Object.keys(spendingPatterns || {}),
    datasets: [
      {
        label: "Monthly Spending Patterns",
        data: Object.values(spendingPatterns || {}),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Current", "Previous"],
    datasets: [
      {
        data: [
          dashboard?.currentMonth || 0,
          dashboard?.prevMonth || 0,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
        borderColor: "rgba(255, 255, 255, 0.7)",
        borderWidth: 1,
      },
    ],
  };

  const dailyChartData = {
    labels: Object.keys(daily || {}),
    datasets: [
      {
        label: "Daily Expenses",
        data: Object.values(daily || {}),
        backgroundColor: "rgba(153, 102, 255, 0.7)",
        borderColor: "rgba(255, 255, 255, 0.7)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0, 123, 255, 0.7)",
      },
    ],
  };

  console.log(totalExpenses);
  

  return (
    <section className="p-8 bg-gradient rounded-lg shadow-lg space-y-8">
      <h2 className="text-4xl font-semibold text-gray-900 mb-6 text-center">
        Personal Expense Dashboard
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-medium text-gray-800 mb-4">Spending</h3>
        <ul className="space-y-4">
          <li className="flex items-center space-x-2">
            <FaDollarSign className="text-indigo-500" />
            <span>
              <strong>Total Spending:</strong> {totalExpenses}
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <FaChartLine className="text-indigo-500" />
            <span>
              <strong>Today's Spending:</strong> {dailyExpenses}
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <FaWallet className="text-indigo-500" />
            <span>
              <strong>Current Month Spending:</strong> {monthlyExpenses}
            </span>
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-medium text-gray-800 mb-4">
            Expenses by Category
          </h3>
          <div className="w-full h-300px sm:h-400px">
            <Bar data={barChartData} options={{ responsive: true }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-medium text-gray-800 text-center mb-4">
            Comparison: Current vs Previous Month
          </h3>
          <div className="w-full h-300px sm:h-400px">
            <Pie data={pieChartData} options={{ responsive: true }} />
          </div>
          <div className="mt-4 text-lg font-semibold text-center">
            <p
              className={`text-${
                (dashboard?.currentMonth || 0) - (dashboard?.prevMonth || 0) >= 0
                  ? "green"
                  : "red"
              }-500`}
            >
              Difference: $
              {Math.abs(
                (dashboard?.currentMonth || 0) - (dashboard?.prevMonth || 0)
              ).toFixed(2)}{" "}
              {(dashboard?.currentMonth || 0) - (dashboard?.prevMonth || 0) >= 0
                ? "Increase"
                : "Decrease"}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-medium text-gray-800 mb-4">
            Daily Expenses
          </h3>
          <div className="w-full h-300px sm:h-400px">
            <Bar data={dailyChartData} options={{ responsive: true }} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-medium text-gray-800 mb-4">
          Monthly Spending Patterns
        </h3>
        <div className="w-full h-400px">
          <Line data={lineChartData} options={{ responsive: true }} />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;