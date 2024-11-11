import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { createExpenseRequest, updateExpenseRequest } from '../../../store/actions/expenseActions';
import { fetchCategoriesRequest } from '../../../store/actions/categoryActions';
import { Category } from '../../../shared/types/types';

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

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ExpenseType;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ isOpen, onClose, initialData }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state: any) => state.categories.categories);

  const [description, setDescription] = useState(initialData?.description || '');
  const [amount, setAmount] = useState(initialData?.amount.toString() || '');
  const [category, setCategory] = useState(initialData?.category.id || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchCategoriesRequest());
    }
  }, [dispatch, isOpen]);

  useEffect(() => {
    if (initialData) {
      setDescription(initialData.description);
      setAmount(initialData.amount.toString());
      setCategory(initialData.category.id.toString());
      setDate(initialData.date);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Reset errors on submit attempt

    // Basic validation
    const newErrors: { [key: string]: string } = {};
    if (!description) newErrors.description = 'Description is required.';
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number.';
    }
    if (!category) newErrors.category = 'Category is required.';
    if (!date) {
      newErrors.date = 'Date is required.';
    } else if (new Date(date) > new Date()) {
      newErrors.date = 'Date cannot be in the future.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const expense = {
      description,
      amount: Number(amount),
      category, // Find full category object
      date,
    };

    if (initialData) {
      expense.id = initialData.id;
      dispatch(updateExpenseRequest(expense));
    } else {
      dispatch(createExpenseRequest(expense));
    }

    onClose(); // Close modal
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close modal if clicked outside
    }
  };

  const clearError = (field: string) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-hidden={!isOpen}
      onClick={handleOutsideClick} // Close modal if clicked outside
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          aria-label="Close modal"
        >
          <FaTimes />
        </button>

        <h2 id="modalTitle" className="text-2xl font-semibold text-gray-800 mb-6">
          {initialData ? 'Edit Expense' : 'Add New Expense'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter a brief description of the expense"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                clearError('description');
              }}
              className={`block w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
              rows={4}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              placeholder="Amount in USD"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                clearError('amount');
              }}
              className={`block w-full p-2 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                clearError('category');
              }}
              className={`block w-full p-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select Category</option>
              {categories.map((cat: Category) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                clearError('date');
              }}
              className={`block w-full p-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700"
            >
              {initialData ? 'Update Expense' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;