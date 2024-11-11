import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import './Header.css';
import { connect } from 'react-redux';
import AddExpenseModal from '../../../modules/expense/AddExpense/AddExpense.component';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleOutsideClick = (event: any) => {
    if (dropdownOpen && !event.target.closest('.user-menu')) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dropdownOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <a href="/home" className="logo">Personal Expense Tracker</a>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>
      <nav className={`nav ${sidebarOpen ? 'open' : ''}`}>
        <ul className="nav-links">
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/expense-details">Expenses</a></li>
        </ul>
      </nav>

    </header>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);