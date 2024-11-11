import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSearch, FaFileExport, FaPlus, FaRedo } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpensesRequest } from '../../../store/actions/expenseActions';
import { fetchCategoriesRequest } from '../../../store/actions/categoryActions';
import AddExpenseModal from '../AddExpense/AddExpense.component';

interface ExpenseType {
  id: string;
  description: string;
  amount: number;
  category: {
    id: string;
    name: string;
    description: string;
  };
  date: string;
}

const ExpenseDetails: React.FC = () => {
  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector((state: any) => state.expenses);
  const { categories } = useSelector((state: any) => state.categories);

  const [searchTerm, setSearchTerm] = useState('');
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState<ExpenseType | null>(null);
  const [filteredExpenses, setFilteredExpenses] = useState<ExpenseType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<ExpenseType | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof ExpenseType; direction: 'asc' | 'desc' } | null>(null);

  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchExpensesRequest());
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  useEffect(() => {
    filterExpenses();
  }, [expenses, searchTerm, amountRange, dateRange, selectedCategory]);

  const filterExpenses = () => {
    const filtered = expenses.filter((expense: ExpenseType) => {
      const isInAmountRange =
        (!amountRange.min || expense.amount >= Number(amountRange.min)) &&
        (!amountRange.max || expense.amount <= Number(amountRange.max));

      const isInCategory = !selectedCategory || expense.category.id === selectedCategory;

      const expenseDate = new Date(expense.date);
      const startDate = dateRange.start ? new Date(dateRange.start) : null;
      const endDate = dateRange.end ? new Date(dateRange.end) : null;

      const isInDateRange =
        (!startDate || expenseDate >= startDate) &&
        (!endDate || expenseDate <= endDate);

      const isInDescription = expense.description.toLowerCase().includes(searchTerm.toLowerCase());

      return isInAmountRange && isInCategory && isInDateRange && isInDescription;
    });

    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredExpenses(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleSort = (key: keyof ExpenseType) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = (expense: ExpenseType) => {
    setShowDeleteModal(expense);
  };

  const confirmDelete = () => {
    if (showDeleteModal) {
      // dispatch(deleteExpenseRequest(showDeleteModal.id));
      toast.success('Expense deleted successfully');
      setShowDeleteModal(null);
    }
  };

  const exportToCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      filteredExpenses
        .map(
          (expense) =>
            `${expense.id},${expense.description},${expense.amount},${expense.category.name},${expense.date}`
        )
        .join('\n');

    const blob = new Blob([decodeURIComponent(encodeURI(csvContent))], {
      type: 'text/csv;charset=utf-8;',
    });

    saveAs(blob, 'expenses.csv');
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExpenses = filteredExpenses.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const openEditModal = (expense: ExpenseType) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const totalExpenses = filteredExpenses.reduce((acc, curr) => Number(acc) + Number(curr.amount), 0);

  const resetFilters = () => {
    setSearchTerm('');
    setAmountRange({ min: '', max: '' });
    setDateRange({ start: '', end: '' });
    setSelectedCategory('');
    setFilteredExpenses(expenses);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <div className="mb-4 flex justify-between items-center space-x-4">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={exportToCSV}
            className="p-2 px-4 bg-green-500 text-white rounded-md flex items-center gap-2 shadow hover:bg-green-600 focus:outline-none"
          >
            <FaFileExport /> Export CSV
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 px-4 bg-blue-500 text-white rounded-md flex items-center gap-2 shadow hover:bg-blue-600 focus:outline-none"
          >
            <FaPlus /> Add Expense
          </button>
          <button
            onClick={resetFilters}
            className="p-2 px-4 bg-yellow-500 text-white rounded-md flex items-center gap-2 shadow hover:bg-yellow-600 focus:outline-none"
          >
            <FaRedo /> Reset Filters
          </button>
        </div>
      </div>

      {/* Display total expense */}
      <div className="mb-4 text-lg font-semibold text-gray-800">
        Total Expense: ${totalExpenses.toFixed(2)}
      </div>

      <table className="min-w-full table-auto bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="py-2 px-4 cursor-pointer text-left" onClick={() => handleSort('amount')}>
              Amount
              <span className={`ml-2 ${sortConfig?.key === 'amount' && sortConfig.direction === 'asc' ? 'text-blue-500' : 'text-red-500'}`}>
                {sortConfig?.key === 'amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </span>
            </th>
            <th className="py-2 px-4 cursor-pointer text-left" onClick={() => handleSort('description')}>
              Description
              <span className={`ml-2 ${sortConfig?.key === 'description' && sortConfig.direction === 'asc' ? 'text-blue-500' : 'text-red-500'}`}>
                {sortConfig?.key === 'description' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </span>
            </th>
            <th className="py-2 px-4 cursor-pointer text-left" onClick={() => handleSort('category')}>
              Category
              <span className={`ml-2 ${sortConfig?.key === 'category' && sortConfig.direction === 'asc' ? 'text-blue-500' : 'text-red-500'}`}>
                {sortConfig?.key === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </span>
            </th>
            <th className="py-2 px-4 cursor-pointer text-left" onClick={() => handleSort('date')}>
              Date
              <span className={`ml-2 ${sortConfig?.key === 'date' && sortConfig.direction === 'asc' ? 'text-blue-500' : 'text-red-500'}`}>
                {sortConfig?.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </span>
            </th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
          <tr>
            <th className="py-2 px-4">
              <div className="flex gap-1">
                <input
                  type="number"
                  placeholder="Min"
                  value={amountRange.min}
                  onChange={(e) => setAmountRange({ ...amountRange, min: e.target.value })}
                  className="w-1/2 p-1 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={amountRange.max}
                  onChange={(e) => setAmountRange({ ...amountRange, max: e.target.value })}
                  className="w-1/2 p-1 border border-gray-300 rounded-md"
                />
              </div>
            </th>
            <th className="py-2 px-4">
              <input
                type="text"
                placeholder="Filter description..."
                className="w-full p-1 border border-gray-300 rounded-md"
                onChange={(e) => {
                  const value = e.target.value.toLowerCase();
                  setFilteredExpenses(
                    expenses.filter((expense) => expense.description.toLowerCase().includes(value))
                  );
                }}
              />
            </th>
            <th className="py-2 px-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-1 border border-gray-300 rounded-md"
              >
                <option value="">All Categories</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </th>
            <th className="py-2 px-4">
              <div className="flex gap-1">
                <input
                  type="date"
                  placeholder="Start Date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="w-1/2 p-1 border border-gray-300 rounded-md"
                />
                <input
                  type="date"
                  placeholder="End Date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="w-1/2 p-1 border border-gray-300 rounded-md"
                />
              </div>
            </th>
            <th className="py-2 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {currentExpenses.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                No expenses found
              </td>
            </tr>
          ) : (
            currentExpenses.map((expense) => (
              <tr key={expense.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-2 px-4 text-gray-800">${expense.amount}</td>
                <td className="py-2 px-4">{expense.description}</td>
                <td className="py-2 px-4">{expense.category.name}</td>
                <td className="py-2 px-4">{new Date(expense.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 text-center flex justify-center gap-4">
                  <button onClick={() => openEditModal(expense)} className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(expense)} className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-center items-center py-4">
        <div className="flex gap-2">
          {Array.from({ length: Math.ceil(filteredExpenses.length / itemsPerPage) }, (_, idx) => (
            <button
              key={idx}
              onClick={() => paginate(idx + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === idx + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg text-gray-800 mb-4">Are you sure you want to delete this expense?</h3>
            <div className="flex justify-between">
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-500 text-white rounded-md">
                Delete
              </button>
              <button onClick={() => setShowDeleteModal(null)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <AddExpenseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={editingExpense ?? undefined}
        />
      )}
    </div>
  );
};

export default ExpenseDetails;