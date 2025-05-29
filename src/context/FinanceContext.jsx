import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';

const FinanceContext = createContext();

const initialState = {
  transactions: [],
  budgets: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'SET_BUDGETS':
      return { ...state, budgets: action.payload };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [...state.transactions, action.payload] };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case 'SET_BUDGET':
      return {
        ...state,
        budgets: [...state.budgets.filter(b => b.category !== action.payload.category), action.payload],
      };
    default:
      return state;
  }
}

export const FinanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch data from JSON Server on loading the page
  useEffect(() => {
    const fetchData = async () => {
      const [txRes, budgetRes] = await Promise.all([
        axios.get('http://localhost:5000/transactions'),
        axios.get('http://localhost:5000/budgets'),
      ]);
      dispatch({ type: 'SET_TRANSACTIONS', payload: txRes.data });
      dispatch({ type: 'SET_BUDGETS', payload: budgetRes.data });
    };
    fetchData();
  }, []);

  //Add a transaction to the server + state
  const addTransaction = async (transaction) => {
    const res = await axios.post('http://localhost:5000/transactions', transaction);
    dispatch({ type: 'ADD_TRANSACTION', payload: res.data });
  };

  //Delete a transaction from the server + state
  const deleteTransaction = async (id) => {
    await axios.delete(`http://localhost:5000/transactions/${id}`);
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  //Set or update budget in  the server + state
  const setBudget = async (category, amount) => {
    const existing = state.budgets.find((b) => b.category === category);
    if (existing) {
      const updated = { ...existing, amount };
      await axios.put(`http://localhost:5000/budgets/${existing.id}`, updated);
      dispatch({ type: 'SET_BUDGET', payload: updated });
    } else {
      const res = await axios.post('http://localhost:5000/budgets', { category, amount });
      dispatch({ type: 'SET_BUDGET', payload: res.data });
    }
  };

  return (
    <FinanceContext.Provider
      value={{
        state,
        addTransaction,
        deleteTransaction,
        setBudget,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
