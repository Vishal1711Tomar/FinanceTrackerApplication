import React, { useState } from 'react';

const Settings = () => {
  const [currency, setCurrency] = useState('USD');

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
   
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <label htmlFor="currency">Currency:</label>
      <select id="currency" value={currency} onChange={handleCurrencyChange}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="INR">INR</option>
        <option value="GBP">GBP</option>
      </select>
    </div>
  );
};

export default Settings;
